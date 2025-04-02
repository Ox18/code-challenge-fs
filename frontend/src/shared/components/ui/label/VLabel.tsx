import { tv } from "tailwind-variants";

export default function VLabel({
  children,
  className,
  size = "md",
  required = false,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  required?: boolean;
} & React.LabelHTMLAttributes<HTMLLabelElement>) {
  /** Definir estilos con `tv` */
  const label = tv({
    base: "v-label text-gray-700 font-medium",
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  });

  return (
    <label className={label({ size, className })} {...props}>
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
}
