type ButtonHoldProps = {
    active: boolean;
    onClick: () => void;
  };
  
  export default function ButtonHold({ active, onClick }: ButtonHoldProps) {
    return (
      <button
        onClick={onClick}
        className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200
          ${
            active
              ? "bg-red-500 hover:bg-red-600 text-white shadow-md"
              : "bg-green-500 hover:bg-green-600 text-white shadow-md"
          }
        `}
      >
        {active ? "Hold" : "Unhold"}
      </button>
    );
  }
  