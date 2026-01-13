// import React from "react";

// const Footer = () => {
//     return (
//         <div className="w-full py-3 pt-7 px-1 text-center">
//             <hr className="w-9/10 mx-auto" />
//             <p className="text-sm text-gray-700 font-">Copyright © 2026 Anas</p>
//         </div>
//     );
// };

// export default Footer;

/* Copied  */

// import React from "react";
// import Logo from "../Logo";
import { Link } from "react-router-dom";
import Logo from "../Logo";

// function Footer() {
//     const links = {
//         Company: ["Press Kit", "Affiliate Program", "Pricing", "Features"],
//         Support: ["Help", "Account", "Contact Us", "Customer Support"],
//         Legals: ["Terms & Conditions", "Privacy Policy", "Licensing"],
//     };
//     return (
//         <section className="relative overflow-hidden py-10 px-5">
//             <hr className="pb-4 pt-2 mx-auto " />
//             <div>
//                 <div className=" flex justify-between px-6">
//                     <div className="w-full p-6 md:w-1/2 lg:w-5/12">
//                         <div className="mb-4 inline-flex items-center">
//                             <Logo width="100px" />
//                         </div>
//                     </div>
//                     <div className="flex gap-4">
//                         {Object.entries(links).map((items) => (
//                             <div className="flex flex-col mx-4" key={items[0]}>
//                                 <h3 className="tracking-px mb-2   font-semibold uppercase text-gray-500">
//                                     {items[0]}
//                                 </h3>
//                                 <ul>
//                                     {items[1].map((item) => (
//                                         <li key={item}>
//                                             <Link
//                                                 className="-my-1 text-sm font-medium text-gray-900 hover:text-gray-700 transition"
//                                                 to="/"
//                                             >
//                                                 {item}
//                                             </Link>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <p className="text-xs text-gray-600 text-center py-2 pt-4">
//                     &copy; Copyright 2023. All Rights Reserved by DevUI.
//                 </p>
//             </div>
//         </section>
//     );
// }

// export default Footer;

export default function Footer() {
    return (
        <footer className="bg-white/80 w-full dark:bg-black  dark:border-zinc-800 ">
            <hr />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 ">
                    <div className="text-center md:text-left py-2 ">
                        <Logo width={"50px"} />
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 tracking-wider ">
                            Paste Your Thought here.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6">
                        {["about", "services", "privacy", "terms"].map(
                            (item) => (
                                <Link
                                    key={item}
                                    to="/"
                                    className="text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                                >
                                    {item[0].toUpperCase() + item.slice(1)}
                                </Link>
                            )
                        )}
                    </div>
                </div>

                <div className="pt-2 border-t border-gray-200 dark:border-zinc-800 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        © 2026 Blogger. All rights reserved - Anas.
                    </p>
                </div>
            </div>
        </footer>
    );
}
