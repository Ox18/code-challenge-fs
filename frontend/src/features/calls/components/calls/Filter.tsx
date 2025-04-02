import { Flag, Pin, Trash } from "lucide-react";
import FilterItem from "./FilterItem";
import VPopover from "@/shared/components/ui/popover/VPopover";
import VCheckboxGroup from "@/shared/components/ui/checkbox-group/VCheckboxGroup";
import { useFilters } from "../../hooks/calls/useFilters";

export default function Filter() {
  const {
    status,
    queues,
    disabledReset,
    disabledApply,
    queuesOptions,
    changeStatus,
    changeQueues,
    apply,
    reset,
  } = useFilters();

  return (
    <div className="flex gap-5 bg-white border-t border-b border-[#f2f2f2] py-4 px-5 items-center justify-end">
      <div className="flex gap-5">
        <VPopover
          trigger={
            <FilterItem prependIcon={Flag} count={status.length}>
              Status
            </FilterItem>
          }
        >
          <div>
            <VCheckboxGroup
              options={[
                {
                  value: "waiting",
                  label: "Waiting",
                },
                {
                  value: "active",
                  label: "Active",
                },
              ]}
              selectedValues={status}
              onChange={changeStatus}
            />
          </div>
        </VPopover>
        <VPopover
          trigger={
            <FilterItem prependIcon={Pin} count={queues.length}>
              Queue
            </FilterItem>
          }
        >
          <div>
            <VCheckboxGroup
              options={queuesOptions}
              selectedValues={queues}
              onChange={changeQueues}
            />
          </div>
        </VPopover>
      </div>
      <div className="flex gap-3">
        <button
          className={
            disabledReset
              ? "btn flex gap-2 items-center px-5 py-2 rounded-lg opacity-50 bg-[#f2f2f2]"
              : "btn bg-[#f2f2f2] flex gap-2 items-center px-5 py-2 rounded-lg"
          }
          onClick={reset}
        >
          <Trash className="w-4 h-4" />
          <span>Clear</span>
        </button>
        <button
          className={
            disabledApply
              ? "btn flex gap-2 items-center px-5 py-2 rounded-lg opacity-50 bg-[#f2f2f2]"
              : "btn flex gap-2 items-center px-5 py-2 rounded-lg bg-amber-500"
          }
          onClick={apply}
        >
          <span>Apply</span>
        </button>
      </div>
    </div>
  );
}
