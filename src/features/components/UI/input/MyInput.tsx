import React, { useRef, useState } from "react";
import "../input/MyInput.scss";
import { handleClear } from "features/utils/utils";

interface MyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  id: string;
  onClear?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
}

const MyInput: React.FC<MyInputProps> = ({ id, onClear, value, onChange, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [showClear, setShowClear] = useState<boolean>(!!value);

  const handleFocus = () => {
    setIsFocused(true);
    setShowClear(!!value);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setShowClear(false);
  };

  const handleInputClear = () => {
    handleClear(inputRef, onClear, onChange, id);
    setShowClear(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e, id);
    setShowClear(!!e.target.value);
  };

  return (
    <div className={`myInput-container ${isFocused ? "active" : ""}`}>
      <input
        id={id}
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="myInput"
        value={value}
        onChange={handleChange}
        type="text"
        autoComplete="off"
        inputMode="text"
        autoCorrect="off"
        spellCheck={false}
        {...props}
      />
      {showClear && (
        <button
          type="button"
          className="myInput-clear-icon"
          onMouseDown={e => {
            e.preventDefault();
            handleInputClear();
          }}
          aria-label="Очистить поле">
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default MyInput;
