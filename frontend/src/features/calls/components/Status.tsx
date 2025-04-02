import { tv } from "tailwind-variants";

const statusVariants = tv({
  base: "w-[100px] flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full",
  variants: {
    status: {
      waiting: "text-yellow-700 bg-yellow-100",
      active: "text-green-700 bg-green-100",
      on_hold: "text-blue-700 bg-blue-100",
      ended: "text-gray-700 bg-gray-100",
      failed: "text-red-700 bg-red-100",
    },
  },
});

const circleVariants = tv({
  base: "w-2 h-2 rounded-full",
  variants: {
    status: {
      waiting: "bg-yellow-500",
      active: "bg-green-500",
      on_hold: "bg-blue-500",
      ended: "bg-gray-400",
      failed: "bg-red-500",
    },
  },
});

export default function Status({ status }: { status: any }) {
  const statusText: Record<string, string> = {
    waiting: "Waiting",
    active: "Active",
    on_hold: "On Hold",
    ended: "Ended",
    failed: "Failed",
  };

  return (
    <div className={statusVariants({ status })}>
      <div className={circleVariants({ status })} />
      {statusText[status]}
    </div>
  );
}
