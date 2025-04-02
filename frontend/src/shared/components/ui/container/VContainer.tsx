export default function VContainer({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}): React.ReactElement {
  return (
    <div className="v-container max-w-screen-2xl mx-auto px-4 w-full" {...props}>
      {children}
    </div>
  );
}
