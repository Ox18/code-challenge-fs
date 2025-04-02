import React from "react";

type CheckboxGroupProps = {
  options: {
    value: string;
    label: string;
  }[];
  selectedValues: string[];
  onChange: (value: string) => void;
};

export default function VCheckboxGroup({
  options,
  selectedValues,
  onChange,
}: CheckboxGroupProps) {
  const handleChange = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(value);
    } else {
      onChange(value);
    }
  };

  return (
    <div className="space-y-2">
      {options.map((option) => (
        <div key={option.value} className="flex items-center gap-2">
          <input
            type="checkbox"
            id={option.value}
            checked={selectedValues.includes(option.value)}
            onChange={() => handleChange(option.value)}
          />
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
    </div>
  );
}
