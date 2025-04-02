import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

type VPopoverProps = {
  children: React.ReactNode;
  trigger: React.ReactNode;
};

export default function VPopover({ children, trigger }: VPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const popoverRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleClick = (event: React.MouseEvent) => {
    setIsOpen(!isOpen);
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setPosition({
      top: rect.bottom,
      left: rect.left,
    });
  };

  return (
    <div className="relative">
      <div onClick={handleClick} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen &&
        ReactDOM.createPortal(
          <div
            ref={popoverRef}
            className="absolute z-10 bg-white shadow-lg p-4 rounded-lg border border-gray-200 mt-2"
            style={{
              top: position.top,
              left: position.left,
              minWidth: "200px",
            }}
          >
            {children}
          </div>,
          document.body
        )}
    </div>
  );
}
