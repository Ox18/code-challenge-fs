type VTableBody = {
  children: React.ReactNode;
};

export default function VTableBody({ children }: VTableBody) {
  return <tbody>{children}</tbody>;
}
