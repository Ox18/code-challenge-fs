type VTableItemProps = {
  children: React.ReactNode;
};

export default function VTableItem({ children, ...props }: VTableItemProps) {
  return (
    <td
      className="py-3 border-b border-r text-start pl-5 border-[#f2f2f2]"
      {...props}
    >
      {children}
    </td>
  );
}
