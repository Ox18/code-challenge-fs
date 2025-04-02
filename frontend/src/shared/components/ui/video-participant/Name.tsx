import { CircleUserRound } from "lucide-react";

type NameProps = {
  children: React.ReactNode;
};

export default function Name({ children }: NameProps) {
  return (
    <div
      className="px-4 py-2 rounded-xl flex items-center gap-2
    bg-gradient-to-r from-white/30 to-white/10 backdrop-blur-md text-white"
    >
      <CircleUserRound className="w-6 h-6" />
      <p className="font-semibold">{children}</p>
    </div>
  );
}
