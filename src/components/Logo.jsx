import React from "react";
// import logo from './assets/logo.png';
import logo from "../assets/Logo.png";

const Logo = ({ width }) => {
    return (
        <img
            className="invert inline-block"
            style={{ width }}
            src={logo}
            alt="logo"
        />
    );
};

export default Logo;
