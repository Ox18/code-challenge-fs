import { tv } from "tailwind-variants";

type VTableRowProps = {
  children: React.ReactNode;
  active?: boolean;
  [key: string]: any;
};

const rowVariants = tv({
  base: "hover:bg-gray-100 transition-colors duration-300",
  variants: {
    active: {
      true: "bg-blue-50",
      false: "bg-white",
    },
  },
  defaultVariants: {
    active: false,
  },
});

export default function VTableRow({
  children,
  active,
  ...props
}: VTableRowProps) {
  return (
    <tr className={rowVariants({ active })} {...props}>
      {children}
    </tr>
  );
}
