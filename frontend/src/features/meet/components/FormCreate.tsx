"use client"
import { FormProvider } from "react-hook-form";
import { useFormCreate } from "../hooks/useFormCreate";
import FormSelect from "@/shared/components/form/select/FormSelect";
import VButton from "@/shared/components/ui/button/VButton";
import VFormInputText from "@/shared/components/form/input/VFormInputText";

export default function FormCreate() {
  const { methods, invalidForm, queuesOptions, submit } = useFormCreate();

  return (
    <div className="w-full">
      <FormProvider {...methods}>
        <form onSubmit={submit} className="flex flex-col gap-10">
          <h3>
            <span className="text-2xl font-bold">Create</span>
          </h3>
          <div className="flex flex-col gap-4">
            <VFormInputText
              name="name"
              title="Name"
              placeholder="Please enter your name"
            />
            <FormSelect name="queue_id" title="Queue" options={queuesOptions} />
            {methods.formState.errors.root?.message && (
              <p className="text-red-500 text-sm">
                {methods.formState.errors.root.message}
              </p>
            )}
          </div>
          <VButton block size="md" disabled={invalidForm}>
            Create
          </VButton>
        </form>
      </FormProvider>
    </div>
  );
}
