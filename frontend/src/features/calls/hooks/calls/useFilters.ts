import { useMemo, useState } from "react";
import { useCalls } from "./useCalls";
import { useQueues } from "@/shared/hooks/useQueues";

export const useFilters = () => {
  const calls = useCalls();
  const { queues: queuesList } = useQueues();

  const [status, setStatus] = useState<string[]>([]);
  const [queues, setQueues] = useState<string[]>([]);
  const [applied, setApplied] = useState(true);

  const toggleValue = (prev: string[], value: string): string[] =>
    prev.includes(value)
      ? prev.filter((item) => item !== value)
      : [...prev, value];

  const changeStatus = (value: string) => {
    setStatus((prev) => toggleValue(prev, value));
    setApplied(false);
  };

  const changeQueues = (value: string) => {
    setQueues((prev) => toggleValue(prev, value));
    setApplied(false);
  };

  const disabledReset = useMemo(() => {
    return status.length === 0 && queues.length === 0;
  }, [status, queues]);

  const disabledApply = useMemo(() => {
    return applied || disabledReset;
  }, [applied, disabledReset]);

  const queuesOptions = useMemo(() => {
    return queuesList.map((queue) => ({
      value: queue.id,
      label: queue.name,
    }));
  }, [queuesList]);

  const apply = () => {
    calls.fetch({ status, queue: queues });
    setApplied(true);
  };

  const reset = () => {
    calls.fetch();
    setStatus([]);
    setQueues([]);
    setApplied(true);
  };

  return {
    status,
    queues,
    disabledReset,
    disabledApply,
    queuesOptions,
    changeStatus,
    changeQueues,
    apply,
    reset,
  };
};
