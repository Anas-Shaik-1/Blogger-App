import React, { useId } from "react";

const Button = ({ title, className, ...props }) => {
    const id = useId();
    return (
        <button
            key={id}
            className={`
            active:scale-95
            focus-visible:outline-none
            focus-visible:ring-1 
            focus-visible:ring-gray-500 
            text-sm border rounded transition  ${className}`}
            id={id}
            {...props}
        >
            {title}
        </button>
    );
};

export default Button;
