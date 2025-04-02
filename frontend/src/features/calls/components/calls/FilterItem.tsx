import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type FilterItemProps = {
  children: React.ReactNode;
  prependIcon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  appendIcon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  count?: number;
};
export default function FilterItem(props: FilterItemProps) {
  return (
    <div className="flex gap-2 items-center btn">
      {props.prependIcon && <props.prependIcon className="w-4 h-4" />}
      <div>{props.children}</div>
      {props.appendIcon && (
        <div className="ml-2">
          <props.appendIcon className="w-4 h-4" />
        </div>
      )}
      {props.count !== undefined && props.count > 0 && (
        <div className="ml-2 text-sm font-medium text-[#111111] bg-blue-100 w-6 h-6 rounded-full flex items-center justify-center">
          {props.count}
        </div>
      )}
    </div>
  );
}
