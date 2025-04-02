import VTableSkeleton from "./VTableSkeleton";

type VTableProps = {
  children: React.ReactNode;
  loading?: boolean;
};

export default function VTable(props: VTableProps) {
  return props?.loading ? (
    <VTableSkeleton />
  ) : (
    <table className="w-full bg-white">{props.children}</table>
  );
}
