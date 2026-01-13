import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/features/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { useState } from "react";
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data);

            if (session) {
                const userData = await authService.getCurrentUser();

                if (userData) {
                    dispatch(authLogin(userData));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleClearError = () => {
        setError("");
    };

    return (
        <div className="p-5 px-7 rounded-xl flex flex-col items-center ring ring-black/20 shadow-md">
            <Logo width="80px" />

            <h1 className="text-lg py-2 font-semibold text-black/50">
                Login in to Blogger
            </h1>
            <form
                className="flex flex-col items-center pt-4"
                onSubmit={handleSubmit(login)}
            >
                {error ? (
                    <div className="bg-red-700/20  py-2 px-6 m-4 border  border-red-700 rounded  text-sm space-x-4 text-center flex items-center ">
                        <p>
                            {/* Incorrect username or password */}
                            {error}
                        </p>
                        <Button
                            className="font-mono text-md text-red-700 cursor-pointer h-7 w-7 flex items-center justify-center"
                            onClick={handleClearError}
                            title="X"
                        />
                    </div>
                ) : null}

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
                    tabIndex={0}
                />
                <div className="w-full  relative">
                    <Link
                        to="/"
                        className="focus:outline-none focus:underline absolute top-0 right-0 text-xs text-blue-800 mt-2 z-99"
                    >
                        Forgot password?
                    </Link>

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter Your Password"
                        link="/"
                        {...register("password", {
                            required: true,
                        })}
                    />
                </div>
                <Button
                    title="Login"
                    type="submit"
                    className="mt-4 px-3 py-1.5"
                />
            </form>
        </div>
    );
};

export default Login;
