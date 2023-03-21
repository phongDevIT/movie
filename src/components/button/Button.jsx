import React from "react";

const Button = ({
    onClick,
    className,
    children,
    type = "button",
    bgColor = "primary",
}) => {
    let bgClassName = "bg-primary";
    switch (bgColor) {
        case "primary":
            bgClassName = "bg-primary";
            break;
        case "secondary":
            bgClassName = "bg-secondary";
            break;
        default:
            break;
    }
    return (
        <button
            type={type}
            onClick={onClick}
            className={`px-6 py-3 rounded-lg capitalize mt-auto ${bgClassName} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
