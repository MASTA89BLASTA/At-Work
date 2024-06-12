//быстрый компонент rsc
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import "../button/MyButton.scss"

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const MyButton = ({children, className, onClick, ...props}: MyButtonProps) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (onClick) {
      onClick(event);
    }
    event.preventDefault(); 
  };
  return (
     <button {...props} className={className} onClick={handleClick}>
        {children}
    </button>
  );
};

export default MyButton;