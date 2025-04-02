import { useEffect } from "react";
import { useCallsService } from "../../services/calls";
import { useCallsStore } from "../../store/callsStore";
import { CallsRequest } from "../../types";

export const useCalls = () => {
  const callsService = useCallsService();
  const { calls, setCalls, loading, setLoading } = useCallsStore();

  const fetch = async (data?: CallsRequest) => {
    setLoading(true);
    try {
      const result = await callsService.getAll(data);
      setCalls(result.map((call: any) => call));
    } catch (err) {
      console.error("Error al obtener llamadas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return {
    calls,
    loading,
    setCalls,
    setLoading,
    fetch,
  };
};
