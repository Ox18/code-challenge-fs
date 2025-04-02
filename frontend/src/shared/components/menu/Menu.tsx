import Profile from "../profile/Profile";
import ItemMenu from "./ItemMenu";
import { Headset } from "lucide-react";

export default function Menu() {
  return (
    <div className="bg-white border-r border-[#f6f6f6]  py-5 flex flex-col gap-5 justify-between">
      <div className="flex flex-col px-3 gap-4">
        <ItemMenu route="/calls">
          <Headset />
        </ItemMenu>
      </div>
      <Profile />
    </div>
  );
}
