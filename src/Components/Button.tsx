import React from "react";

type ButtonProps = {
    children: React.ReactNode;
    onClick: () => void;
    css: string;
};

const Button: React.FC<ButtonProps> = ({ children, onClick, css }) => {
    return (
    <button onClick={onClick} className={`btn ${css}`}>
        {children}
    </button>
    );
};

export default Button;