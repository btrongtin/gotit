import React, { useContext, useEffect, useState } from 'react';
import FilterButton from '../partials/actions/FilterButton';
import Datepicker from '../partials/actions/Datepicker';
import DateSelect from '../partials/actions/DateSelect';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import { AuthContext } from '../context/AuthProvider';
import DashboardCard from '../components/dashboard/DashboardCard';
import {
    getDashboard,
    getFullBoard,
    getListBoardOfUser,
} from '../utils/apiRequest/apiRequest';
import BoardDoughnutChart from '../components/dashboard/BoardDoughnutChart';
import UpcomingTasks from '../components/dashboard/UpcomingTasks';

function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false); //use for mobile responsive
    const [sidebarShrink, setSidebarShrink] = useState(false); //use for desktop
    const { user } = useContext(AuthContext);
    const [boards, setBoards] = useState({});

    useEffect(() => {
        // const boardFromDB = colsData;
        // getFullBoard('6421a41cc562f156a0157056').then((res) => {
        //     console.log('RES NE: ', res);
        //     let board = res.fullBoard;
        //     console.log('BOARDDD: ', board)
        //     setBoard(board);
        // });
        getDashboard().then((res) => {
            console.log('DASHBOARD: ', res);
            setBoards(res.data);
            console.log('BOARDSSSSSADASDAS: ', boards);
        });
    }, []);

    return (
        <>
            {/* Welcome banner */}
            <WelcomeBanner user={user} />
            {/* <WelcomeBanner /> */}
            {/* Dashboard actions */}
            {/* Cards */}
            {boards.goals && (
                <>
                    <h3 className='text-2xl font-bold mb-3'>
                        You have {boards.goals.count} goals now
                    </h3>
                    <div className='flex items-center gap-6 mb-10'>
                        {boards.goals.value.map((item, i) => (
                            <DashboardCard key={i} index={i} data={item} />
                        ))}
                    </div>
                </>
            )}
            <div className="flex mt-6 gap-3">
                {boards && boards.goals ? 
                <>
                <BoardDoughnutChart data={boards.goals}/>
                <UpcomingTasks tasks={boards.tasks} />
                </> : null
                }
            </div>

        </>
    );
}

export default Dashboard;
