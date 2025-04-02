"use client";
import { useQueues } from "@/shared/hooks/useQueues";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useMeetService } from "../services/meet";
import { createMeetSchema } from "../schemas/meet.schema";
import { useRouter } from "next/navigation";
import { useUserTemporalStore } from "@/shared/store/userTemporalStore";
import { useMeetStore } from "@/shared/store/meetStore";

export const useFormCreate = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const userTemporalStore = useUserTemporalStore();
  const meetStore = useMeetStore();

  const meetService = useMeetService();
  const { queues } = useQueues();

  const methods = useForm({
    resolver: zodResolver(createMeetSchema),
    mode: "onChange",
    defaultValues: {
      name: userTemporalStore.name,
    },
  });

  useEffect(() => {
    if (userTemporalStore.name) {
      methods.reset({
        name: userTemporalStore.name,
      });
    }
  }, [userTemporalStore.name, methods]);

  const invalidForm = useMemo<boolean>(() => {
    return !methods.formState.isValid;
  }, [methods.formState.isValid]);

  const submit = methods.handleSubmit(async (data) => {
    setLoading(true);
    try {
      const meetId = await meetService.create(data);
      userTemporalStore.setName(data.name);
      meetStore.setCallId(meetId);
      meetStore.setQueueId(data.queue_id);
      meetStore.setType("video");
      router.push(`/meet/${meetId}`);
    } catch (err) {
      console.error("Error al crear meet:", err);
    } finally {
      setLoading(false);
    }
  });

  const queuesOptions = useMemo(() => {
    return queues.map((queue) => ({
      label: queue.name,
      value: queue.id,
    }));
  }, [queues]);

  return {
    methods,
    invalidForm,
    queuesOptions,
    loading,
    submit,
  };
};
