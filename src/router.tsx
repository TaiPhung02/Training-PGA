import { createBrowserRouter } from "react-router-dom";

import Layout from "./layouts/Layout/Layout.tsx";
import PrivateRouter from "./components/PrivateRouter/PrivateRouter.tsx";

import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.tsx";
import Home from "./pages/Home/Home.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        children: [
            {
                path: "/",
                element: (
                    <PrivateRouter>
                        <Home></Home>
                    </PrivateRouter>
                ),
            },
            {
                path: "*",
                element: (
                    <PrivateRouter>
                        <NotFound></NotFound>
                    </PrivateRouter>
                ),
            },
        ],
    },
    {
        path: "/login",
        element: <LoginPage></LoginPage>,
    },
    {
        path: "/register",
        element: <RegisterPage></RegisterPage>,
    },
]);

export default router;
