import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

import appwriteService from "../../appwrite/auth";
import { logout } from "../../store/features/authSlice";
import { useDispatch } from "react-redux";

const Actions = ({ authStatus }) => {
    const auth = authStatus;
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const buttons = [
        {
            title: "Login",
            action: () => {
                navigate("/login");
            },
            auth: !auth,
            className: "bg-white px-4 bg-gray-300",
        },
        {
            title: "Logout",
            auth: auth,
            className: "bg-white px-2 py-1",
            action: () => {
                appwriteService.logout().then(() => {
                    dispatch(logout());
                });
            },
        },
        {
            title: "Sign Up",
            action: () => {
                navigate("/signup");
            },
            auth: !auth,
            className: "bg-gray-700 text-white/90 px-3 py-1.5",
        },
    ];
    return (
        <div className="space-x-2 flex gap-4">
            {buttons.map((btn) =>
                btn.auth ? (
                    <Button
                        title={btn.title}
                        key={btn.title.replace(" ", "").toLowerCase()}
                        className={` text-sm border rounded transition hover:shadow-md ${btn.className}`}
                        onClick={btn.action}
                    />
                ) : // <button
                //     key={btn.title.replace(" ", "").toLowerCase()}
                //     className={` text-sm border rounded transition hover:shadow-md ${btn.className}`}
                //     onClick={btn.action}
                // >
                //     {btn.title}
                // </button>
                null
            )}
        </div>
    );
};

export default Actions;
