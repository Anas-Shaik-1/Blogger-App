import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { Button, Input, Logo } from "../components/index";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/features/authSlice";

const Signup = () => {
    const [authError, setAuthError] = useState("");
    const { register, handleSubmit } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClearError = () => {
        setAuthError("");
    };

    const create = async ({ name, email, password }) => {
        try {
            const response = await authService.createAccount({
                name,
                email,
                password,
            });

            if (response) {
                const userData = await authService.getCurrentUser();

                if (userData) {
                    dispatch(authLogin(userData));
                    navigate("/");
                }
            }
        } catch (error) {
            setAuthError(error.message);
        }
    };

    return (
        <div className="p-5 px-7 rounded-xl flex flex-col items-center ring ring-black/20 shadow-md">
            <Logo width="80px" />
            <h1 className="text-lg py-2 font-semibold text-black/50">
                Sign Up to Blogger
            </h1>
            <form
                className="flex flex-col items-center"
                onSubmit={handleSubmit(create)}
            >
                {authError ? (
                    <div className="bg-red-700/20  py-2 px-6 m-4 border  border-red-700 rounded  text-sm space-x-4 text-center flex items-center ">
                        <p>{authError}</p>
                        <Button
                            className="font-mono text-md text-red-700 cursor-pointer h-7 w-7 flex items-center justify-center"
                            onClick={handleClearError}
                            title="X"
                        />
                    </div>
                ) : null}

                <Input
                    label="Name"
                    placeholder="Enter Your Name"
                    spellCheck="false"
                    {...register("name", {
                        required: true,
                    })}
                />
                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter Your Email"
                    spellCheck="false"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPattern: (value) =>
                                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                    value
                                ) || "Email address must be a valid addressW",
                        },
                    })}
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter Your Password"
                    link="/"
                    {...register("password", {
                        required: true,
                    })}
                />
                <p className="text-sm  mt-2">
                    <span>Already have an account?</span>{" "}
                    <Link
                        to="/login"
                        className="text-blue-700 focus:outline-none focus:underline"
                    >
                        Login
                    </Link>
                </p>
                <Button
                    title="Sign Up"
                    className="mt-4 px-3 py-1.5"
                    type="submit"
                />
            </form>
        </div>
    );
};

export default Signup;
