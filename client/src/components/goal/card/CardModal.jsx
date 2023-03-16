import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../../../utils/Transition';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { cloneDeep } from 'lodash';
import { createNewCard } from '../../../utils/apiRequest/apiRequest';
import { BsXLg } from "react-icons/bs";

const CardModal = (props) => {
    const { id, modalOpen, setModalOpen, column, onUpdateColumnState } = props;
    const [selectType, setSelectType] = useState('');
    const [selectPriority, setSelectPriority] = useState('');
    const [multiSelect, setMultiSelect] = useState([]);
    const [inputMultipleChoices, setInputMultipleChoices] = useState('');
    const modalContent = useRef(null);
    const [newCard, setNewCard] = useState({
        type: 'personal',
        name: '',
        description: '',
        startDate: new Date(),
        dueDate: new Date(),
        labels: [],
        priority: 'P2',
        column: column._id,
        board: column.board,
    });

    const { name, description, priority } = newCard;

    const onChangeNewCardFormText = (event) => {
        setNewCard({ ...newCard, [event.target.name]: event.target.value });
    };

    const onChangeNewCardFormSelect = (value, action) => {
        console.log('action: ', action);
        if (action.name === 'type') setSelectType(value);
        else if (action.name === 'priority') setSelectPriority(value);
        // setSelectType(value)
        setNewCard({ ...newCard, [action.name]: value.value });
    };

    const onChangeNewCardFormSelectMultiple = (value) => {
        console.log('VALUE: ', value);
        setMultiSelect(value);
        setNewCard({ ...newCard, labels: value });
    };

    const onchangeNewCardFormDate = (value, name) => {
        setNewCard({ ...newCard, [name]: value });
    };

    const onSubmit = async (event) => {
        const res = await createNewCard(newCard);
        const newCardCreated = res.card;
        let newColumn = cloneDeep(column);
        if (!newColumn.cards) newColumn.cards = [];
        newColumn.cards.push(newCardCreated);
        newColumn.cardOrder.push(newCardCreated._id);
        onUpdateColumnState(newColumn);
        resetAddCardData();
    };
    const components = {
        DropdownIndicator: null,
    };

    const resetAddCardData = () => {
        setNewCard({
            ...newCard,
            type: '',
            name: '',
            description: '',
            startDate: new Date(),
            dueDate: new Date(),
            labels: [],
            priority: '',
        });
        // setNewCard({...newCard, name: '', description: ''})
        setMultiSelect([]);
        setSelectType('');
        // console.log('AFTER CLEAR: ', newCard)
        setModalOpen(false);
    };

    const options = [
        { value: 'personal', label: 'Personal' },
        { value: 'work', label: 'Work' },
        { value: 'study', label: 'Study' },
    ];

    const priorityOptions = [
        { value: 'P1', label: 'P1', color: 'red' },
        { value: 'P2', label: 'P2', color: 'yellow' },
        { value: 'P3', label: 'P3', color: 'green' },
    ];

    // const [startDate, setStartDate] = useState(new Date());
    // const [dueDate, setDueDate] = useState(new Date());
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

    const createOption = (label) => {
        label = label.trim();
        const value = label.replace(/ /g, '-');
        console.log('OPTION: ', { value, label });
        return { value, label };
    };

    const handleKeyDownMultipleChoices = (e) => {
        if (!inputMultipleChoices) return;
        switch (e.key) {
            case 'Enter':
            case 'Tab':
                setMultiSelect((prev) => [
                    ...prev,
                    createOption(inputMultipleChoices),
                ]);
                setNewCard({
                    ...newCard,
                    labels: [
                        ...newCard.labels,
                        createOption(inputMultipleChoices),
                    ],
                });
                setInputMultipleChoices('');
                e.preventDefault();
        }
    };

    return (
        // <>
        //     <div ref={modalContent}>CardModal {modalOpen}</div>
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
                            className='absolute top-4 right-4 cursor-pointer'
                            onClick={() => setModalOpen(!modalOpen)}
                        >
                            <BsXLg/>
                        </span>
                        <h2 className='text-xl font-semibold px-2 mb-3'>
                            Create card
                        </h2>
                        <div className='mt-6 px-2'>
                            <label
                                htmlFor='card-type'
                                className='text-xs font-semibold block pb-1'
                            >
                                Card Type
                            </label>
                            <Select
                                id='card-type'
                                className='text-sm font-semibold'
                                options={options}
                                selected={newCard.type}
                                value={selectType}
                                name='type'
                                onChange={onChangeNewCardFormSelect}
                            />
                        </div>
                        <div className='mt-6 px-2'>
                            <label
                                htmlFor='card-name'
                                className='text-xs font-semibold block pb-1'
                            >
                                Card Title
                            </label>
                            <input
                                type='text'
                                id='card-name'
                                name='name'
                                className='bg-slate-100 w-full rounded px-2 py-1 border border-slate-300'
                                onChange={onChangeNewCardFormText}
                                value={newCard.name}
                            />
                        </div>
                        <div className='mt-6 px-2'>
                            <label className='text-xs font-semibold block pb-1'>
                                Description
                            </label>
                            <ReactQuill
                                name='description'
                                theme='snow'
                                value={newCard.description}
                                onChange={(value) =>
                                    setNewCard({
                                        ...newCard,
                                        description: value,
                                    })
                                }
                            />
                        </div>
                        <div className='mt-6 px-2 flex items-center justify-between'>
                            <div className='w-2/5'>
                                <label className='text-xs font-semibold inline-block pb-1'>
                                    Start Date
                                </label>
                                <DatePicker
                                    wrapperClassName='w-full'
                                    className='w-full px-2 py-1 bg-slate-100 border-slate-300 rounded text-sm font-semibold'
                                    dateFormat='dd/MM/yyyy'
                                    selected={newCard.startDate}
                                    name='startDate'
                                    onChange={(date) =>
                                        onchangeNewCardFormDate(
                                            date,
                                            'startDate'
                                        )
                                    }
                                />
                            </div>
                            <div className='w-2/5'>
                                <label className='text-xs font-semibold inline-block pb-1'>
                                    Due Date
                                </label>
                                <DatePicker
                                    wrapperClassName='w-full'
                                    className='w-full px-2 py-1 bg-slate-100 border-slate-300 rounded text-sm font-semibold'
                                    dateFormat='dd/MM/yyyy'
                                    selected={newCard.dueDate}
                                    name='dueDate'
                                    onChange={(date) =>
                                        onchangeNewCardFormDate(date, 'dueDate')
                                    }
                                    // onChange={onChangeNewCardForm}
                                />
                            </div>
                        </div>
                        <div className='mt-6 px-2'>
                            <label
                                htmlFor='card-labels'
                                className='text-xs font-semibold block pb-1'
                            >
                                Labels
                            </label>
                            <CreatableSelect
                                id='card-labels'
                                className='text-sm font-semibold'
                                components={components}
                                inputValue={inputMultipleChoices}
                                isClearable
                                isMulti
                                menuIsOpen={false}
                                //   onChange={(newValue) => setValue(newValue)}
                                onInputChange={(newValue) =>
                                    setInputMultipleChoices(newValue)
                                }
                                onKeyDown={handleKeyDownMultipleChoices}
                                placeholder='Type something and press enter...'
                                //   value={value}

                                name='labels'
                                // options={LABEL_OPTIONS}
                                onChange={onChangeNewCardFormSelectMultiple}
                                value={multiSelect}
                            />
                        </div>
                        <div className='mt-6 px-2'>
                            <label
                                htmlFor='card-priority'
                                className='text-xs font-semibold block pb-1'
                            >
                                Priority
                            </label>
                            <Select
                                id='card-priority'
                                className='text-sm font-semibold'
                                options={priorityOptions}
                                name='priority'
                                selected={newCard.priority}
                                onChange={onChangeNewCardFormSelect}
                                value={selectPriority}
                            />
                        </div>
                    </div>
                    <div className='card-footer px-8 mb-5 flex items-center justify-end'>
                        <button
                            className='rounded font-semibold bg-blue-400 text-white text-sm px-3 py-2'
                            onClick={onSubmit}
                        >
                            Create Card
                        </button>
                        <button
                            className='rounded font-semibold bg-transparent hover:bg-gray-200 transition duration-200 ml-2 text-sm px-3 py-2'
                            onClick={() => {
                                console.log('BEFORE CLEAR: ', newCard);
                                setModalOpen(!modalOpen);
                                resetAddCardData();
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

export default CardModal;
