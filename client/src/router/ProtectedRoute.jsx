import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";

export default function ProtectedRoute({ children }) {
    //   console.log({ accessToken: localStorage.getItem('accessToken') });
    // if (!localStorage.getItem("accessToken")) {
    //     return <Navigate to="/login" />;
    // }
    const [sidebarOpen, setSidebarOpen] = useState(false); //use for mobile responsive
    return (
        <>
            <div className="flex h-screen overflow-hidden">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
                <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />
                    <main>
                        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
