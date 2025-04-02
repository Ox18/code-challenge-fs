import { useFormContext } from "react-hook-form";
import VLabel from "../../ui/label/VLabel";
import VError from "../../ui/error/VError";

type FormSelectProps = {
  options: {
    value: string;
    label: string;
  }[];
  name: string;
  title: string;
};

export default function FormSelect(props: FormSelectProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-3">
      <VLabel>{props.title}</VLabel>
      <select className="v-input v-input-text px-4 py-2 rounded  text-gray-800 transition-all focus:outline-none focus:ring-2 bg-[#3db18312] w-full" {...register(props.name)}>
        <option value="">Select a value</option>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[props.name] && (
        <VError>{errors[props.name]?.message as string}</VError>
      )}
    </div>
  );
}
