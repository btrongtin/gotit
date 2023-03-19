import React, { useContext, useEffect, useState } from "react";
import FilterButton from "../partials/actions/FilterButton";
import Datepicker from "../partials/actions/Datepicker";
import DateSelect from "../partials/actions/DateSelect";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import { AuthContext } from "../context/AuthProvider";
import DashboardCard from "../components/dashboard/DashboardCard";
import { getFullBoard } from "../utils/apiRequest/apiRequest";

function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false); //use for mobile responsive
    const [sidebarShrink, setSidebarShrink] = useState(false); //use for desktop
    const { user } = useContext(AuthContext);
    const [board, setBoard] = useState({});

    useEffect(() => {
        // const boardFromDB = colsData;
        getFullBoard('6402f4cf58d3489d44ae3bd8').then((res) => {
            console.log('RES NE: ', res);
            let board = res.fullBoard;
            console.log('BOARDDD: ', board)
            setBoard(board);
        });
    }, []);

    return (
        <>
            {/* Welcome banner */}
            <WelcomeBanner user={user}/>
            {/* <WelcomeBanner /> */}
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
                {/* Left: Avatars */}
                {/* <DashboardAvatars /> */}

                {/* Right: Actions */}
                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                    {/* Filter button */}   
                    {/* Add view button */}
                </div>
            </div>
            {/* Cards */}
            <div className="flex items-center gap-6">
                {board.cols && board.cols.map((col, i) => <DashboardCard key={i} index={i} data={col} />)}
            </div>
            {/* </div> */}
        </>
    );
}

export default Dashboard;
