import React from "react";
import Button from "./Button";

const Error = ({ msg, action, className = "" }) => {
    return (
        <div
            className={`bg-red-700/20  py-2 px-6 m-4 border border-red-700 rounded  text-sm space-x-4 text-center flex items-center ${className} inline-block  `}
        >
            <p>
                {/* Incorrect username or password */}
                {msg}
            </p>
            <Button
                className="font-mono text-md text-red-700 cursor-pointer h-7 w-7 flex items-center justify-center p-0"
                onClick={action}
                title="X"
            />
        </div>
    );
};

export default Error;
