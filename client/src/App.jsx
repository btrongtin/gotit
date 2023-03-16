import React, { useEffect } from "react";

import "./css/style.css";
import router from "./router";
import "./charts/ChartjsConfig";
import { RouterProvider } from "react-router-dom";
// Import pages

function App() {
    // useEffect(() => {
    //     loadUser();
    // }, []);

    // const location = useLocation();

    // useEffect(() => {
    //     document.querySelector("html").style.scrollBehavior = "auto";
    //     window.scroll({ top: 0 });
    //     document.querySelector("html").style.scrollBehavior = "";
    // }, [location.pathname]); // triggered on route change

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
