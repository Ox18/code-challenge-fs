"use client";
import VLabel from "../../ui/label/VLabel";
import VInputText from "../../ui/input/VInputText";
import { useFormContext } from "react-hook-form";
import VError from "../../ui/error/VError";

export default function VFormInputText({
  title,
  name,
  error,
  ...props
}: {
  name: string;
  size?: "sm" | "md" | "lg";
  title: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-3">
      <VLabel>{title}</VLabel>
      <VInputText {...register(name)} {...props} />

      {errors[name] && <VError>{errors[name]?.message as string}</VError>}
    </div>
  );
}
