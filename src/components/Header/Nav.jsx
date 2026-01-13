import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
    const navs = [
        {
            name: "Home",
            url: "/",
            active: false,
        },
        {
            name: "All Posts",
            url: "/all-posts",
            active: false,
        },
        {
            name: "Add post",
            url: "/add-post",
            active: false,
        },
    ];
    return (
        <nav className="rounded-full border px-6 ">
            <ul className="flex gap-5">
                {navs.map((nav) => (
                    <li
                        className="px-2 py-1  hover:text-gray-700 hover:underline  transition"
                        key={nav.name}
                    >
                        <NavLink to={nav.url}>{nav.name}</NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Nav;
