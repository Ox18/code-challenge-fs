import { useCallEventService } from "../services/callEvent";
import { useCallEventStore } from "../store/callEventStore";
import { toast } from "react-hot-toast";

export const useCallEvent = () => {
  const callEventStore = useCallEventStore();
  const callEventService = useCallEventService();

  const fetch = async (callId: string) => {
    callEventStore.setLoading(true);
    callEventStore.setIsOpen(true);

    try {
      const data = await callEventService.get(callId);
      callEventStore.setEvents(data);
    } catch (err) {
      toast.error("There was an error, please try again.");
    } finally {
      callEventStore.setLoading(false);
    }
  };

  const close = () => {
    callEventStore.setIsOpen(false);
  };

  return {
    isOpen: callEventStore.isOpen,
    data: callEventStore.events,
    loading: callEventStore.loading,
    close,
    fetch,
  };
};
