import { Participant } from "@/shared/types/participant";
import Name from "./Name";
import Button from "./Button";
import { Mic, MicOff, PhoneOff, Video, VideoOff } from "lucide-react";

type VideoParticipantProps = Participant & {
  is_host?: boolean;
  toggleCamera?: () => void;
  toggleMute?: () => void;
};

export default function VideoParticipant(props: VideoParticipantProps) {
  return (
    <div className="relative w-full h-full   rounded-4xl overflow-hidden max-h-[400px] max-w-[400px]">
      <div className="relative w-full h-full">
        <img
          src={props.photo_url}
          alt="avatar background"
          className="w-full h-full object-cover blur-md scale-105 select-none"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={props.photo_url}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover shadow-lg select-none"
          />
        </div>
      </div>
      {props.is_host && (
        <div className="absolute top-4 left-4 z-10">
          <Name>{props.socket_id}</Name>
        </div>
      )}
      {!props.is_host && (
        <div className="absolute top-4 right-4 z-10 px-4 py-2 flex gap-2">
          {props.is_camera_on && (
            <Button
              icon={<VideoOff className="w-6 h-6" />}
              variant={"danger"}
            />
          )}
          {props.is_muted && (
            <Button icon={<MicOff className="w-6 h-6" />} variant={"danger"} />
          )}
        </div>
      )}
      {props.is_host && (
        <div className="absolute bottom-0  z-10 px-4 py-2 rounded-xl flex justify-center items-center gap-2  w-full">
          {props.is_muted ? (
            <Button
              icon={<MicOff className="w-6 h-6" />}
              variant={"danger"}
              onClick={props.toggleMute}
            />
          ) : (
            <Button
              icon={<Mic className="w-6 h-6" />}
              onClick={props.toggleMute}
            />
          )}
          {props.is_camera_on ? (
            <Button
              icon={<VideoOff className="w-6 h-6" />}
              variant={"danger"}
              onClick={props.toggleCamera}
            />
          ) : (
            <Button
              icon={<Video className="w-6 h-6" />}
              onClick={props.toggleCamera}
            />
          )}

          <Button icon={<PhoneOff className="w-6 h-6" />} variant={"danger"} />
        </div>
      )}
      {!props.is_host && (
        <div className="absolute bottom-0 left-0 z-10 px-5 py-5 rounded-xlgap-2">
          <Name>{props.socket_id}</Name>
        </div>
      )}
    </div>
  );
}
