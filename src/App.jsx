import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/features/authSlice";
import { Footer, Header } from "./components/index";
import { Outlet } from "react-router-dom";

const App = () => {
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        authService
            .getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login(userData));
                } else {
                    dispatch(logout());
                }
            })
            .finally(() => setLoading(false));
    }, [dispatch]);

    return loading ? (
        <p>Loading....</p>
    ) : (
        <div className="md:min-h-screen ">
            <div className="max-w-6xl  mx-auto hidden md:block">
                <Header />
                <Outlet />
                <Footer />
            </div>
            <div className="lg:hidden my-10  text-center">
                <h1 className="text-2xl ">
                    Mobile View is still under Development
                </h1>
                <p className="text-xl mt-4">
                    This app can only be viewed in browser
                </p>
                <p>Please visit us on Browser</p>
            </div>
        </div>
    );
};

export default App;
