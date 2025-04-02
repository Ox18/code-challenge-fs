import { tv } from "tailwind-variants";

export const buttonVariants = tv({
  base: "v-button px-4 py-2 rounded-[6px] transition-all text-white text-[13px] h-[42px] font-semibold btn disabled:opacity-50 disabled:cursor-not-allowed",
  variants: {
    variant: {
      default: "",
      primary: "bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400",
      danger: "bg-red-500 hover:bg-red-600 disabled:bg-red-400",
    },
    block: {
      true: "w-full",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
    loading: {
      true: "opacity-50 cursor-not-allowed",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
