type VTableHeadProps = {
  children: React.ReactNode;
};

export default function VTableHead(props: VTableHeadProps) {
  return (
    <thead>
      <tr className="px-5 border-b border-[#f2f2f2]">{props.children}</tr>
    </thead>
  );
}
