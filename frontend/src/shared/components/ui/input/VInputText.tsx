import { tv } from "tailwind-variants";

export default function VInputText({
  className,
  variant = "default",
  size,
  type = "text",
  ...props
}: {
  className?: string;
  variant?: "default" | "outline" | "error";
  size?: "sm" | "md" | "lg";
} & React.InputHTMLAttributes<HTMLInputElement>) {
  /** Definir estilos con `tv` */
  const input = tv({
    base: "v-input-text px-4 py-2 rounded  text-gray-800 transition-all focus:outline-none focus:ring-2 bg-[#3db18312] w-full",
    variants: {
      variant: {
        default: "focus:ring-blue-500",
        outline: "border-2 border-blue-500 focus:ring-blue-600",
        error: "border-red-500 focus:ring-red-600",
      },
      size: {
        sm: "text-sm py-1",
        md: "text-base py-2",
        lg: "text-lg py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  });

  return (
    <div>
      <input
        className={input({ variant, size, className })}
        type={type}
        {...props}
      />
    </div>
  );
}
