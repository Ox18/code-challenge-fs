import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterFormSchema } from "../schemas";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/shared/hooks/useAuth";
import { useAuthService } from "../services/auth";
import { useRouter } from "next/navigation";
import { HTTP_STATUS_CODE } from "@/shared/constants/http";
import { useQueues } from "@/shared/hooks/useQueues";

export const useFormRegister = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const auth = useAuth();
  const authService = useAuthService();

  const { queues } = useQueues();

  const methods = useForm({
    resolver: zodResolver(RegisterFormSchema),
    mode: "onChange",
  });

  const submit = methods.handleSubmit(async (data) => {
    setLoading(true);
    try {
      const { token } = await authService.register({
        email: data.email,
        password: data.password,
        queue_id: data.queue,
      });
      auth.setToken(token);

      const user = await authService.me();
      auth.setMe(user);
      router.push("/calls");
    } catch (ex: any) {
      const status = ex?.response?.status;

      if (status === HTTP_STATUS_CODE.BAD_REQUEST) {
        methods.setError("root", {
          type: "manual",
          message: "El correo ya existe",
        });
      } else {
        methods.setError("root", {
          type: "manual",
          message: "Error inesperado. Intentá de nuevo.",
        });
      }
    } finally {
      setLoading(false);
    }
  });

  const [disabledSubmit, setDisabledSubmit] = useState(false);

  useEffect(() => {
    setDisabledSubmit(!methods.formState.isValid);
  }, [methods.formState.isValid]);

  useEffect(() => {
    const subscription = methods.watch(() => {
      if (methods.formState.errors.root) {
        methods.clearErrors("root");
      }
    });

    return () => subscription.unsubscribe();
  }, [methods]);

  const queuesOptions = useMemo(() => {
    return queues.map((queue) => ({
      value: queue.id,
      label: queue.name,
    }));
  }, [queues]);

  return {
    disabledSubmit,
    methods,
    loading,
    queuesOptions,
    submit,
  };
};
