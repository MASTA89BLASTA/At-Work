//быстрый компонент rsc
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import "../button/MyButton.scss"

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

const MyButton = ({children, className, onClick, ...props}: MyButtonProps) => {
  return (
     <button {...props} className={className}>
        {children}
    </button>
  );
};

export default MyButton;