"use client";
import ButtonEnd from "@/features/meet/components/ButtonEnd";
import ButtonHold from "@/features/meet/components/ButtonHold";
import Hold from "@/features/meet/components/Hold";
import { useMeet } from "@/features/meet/hooks/useMeet";
import VContainer from "@/shared/components/ui/container/VContainer";
import VideoParticipant from "@/shared/components/ui/video-participant/VideoParticipant";

export type Participant = {
  socket_id: string;
  is_host: boolean;
  agent_id?: string;
  name: string;
  photo_url: string;
  meet_id?: string;
  is_muted: boolean;
  is_camera_on: boolean;
};

export default function MeetPage() {
  const {
    socketId,
    participants,
    hold,
    enabledButtonHold,
    enabledButtonEnd,
    endCall,
    toggleHold,
    toggleCamera,
    toggleMute,
  } = useMeet();

  return (
    <VContainer>
      {hold && (
        <div className="flex justify-center">
          <Hold />
        </div>
      )}
      <div
        className={`w-full p-4 gap-4 grid justify-center items-center`}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
          gridAutoRows: "auto",
        }}
      >
        {participants.map((participant) => (
          <VideoParticipant
            key={participant.socket_id}
            socket_id={participant.socket_id}
            name={participant.name}
            is_camera_on={participant.is_camera_on}
            is_muted={participant.is_muted}
            photo_url={participant.photo_url}
            is_host={participant.socket_id === socketId}
            toggleCamera={toggleCamera}
            toggleMute={toggleMute}
          />
        ))}
      </div>
      <div className="flex gap-4 flex-col">
        {enabledButtonHold && <ButtonHold active={hold} onClick={toggleHold} />}
        {enabledButtonEnd && <ButtonEnd onClick={endCall} />}
      </div>
    </VContainer>
  );
}
