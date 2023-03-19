import homeIcon from "../images/icons/ic-house.svg";
import goalIcon from "../images/icons/ic-goal.svg";
import noteIcon from "../images/icons/ic-note.svg";
import signoutIcon from "../images/icons/ic-signout.svg";
import Notes from "../pages/Notes";
import Goals from "../pages/Goals";
import Dashboard from "../pages/Dashboard";

import { BsHouseDoor } from "react-icons/bs";
import { BsClipboardCheck } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";

const icon = {
    className: "w-6 h-6",
};

export const routes = [
    {
        layout: "dashboard",
        pages: [
            {
                icon: <BsHouseDoor className="w-6 h-6"/>,
                name: "Dashboard",
                path: "/dashboard",
            },
            // {
            //     icon: <BsPencilSquare className="w-6 h-6" />,
            //     name: "Notes",
            //     path: "/notes",
            // },
            {
                icon: <BsClipboardCheck className="w-6 h-6"/>,
                name: "Goals",
                path: "/goals",
            },
        ],
    },
    {
        title: "auth pages",
        layout: "auth",
        pages: [],
    },
];

export default routes;
