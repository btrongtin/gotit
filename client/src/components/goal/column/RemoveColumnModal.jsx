import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../../../utils/Transition';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from '../../../constant';

const RemoveColumnModal = (props) => {
    const { id, modalOpen, setModalOpen, columnName, onAction } = props;
    const modalContent = useRef(null);
    // close on click outside
    //  useEffect(() => {
    //     const clickHandler = ({ target }) => {
    //         if (!modalOpen || modalContent.current.contains(target)) return;
    //         setModalOpen(false);
    //     };
    //     document.addEventListener("click", clickHandler);
    //     return () => document.removeEventListener("click", clickHandler);
    // });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!modalOpen || keyCode !== 27) return;
            setModalOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    return (
        // <>
        //     <div ref={modalContent}>RemoveColumnModal {modalOpen}</div>
        // </>
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
                            className='absolute top-1 right-2'
                            onClick={() => setModalOpen(!modalOpen)}
                        >
                            x
                        </span>
                        <h2 className='text-xl font-semibold px-2 mb-3'>
                            Remove column
                        </h2>
                        <div className='mt-6 px-2'>
                            <p className='text-xs font-semibold block pb-1'>
                                Are you sure you want to remove "{columnName}"?
                                All related card will also be removed!
                            </p>
                        </div>
                    </div>
                    <div className='card-footer px-8 mb-5 flex items-center justify-end'>
                        <button
                            className='rounded font-semibold bg-blue-400 text-white text-sm px-3 py-2'
                            onClick={() => onAction(MODAL_ACTION_CONFIRM)}
                        >
                            Confirm
                        </button>
                        <button
                            className='rounded font-semibold bg-transparent hover:bg-gray-200 transition duration-200 ml-2 text-sm px-3 py-2'
                            onClick={() => {
                                setModalOpen(!modalOpen);
                                onAction(MODAL_ACTION_CLOSE);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Transition>
        </>
    );
};

export default RemoveColumnModal;
