type WrapperSectionProps = {
  children: React.ReactNode;
  title?: string;
  count?: number;
  id?: string;
};

export default function WrapperSection(props: WrapperSectionProps) {
  return (
    <div>
      <div className="px-10 py-5  font-semibold border-b border-[#f1f1f1] text-[#797b7d]">
        {props.title}
      </div>
      <div className="px-10 py-7">
        <div>
          <h1 className="text-5xl font-semibold text-[#1c2c3b]">
            {props.title}
            <span className="text-[#bdbfc1] pl-2">
              {props.count} {props.id}
            </span>
          </h1>
        </div>
        {props.children}
      </div>
    </div>
  );
}
