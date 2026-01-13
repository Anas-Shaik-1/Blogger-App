import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import {
    BrowserRouter,
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Protected from "./components/AuthLayout.jsx";
import {
    AddPost,
    AllPosts,
    EditPost,
    Home,
    Login,
    Post,
    Signup,
} from "./pages/index.js";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: (
                    <Protected authentication={false}>
                        <Login />
                    </Protected>
                ),
            },

            {
                path: "/signup",
                element: (
                    <Protected authentication={false}>
                        <Signup />
                    </Protected>
                ),
            },
            {
                path: "/all-posts",
                element: (
                    <Protected authentication>
                        <AllPosts />
                    </Protected>
                ),
            },
            {
                path: "/post/:slug",
                element: (
                    <Protected authentication>
                        <Post />
                    </Protected>
                ),
            },
            {
                path: "/edit-post/:slug",
                element: (
                    <Protected authentication>
                        <EditPost />
                    </Protected>
                ),
            },
            {
                path: "/add-post/",
                element: (
                    <Protected authentication>
                        <AddPost />
                    </Protected>
                ),
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
