import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type VTableColumnProps = {
  children: React.ReactNode;
  prependIcon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  appendIcon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

export default function VTableColumn(props: VTableColumnProps) {
  return (
    <th className="py-3 text-start pl-5 font-medium text-[#939598]">
      <div className="flex gap-1 items-center">
        {props.prependIcon && <props.prependIcon className="size-5" />}
        {props.children}
        {props.appendIcon && <props.appendIcon className="size-5"  />}
      </div>
    </th>
  );
}
