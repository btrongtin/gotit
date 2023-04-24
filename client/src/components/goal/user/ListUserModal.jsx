import React, { useEffect, useState } from 'react';
import { BsXLg } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { getListUserOfBoard, updateAccessBoardsByUser, updateBoard } from '../../../utils/apiRequest/apiRequest';
import Transition from '../../../utils/Transition';
import ListUserInModal from './ListUserInModal';

const ListUserModal = (props) => {
    const { id, modalOpen, setModalOpen, selectedBoard, users, setUsers } = props;
    const [newUserMail, setNewUserMail] = useState('')
    const [showNotify, setShowNotify] = useState(false)

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!modalOpen || keyCode !== 27) return;
            setShowNotify(false)
            setModalOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    const handleNewUserMailChange = (e) => {
        setNewUserMail(e.target.value)
    }

    const handleAddUser = async (e) => {
        e.preventDefault()
        const updatedUser = await updateAccessBoardsByUser(selectedBoard._id, newUserMail)
        console.log('UPDATED USER: ', updatedUser)
        if(updatedUser.status === 'email-sended'){
            setShowNotify(true)
            console.log('SET SHOW NOTIFY: ')
            return
        }
        const updatedBOARD = await updateBoard(selectedBoard._id, {
            ...selectedBoard,
            accessByUsers: [...selectedBoard.accessByUsers, updatedUser.user.uid]
        })
        console.log('UPDATEEEEEEEEEEEE:  ', updatedBOARD)
        setUsers([...users, updatedUser.user])
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
                <div className='bg-white px-2 overflow-auto max-w-3xl w-full max-h-full rounded shadow-lg'>
                    <div className='py-8 px-6 relative'>
                        <span
                            className='absolute top-4 right-4'
                            onClick={() => {setModalOpen(!modalOpen); setShowNotify(false); setNewUserMail('')}}
                        >
                            <BsXLg />
                        </span>
                        <h2 className='text-xl font-semibold mb-3'>
                            Users list
                        </h2>
                        <div className='mt-3 text-sm font-semibold'>
                            Users who have access to {selectedBoard.name} board
                        </div>
                        {showNotify && <p className='p-2 my-2 text-white rounded-lg w-fit bg-green-400'>Successful send invitation email to {newUserMail}</p>}
                        <div className='mt-6 flex items-stretch'>
                            <input
                                id='newBoardName'
                                className='text-md text-sm w-[90%] border-1 border-slate-300 shadow rounded-md focus:ring-blue-500 focus:border-blue-500'
                                type='text'
                                placeholder='Add user to this page'
                                value={newUserMail}
                                onChange={handleNewUserMailChange}
                            />
                            <button onClick={handleAddUser} className='w-[10%] bg-primary text-white hover:opacity-80 rounded-md'>
                                Add
                            </button>
                        </div>

                        <ListUserInModal users={users}/>
                    </div>
                </div>
            </Transition>
        </>
    );
};

export default ListUserModal;
