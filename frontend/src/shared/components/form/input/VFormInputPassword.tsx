"use client";
import VLabel from "../../ui/label/VLabel";
import VInputPassword from "../../ui/input/VInputPassword";
import { useFormContext } from "react-hook-form";
import VError from "../../ui/error/VError";

export default function VFormInputPassword({
  title,
  name,
  ...props
}: {
  name: string;
  size?: "sm" | "md" | "lg";
  title: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col gap-3">
      <VLabel>{title}</VLabel>
      <VInputPassword {...register(name)} {...props} />

      {errors[name] && <VError>{errors[name]?.message as string}</VError>}
    </div>
  );
}
