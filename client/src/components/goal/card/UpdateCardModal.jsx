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
import {
    updateCard,
    getColumnById,
    getDistinctLabels
} from '../../../utils/apiRequest/apiRequest';
import { BsXLg } from 'react-icons/bs';
import moment from 'moment';
import { useNavigate } from "react-router-dom";


const UpdateCardModal = (props) => {
    const navigate = useNavigate()
    const {
        id,
        modalOpen,
        setModalOpen,
        onUpdateColumnState,
        selectedCard,
        columns,
        setColumns,
        board,
        setBoard
    } = props;

    const [name, setName] = useState(selectedCard.name);
    const [description, setDescription] = useState(selectedCard.description);
    const [startDate, setStartDate] = useState(
        moment(selectedCard.startDate).toDate()
    );
    const [dueDate, setDueDate] = useState(
        moment(selectedCard.dueDate).toDate()
    );
    const [multiSelect, setMultiSelect] = useState(selectedCard.labels);
    const [selectType, setSelectType] = useState({});
    const [selectPriority, setSelectPriority] = useState({});

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
        // column: column._id,
        // board: column.board,
    });
    useEffect(() => {
        setDescription(selectedCard.description);
        setName(selectedCard.name);
        setSelectType(selectedCard.type);
        setSelectPriority(selectedCard.priority);
        setStartDate(moment(selectedCard.startDate).toDate());
        setDueDate(moment(selectedCard.dueDate).toDate());
        setMultiSelect(selectedCard.labels);
    }, [selectedCard]);

    const onChangeNewCardFormText = (event) => {
        setNewCard({ ...newCard, [event.target.name]: event.target.value });
    };

    const onChangeNewCardFormSelect = (value, action) => {
        console.log('action: ', action, value);
        if (action.name === 'type') setSelectType(value);
        else if (action.name === 'priority') setSelectPriority(value);
    };

    const onChangeNewCardFormSelectMultiple = (value) => {
        console.log('VALUE: ', value);
        setMultiSelect(value);
    };

    const onchangeNewCardFormDate = (value, name) => {
        // setNewCard({ ...newCard, [name]: value });
        if (name === 'startDate') setStartDate(value);
        else if (name === 'dueDate') setDueDate(value);
    };

    const onSubmit = async (event) => {
        // console.log('NEW CARD: ', newCard);
        // const res = await createNewCard(newCard);
        // const newCardCreated = res.card;
        // let newColumn = cloneDeep(column);
        // if (!newColumn.cards) newColumn.cards = [];
        // newColumn.cards.push(newCardCreated);
        // newColumn.cardOrder.push(newCardCreated._id);
        // onUpdateColumnState(newColumn);
        // resetAddCardData();
        // console.log('MULTI SELECT: ', multiSelect);
        const updatedCard = {
            ...selectedCard,
            board: selectedCard.board,
            column: selectedCard.column,
            description: description,
            startDate: startDate,
            dueDate: dueDate,
            type: selectType.value,
            priority: selectPriority.value,
            updatedAt: Date.now(),
            name: name,
            labels: multiSelect,
        };
        console.log('UPDATED CARD: ', updatedCard);
        await updateCard(updatedCard._id, updatedCard);
        // const column = await getColumnById(selectedCard.column)
        // let newColumn = cloneDeep(column);
        // if (!newColumn.cards) newColumn.cards = [];
        // newColumn.cards.map(card => card._id === updatedCard._id)
        // onUpdateColumnState(newColumn);
        let column = columns.find(e => e._id === updatedCard.column)
        let newColumns = [...columns]
        let newCards = column.cards.map(card  => card._id === updatedCard._id ? updatedCard : card)
        column.cards = newCards
        setColumns(newColumns)
        const newBoard = {...board}
        const requestDistincLabels = await getDistinctLabels(updatedCard.board)
        newBoard.labels = requestDistincLabels.labels
        setBoard(newBoard);
        setModalOpen(false);
        // navigate('/goals')
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
        setMultiSelect([]);
        setSelectType('');
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
                    className='bg-white overflow-auto w-full max-w-5xl max-h-full rounded shadow-lg'
                >
                    <div className='py-8 px-6 relative'>
                        <span
                            className='absolute top-4 right-4 cursor-pointer'
                            onClick={() => setModalOpen(!modalOpen)}
                        >
                            <BsXLg />
                        </span>
                        <div className='flex'>
                            <div className='modal-left w-[70%] pr-5'>
                                <div className='mt-6 -ml-2 px-2'>
                                    <input
                                        type='text'
                                        id='card-name'
                                        name='name'
                                        className='bg-transparent  border-none text-xl font-semibold w-full rounded px-2 py-1 border border-slate-300'
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        value={name}
                                    />
                                </div>
                                <div className='mt-6 px-2'>
                                    <label className='text-sm font-semibold block pb-3'>
                                        Description
                                    </label>
                                    <ReactQuill
                                        name='description'
                                        theme='snow'
                                        className='min-h-[110px]'
                                        value={description || ''}
                                        onChange={setDescription}
                                    />
                                </div>
                            </div>
                            <div className='modal-right px-5 w-[30%] min-h-full'>
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
                                        // selected={selectType}
                                        value={options.find(
                                            (i) => i.value === selectType
                                        )}
                                        name='type'
                                        onChange={onChangeNewCardFormSelect}
                                    />
                                </div>
                                <div className='mt-3 px-2'>
                                    <label className='text-xs font-semibold inline-block pb-1'>
                                        Start Date
                                    </label>
                                    <DatePicker
                                        wrapperClassName='w-full'
                                        className='w-full px-2 py-1 bg-slate-100 border-slate-300 rounded text-sm font-semibold'
                                        dateFormat='dd/MM/yyyy'
                                        selected={startDate}
                                        name='startDate'
                                        onChange={(date) =>
                                            onchangeNewCardFormDate(
                                                date,
                                                'startDate'
                                            )
                                        }
                                    />
                                </div>
                                <div className='mt-3 px-2'>
                                    <label className='text-xs font-semibold inline-block pb-1'>
                                        Due Date
                                    </label>
                                    <DatePicker
                                        wrapperClassName='w-full'
                                        className='w-full px-2 py-1 bg-slate-100 border-slate-300 rounded text-sm font-semibold'
                                        dateFormat='dd/MM/yyyy'
                                        selected={dueDate}
                                        name='dueDate'
                                        onChange={(date) =>
                                            onchangeNewCardFormDate(
                                                date,
                                                'dueDate'
                                            )
                                        }
                                    />
                                </div>
                                <div className='mt-3 px-2'>
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
                                        onInputChange={(newValue) =>
                                            setInputMultipleChoices(newValue)
                                        }
                                        onKeyDown={handleKeyDownMultipleChoices}
                                        name='labels'
                                        onChange={
                                            onChangeNewCardFormSelectMultiple
                                        }
                                        value={multiSelect}
                                    />
                                </div>
                                <div className='mt-3 px-2'>
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
                                        onChange={onChangeNewCardFormSelect}
                                        value={priorityOptions.find(
                                            (i) => i.value === selectPriority
                                        )}
                                    />
                                </div>
                            </div>
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

export default UpdateCardModal;
