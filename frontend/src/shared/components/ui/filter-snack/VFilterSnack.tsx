import { X } from "lucide-react";
import { useState } from "react";

type VFilterSnackProps = {
  selectedValues: string[];
  onChange: (values: string[]) => void;
};

export default function VFilterSnack({
  selectedValues,
  onChange,
}: VFilterSnackProps) {
  const [search, setSearch] = useState("");

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === "") return;

    if (e.key === "Enter") {
      onChange([...selectedValues, e.currentTarget.value]);
      setSearch("");
    }
  };

  const deleteValue = (value: string) => {
    onChange(selectedValues.filter((v) => v !== value));
  }
  return (
    <div className="space-y-2 flex flex-col gap-2">
      <div className="flex flex-wrap gap-2 w-40">
        {selectedValues.map((value) => (
          <div
            key={value}
            className="flex items-center gap-2 bg-[#f2f2f2] px-3 rounded-2xl"
          >
            {value}
            <X className="size-5 btn" onClick={() => deleteValue(value)} />
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Buscar"
        className="v-input-text"
        onKeyPress={onEnter}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
