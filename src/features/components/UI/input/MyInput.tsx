import React, { useRef, useState } from "react";
import "../input/MyInput.scss";
import { handleClear } from "features/utils/utils";

interface MyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  id: string;
  onClear?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
}

const MyInput: React.FC<MyInputProps> = ({
  id,
  onClear,
  value,
  onChange,
  ...props
}) => {
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
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="myInput"
        value={value}
        onChange={handleChange}
        {...props}
      />
      {showClear && (
        <span
          className="material-icons myInput-clear-icon"
          onMouseDown={handleInputClear}
        >
          close
        </span>
      )}
    </div>
  );
};

export default MyInput;
