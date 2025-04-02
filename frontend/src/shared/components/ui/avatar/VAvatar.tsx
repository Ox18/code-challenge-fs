import { useState } from "react";

type VAvatarProps = {
  src?: string;
  name?: string;
};

export default function VAvatar({ src, name = "User" }: VAvatarProps) {
  const [imageLoaded, setImageLoaded] = useState(true);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0]?.toUpperCase() || "")
      .slice(0, 2)
      .join("");
  };

  return (
    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-300 text-gray-700 font-bold overflow-hidden">
      {imageLoaded && src ? (
        <img
          src={src}
          alt="avatar"
          className="w-full h-full object-cover"
          onError={() => setImageLoaded(false)}
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
}
