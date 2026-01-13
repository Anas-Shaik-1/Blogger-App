import React, { useId } from "react";
import { Link } from "react-router-dom";

const Input = React.forwardRef(function Input(
    { label, type = "text", className = "", link, ...props },
    ref
) {
    const id = useId();

    return (
        <div className="w-full my-1 relative">
            {label && (
                <label htmlFor={id} className="ps-1 text-sm font-semibold">
                    {label}
                </label>
            )}

            <input
                autoComplete="off"
                type={type}
                id={id}
                className={`px-3 py-1 rounded-md bg-white text-black font-sm placeholder:font-xs 
                    focus:ring-1 outline-none  
                    focus:ring-gray-500 
                    focus:bg-gray-50
                     border border-gray-200 w-full ${className}`}
                ref={ref}
                {...props}
            />
        </div>
    );
});

export default Input;
