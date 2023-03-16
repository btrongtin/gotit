import {
    createBrowserRouter,
    Outlet,
    Navigate,
    useLocation,
} from "react-router-dom";
import AuthProvider from "../context/AuthProvider";
import Dashboard from "../pages/Dashboard";
import ErrorPage from "../pages/ErrorPage";
import Goals from "../pages/Goals";
import Notes from "../pages/Notes";
import Login from "../pages/auth/Login";
import ProtectedRoute from "./ProtectedRoute";

const AuthLayout = () => {
    // console.log("here");
    // const location = useLocation();
    // console.log("LCOATION: ", location);
    // if (location === "/a") return <Navigate to="/login" />;
    // return <Outlet />;
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    );
};

export default createBrowserRouter([
    {
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                element: <Login />,
                path: "/login",
            },
            {
                element: <Navigate to="/dashboard" />,
                path: "/",
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        element: <Dashboard />,
                        path: "/dashboard",
                    },
                    {
                        element: <Notes />,
                        path: "/notes",
                    },
                    {
                        element: <Goals />,
                        path: "/goals",
                    },
                ],
            },
        ],
    },
]);
