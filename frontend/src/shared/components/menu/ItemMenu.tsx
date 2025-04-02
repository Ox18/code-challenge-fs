"use client";
import { useMenu } from "@/shared/hooks/useMenu";
import { usePathname } from "next/navigation";
import { tv } from "tailwind-variants";

type ItemMenuProps = {
  children: React.ReactNode;
  route?: string;
};

const itemMenuStyles = tv({
  base: "flex items-center justify-center rounded-lg w-[50px] h-[50px] btn transition-colors",
  variants: {
    active: {
      true: "text-white bg-[#2271f6]",
      false: "text-[#8d9398]",
    },
  },
});

export default function ItemMenu({ children, route }: ItemMenuProps) {
  const { to } = useMenu();
  const pathname = usePathname();

  const isActive = route
    ? pathname === route || pathname.startsWith(route)
    : false;

  const handleClick = () => {
    if (route) {
      to(route);
    }
  };

  return (
    <div className={itemMenuStyles({ active: isActive })} onClick={handleClick}>
      {children}
    </div>
  );
}
