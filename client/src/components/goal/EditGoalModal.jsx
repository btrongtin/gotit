import React, { useEffect, useRef, useState } from 'react';
import Transition from '../../utils/Transition';
import 'react-datepicker/dist/react-datepicker.css';
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from '../../constant.js';
import { BsXLg } from 'react-icons/bs';
import {updateBoard} from '../../utils/apiRequest/apiRequest'

const EditGoalModal = (props) => {
    const { id, modalOpen, setEditGoalModalOpen, setListBoardOfUser, listBoardOfUser,selectedBoard } = props;
    const [newBoardName, setNewBoardName] = useState('')

    useEffect(() => {
        setNewBoardName(selectedBoard.name)
    }, [selectedBoard])
    const modalContent = useRef(null);
    
    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!modalOpen || keyCode !== 27) return;
            setEditGoalModalOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    const handleChangeNewBoardName = (e) => {
        setNewBoardName(e.target.value)
    }

    const onSubmit = async () => {
        const boardToUpdate = {...selectedBoard, name: newBoardName}
        console.log('BOARD TO UPDATE: ', boardToUpdate)
        const editedBoard = await updateBoard(selectedBoard._id, boardToUpdate);
        console.log('EDIT BOARD THANH CONG')
        const newListBoardOfUser = listBoardOfUser.map((board) => board._id != selectedBoard._id ? board : boardToUpdate)
        setListBoardOfUser(newListBoardOfUser)
        closeModal()
    }

    const closeModal = () => {
        setEditGoalModalOpen(!modalOpen)
    }

    return (
        <>
            {/* Modal backdrop */}
            <Transition
                className='fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity'
                show={modalOpen}
                enter='transition ease-out duration-200'
                enterStart='opacity-0'
                enterEnd='opacity-100'
                leave='transition ease-out duration-100'
                leaveStart='opacity-100'
                leaveEnd='opacity-0'
                aria-hidden='true'
            />
            {/* Modal dialog */}
            <Transition
                id={id}
                className='fixed inset-0 z-50 overflow-hidden flex items-start top-10 mb-4 justify-center transform px-4 sm:px-6'
                role='dialog'
                aria-modal='true'
                show={modalOpen}
                enter='transition ease-in-out duration-200'
                enterStart='opacity-0 translate-y-4'
                enterEnd='opacity-100 translate-y-0'
                leave='transition ease-in-out duration-200'
                leaveStart='opacity-100 translate-y-0'
                leaveEnd='opacity-0 translate-y-4'
            >
                <div
                    ref={modalContent}
                    className='bg-white overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg'
                >
                    <div className='py-8 px-6 relative'>
                        <span
                            className='absolute top-4 right-4'
                            onClick={() => setEditGoalModalOpen(!modalOpen)}
                        >
                            <BsXLg />
                        </span>
                        <h2 className='text-xl font-semibold px-2 mb-3'>
                            Edit board {selectedBoard.name}
                        </h2>
                        <div className='mt-6 px-2'>
                            <label htmlFor='newBoardName' className='text-xs font-semibold block pb-1'>
                                Please enter new board name:
                            </label>
                            <input id='newBoardName' className='text-md mt-2 border-1 border-slate-300 shadow rounded-md focus:ring-blue-500 focus:border-blue-500' type="text" value={newBoardName} onChange={handleChangeNewBoardName} />
                        </div>
                    </div>
                    <div className='card-footer px-8 mb-5 flex items-center justify-end'>
                        <button
                            className='rounded font-semibold bg-blue-400 text-white text-sm px-3 py-2'
                            onClick={onSubmit}
                        >
                            Confirm
                        </button>
                        <button
                            className='rounded font-semibold bg-transparent hover:bg-gray-200 transition duration-200 ml-2 text-sm px-3 py-2'
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Transition>
        </>
    );
};

export default EditGoalModal;
