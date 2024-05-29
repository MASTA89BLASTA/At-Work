import React, { useRef, useState } from "react";

import "../input/MyInput.scss";

interface MyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

const MyInput = React.forwardRef<HTMLInputElement, MyInputProps>(
  (props, ref) => {
    const [isActive, setActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFocus = () => {
      setActive(true);
    };

    const handleBlur = () => {
      setActive(false);
    };

    return (
      <div className={`myInput-container ${isActive ? "active" : ""}`}>
        <input
          ref={inputRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="myInput"
          {...props}
        />
        {isActive && (
          <span className="material-icons myInput-clear-icon">close</span>
        )}
      </div>
    );
  }
);

export default MyInput;
