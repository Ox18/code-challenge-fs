import { tv } from "tailwind-variants";

type ButtonProps = {
  variant?: "default" | "primary" | "danger";
  icon: React.ReactNode;
  onClick?: () => void;
};

const variants = tv({
  base: "btn bg-gradient-to-r from-white/30 to-white/10 backdrop-blur-md text-white px-3 py-3 rounded-2xl",
  variants: {
    variant: {
      default: "",
      primary: "bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400",
      danger: "bg-red-500 hover:bg-red-600 disabled:bg-red-400",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export default function Button({ variant, icon, ...props }: ButtonProps) {
  return (
    <div className={variants({ variant })} {...props}>
      {icon}
    </div>
  );
}
