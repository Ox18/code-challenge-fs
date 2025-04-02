"use client";
import VFormInputPassword from "@/shared/components/form/input/VFormInputPassword";
import VFormInputText from "@/shared/components/form/input/VFormInputText";
import VButton from "@/shared/components/ui/button/VButton";
import { FormProvider } from "react-hook-form";
import { useFormRegister } from "../hooks/useFormRegister";
import FormSelect from "@/shared/components/form/select/FormSelect";

export default function FormRegister() {
  const { methods, disabledSubmit, loading, queuesOptions, submit } =
    useFormRegister();

  return (
    <FormProvider {...methods}>
      <form onSubmit={submit} className="flex flex-col gap-10">
        <h3>
          <span className="text-2xl font-bold">Sign Up</span>
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
          <FormSelect name="queue" title="Queue" options={queuesOptions} />
          {methods.formState.errors.root?.message && (
            <p className="text-red-500 text-sm">
              {methods.formState.errors.root.message}
            </p>
          )}
        </div>
        <VButton block size="md" disabled={disabledSubmit} loading={loading}>
          Sign Up
        </VButton>
      </form>
    </FormProvider>
  );
}
