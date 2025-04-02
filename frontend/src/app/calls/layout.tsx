import Menu from "@/shared/components/menu/Menu";

export default function CallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[auto_1fr] w-screen h-screen bg-[#fcfbfc]">
      <Menu />
      <div>{children}</div>
    </div>
  );
}
