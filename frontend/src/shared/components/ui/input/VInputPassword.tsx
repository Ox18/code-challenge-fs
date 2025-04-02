"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import VInputText from "./VInputText";

export default function VInputPassword({
  className,
  ...props
}: {
  size?: "sm" | "md" | "lg";
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <VInputText
        type={showPassword ? "text" : "password"}
        {...props}
        className="w-full"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
}
