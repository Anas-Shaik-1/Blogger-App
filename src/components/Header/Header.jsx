import { Link, NavLink } from "react-router-dom";
import { Actions, Nav, Logo } from "./index";
import { useSelector } from "react-redux";
const Header = () => {
    const status = useSelector((state) => state.auth.status);

    return (
        <header className="px-6 md:px-10 py-4 flex justify-between items-center shadow  rounded-lg sticky top-2 bg-[#fefefe] z-99">
            <Link to="/" className="outline-0">
                <div className="logo text-3xl font-bold">
                    <Logo width="100px" />
                </div>
            </Link>

            {/* <div className="hidden lg:flex lg:justify-between"> */}
            <Nav authStatus={status} />

            <Actions authStatus={status} />
            {/* </div> */}
        </header>
    );
};

export default Header;
