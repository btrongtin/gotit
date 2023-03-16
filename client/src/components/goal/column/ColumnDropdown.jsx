import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Transition from "../../../utils/Transition";
import {BsThreeDots} from "react-icons/bs";

function ColumnDropdown(props) {
    const {setCardModalOpen, setRemoveColumnModalOpen} = props
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const trigger = useRef(null);
    const dropdown = useRef(null);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (
                !dropdownOpen ||
                dropdown.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setDropdownOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    return (
        <div className="relative inline-flex ml-3">
            <button
                ref={trigger}
                className={`w-8 h-8 flex items-center justify-center bg-slate-100 transition duration-150 rounded-full`}
                aria-haspopup="true"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
            >
                <BsThreeDots/>
            </button>

            <Transition
                className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
                show={dropdownOpen}
                enter="transition ease-out duration-200 transform"
                enterStart="opacity-0 -translate-y-2"
                enterEnd="opacity-100 translate-y-0"
                leave="transition ease-out duration-200"
                leaveStart="opacity-100"
                leaveEnd="opacity-0"
            >
                <div
                    ref={dropdown}
                    onFocus={() => setDropdownOpen(true)}
                    onBlur={() => setDropdownOpen(false)}
                >
                    <ul>
                        <li>
                            <button
                                className="font-medium w-full text-sm text-slate-500 hover:text-slate-600 flex items-center py-3 px-5"
                                to="#0"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCardModalOpen(true);
                                    setDropdownOpen(false)
                                }}
                            >
                                <span>Add card</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className="font-medium w-fulltext-sm text-slate-500 hover:text-slate-600 flex items-center py-3 px-5"
                                to="#0"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setRemoveColumnModalOpen(true);
                                    setDropdownOpen(false)
                                }}
                            >
                                <span>Remove column</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </Transition>
        </div>
    );
}

export default ColumnDropdown;
