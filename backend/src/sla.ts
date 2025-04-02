const sla = new Map<string, NodeJS.Timeout>();

export const SLA = {
  set(callId: string, onExpire: () => void) {
    const timeout = setTimeout(onExpire, 30_000);
    sla.set(callId, timeout);
  },

  clear(callId: string) {
    const timeout = sla.get(callId);
    if (timeout) {
      clearTimeout(timeout);
      sla.delete(callId);
    }
  },

  has(callId: string) {
    return sla.has(callId);
  },
};
