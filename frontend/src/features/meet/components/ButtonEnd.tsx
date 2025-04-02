type ButtonEndProps = {
  onClick: () => void;
};

export default function ButtonEnd(props: ButtonEndProps) {
  return (
    <button
      className="px-5 py-2.5 rounded-xl font-medium transition-all duration-200 bg-red-500 hover:bg-red-600 text-white shadow-md"
      onClick={props.onClick}
    >
      End Call
    </button>
  );
}
