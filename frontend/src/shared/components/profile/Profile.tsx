"use client";
import { useAuth } from "@/shared/hooks/useAuth";
import VAvatar from "../ui/avatar/VAvatar";
import { useState } from "react";

export default function Profile() {
  const { me, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="relative w-full flex justify-center">
      <div className="flex items-center gap-2" onClick={toggleMenu}>
        <VAvatar src={me?.photo_url} name={me?.name} />
      </div>

      {menuOpen && (
        <div className="absolute left-0 bottom-0 mt-2 ml-17 bg-white rounded-lg shadow-lg w-50 p-2">
          <div className="absolute left-1/2 transform -translate-x-1/2 top-[-10px] w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-b-white" />
          <div>
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 px-5"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
