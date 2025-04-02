"use client";
import VFormInputPassword from "@/shared/components/form/input/VFormInputPassword";
import VFormInputText from "@/shared/components/form/input/VFormInputText";
import VButton from "@/shared/components/ui/button/VButton";
import { FormProvider } from "react-hook-form";
import { useFormLogin } from "../hooks/useFormLogin";

export default function FormLogin() {
  const { methods, disabledSubmit, loading, submit } = useFormLogin();

  return (
    <FormProvider {...methods}>
      <form onSubmit={submit} className="flex flex-col gap-10">
        <h3>
          <span className="text-2xl font-bold">Sign In</span>
        </h3>
        <div className="flex flex-col gap-4">
          <VFormInputText
            name="email"
            title="Email"
            placeholder="Please enter your email"
          />
          <VFormInputPassword
            name="password"
            title="Password"
            placeholder="Please enter your password"
          />
          {methods.formState.errors.root?.message && (
            <p className="text-red-500 text-sm">
              {methods.formState.errors.root.message}
            </p>
          )}
        </div>
        <VButton block size="md" disabled={disabledSubmit} loading={loading}>
          Sign In
        </VButton>
      </form>
    </FormProvider>
  );
}
