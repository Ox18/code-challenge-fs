"use client";
import CallEventHistory from "@/features/calls/components/callEvent/CallEventHistory";
import Filter from "@/features/calls/components/calls/Filter";
import Invitation from "@/features/calls/components/Invitation";
import Status from "@/features/calls/components/Status";
import WrapperSection from "@/features/calls/components/WrapperSection";
import { CALL_STATUS } from "@/features/calls/constants";
import { useCallsPage } from "@/features/calls/hooks/calls/useCallsPage";
import VTable from "@/shared/components/ui/table/VTable";
import VTableBody from "@/shared/components/ui/table/VTableBody";
import VTableColumn from "@/shared/components/ui/table/VTableColumn";
import VTableHead from "@/shared/components/ui/table/VTableHead";
import VTableItem from "@/shared/components/ui/table/VTableItem";
import VTableRow from "@/shared/components/ui/table/VTableRow";
import { useSocket } from "@/shared/hooks/useSocket";
import { Clock, ClockFading, Flag, List, Pin } from "lucide-react";
import { useEffect } from "react";

export default function Calls() {
  const {
    calls,
    data,
    loading,
    showInvitation,
    clickRow,
    accept,
    closeInvitation,
  } = useCallsPage();

  const socket = useSocket("http://localhost:3001");

  useEffect(() => {
    if (!socket.current) return;

    return () => {
      socket.current?.off("call_event"); // buena práctica
    };
  }, [socket]);

  return (
    <WrapperSection title="Calls" count={calls.length}>
      <div className="py-5">
        <Filter />
        <VTable loading={loading}>
          <VTableHead>
            <VTableColumn prependIcon={List}>ID</VTableColumn>
            <VTableColumn prependIcon={Flag}>Status</VTableColumn>
            <VTableColumn prependIcon={Pin}>Queue</VTableColumn>
            <VTableColumn prependIcon={Clock}>Start time</VTableColumn>
            <VTableColumn prependIcon={ClockFading}>End time</VTableColumn>
          </VTableHead>
          <VTableBody>
            {data.map((item) => (
              <VTableRow
                key={item.id}
                active={item.status === CALL_STATUS.ENDED}
                onClick={() => clickRow(item.id)}
              >
                <VTableItem>
                  <div className="flex items-center gap-2">
                    {item.id}

                    {item.status === CALL_STATUS.ENDED && (
                      <div className="w-1 h-5 rounded-full bg-blue-200"></div>
                    )}
                  </div>
                </VTableItem>
                <VTableItem>
                  <Status status={item.status} />
                </VTableItem>
                <VTableItem>{item.queue}</VTableItem>
                <VTableItem>{item.start_time}</VTableItem>
                <VTableItem>{item.end_time}</VTableItem>
              </VTableRow>
            ))}
          </VTableBody>
        </VTable>
        <Invitation
          isOpen={showInvitation}
          onClose={closeInvitation}
          accept={accept}
        />
      </div>
      <CallEventHistory />
    </WrapperSection>
  );
}
