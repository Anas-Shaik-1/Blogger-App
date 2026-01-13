import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({ children, authentication = true }) => {
    const navigate = useNavigate();
    // const [loader, setLoader] = useState(true);

    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        if (authentication && authStatus != authentication) {
            navigate("/login");
        } else if (!authentication && authStatus !== authentication) {
            navigate("/");
        }

        // setLoader(false);

        // const timer = setTimeout(() => setLoader(false), 0); // schedule for next tick
        // return () => clearTimeout(timer); // cleanup
    }, [authStatus, navigate, authentication]);

    // return loader ? <h1>Loading....</h1> : <>{children}</>;
    return <>{children}</>;
};

export default Protected;
