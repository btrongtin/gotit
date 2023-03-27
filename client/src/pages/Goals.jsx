import React, { useEffect, useState } from 'react';
import UpdateCardModal from '../components/goal/card/UpdateCardModal';
import { Container, Draggable } from 'react-smooth-dnd';
import {
    addColorToLabels,
    applyDrag,
    assignColorsToLabels,
    mapOrder,
    toggle,
} from '../utils/Utils';
import Column from '../components/goal/column/Column';
import { BsPlusSquare } from 'react-icons/bs';
import { flushSync } from 'react-dom';
import {
    createNewBoard,
    createNewColumn,
    getDistinctLabels,
    getFullBoard,
    getListBoardOfUser,
    getListUserOfBoard,
    updateBoard,
    updateCard,
    updateColumn,
} from '../utils/apiRequest/apiRequest';
import { cloneDeep } from 'lodash';
import { COLORS_PALLETE, MODAL_ACTION_CONFIRM } from '../constant';
import Select from 'react-select';
import ListGoalDropdown from '../components/goal/ListGoalDropdown';
import CreateGoalModal from '../components/goal/CreateGoalModal';
import EditGoalModal from '../components/goal/EditGoalModal';
import GoalUserList from '../components/goal/GoalUserList';
import ListUserModal from '../components/goal/user/ListUserModal';
import { Link, useNavigate } from 'react-router-dom';

const Goals = () => {
    const [updateCardModalOpen, setUpdateCardModalOpen] = useState(false);
    const [listUserModalOpen, setListUserModalOpen] = useState(false);
    const [board, setBoard] = useState({});
    const [columns, setColumns] = useState([]);
    const [selectedCard, setSelectedCard] = useState({});
    const [createBoardModalOpen, setCreateBoardModalOpen] = useState(false);
    const [editGoalModalOpen, setEditGoalModalOpen] = useState(false);
    const [listBoardOfUser, setListBoardOfUser] = useState([]);
    const [selectedBoard, setSelectedBoard] = useState({});
    const [users, setUsers] = useState([]);

    //Start get all note
    useEffect(() => {
        getListBoardOfUser().then((res) => {
            setListBoardOfUser(res.boards);

            getFullBoard(res.boards[0]._id).then((res) => {
                console.log('RES NE: ', res);
                let board = res.fullBoard;
                board.labels = assignColorsToLabels(
                    COLORS_PALLETE,
                    board.labels
                );
                board = addColorToLabels(board);
                console.log('BOARDDD: ', board);
                setBoard(board);
                setColumns(mapOrder(board.cols, board.colOrder, '_id'));
                setSelectedBoard(board);
            });
        });
    }, []);

    useEffect(() => {
        if (selectedBoard._id)
            getListUserOfBoard(selectedBoard._id).then((res) => {
                setUsers(res.users);
            });
    }, [selectedBoard]);

    const onCardDrop = (columnId, dropResult) => {
        if (
            dropResult.removedIndex !== null ||
            dropResult.addedIndex !== null
        ) {
            let newColumns = cloneDeep(columns);
            let currentColumn = newColumns.find((c) => c._id === columnId);
            if (!currentColumn.cards) currentColumn.cards = [];
            currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
            currentColumn.cardOrder = currentColumn.cards.map((i) => i._id);

            //for react-18
            flushSync(() => setColumns(newColumns));
            if (
                dropResult.removedIndex !== null &&
                dropResult.addedIndex !== null
            ) {
                //move card inside column
                //call api update cardOrder in current column
                updateColumn(currentColumn._id, currentColumn).catch(() => {
                    setColumns(columns);
                });
            } else {
                //move card between 2 column
                //call api update cardOrder in current column
                //call api update columnId in current card
                updateColumn(currentColumn._id, currentColumn).catch(() => {
                    setColumns(columns);
                });
                if (dropResult.addedIndex !== null) {
                    let currentCard = cloneDeep(dropResult.payload);
                    currentCard.column = currentColumn._id;
                    updateCard(currentCard._id, currentCard);
                }
            }
        }
    };

    const onColumnDrop = (dropResult) => {
        let newColumns = cloneDeep(columns);
        newColumns = applyDrag(newColumns, dropResult);
        let newBoard = cloneDeep(board);
        newBoard.colOrder = newColumns.map((c) => c._id);
        newBoard.cols = newColumns;
        console.log(newBoard);

        //update col order in board
        setColumns(newColumns);
        setBoard(newBoard);
        updateBoard(newBoard._id, newBoard).catch((err) => {
            console.log(err);
            setColumns(columns);
            setBoard(board);
        });
    };

    const addNewColumn = async () => {
        const newColumn = {
            board: board._id,
            name: 'Unnamed Column',
        };

        const res = await createNewColumn(newColumn);
        const newColumnCreated = res.column;
        let newColumns = [...columns];
        newColumns.push(newColumnCreated);

        let newBoard = { ...board };
        newBoard.colOrder = newColumns.map((c) => c._id);
        newBoard.cols = newColumns;

        setColumns(newColumns);
        setBoard(newBoard);
    };

    const onUpdateColumnState = async (newColumnToUpdate) => {
        const columnIdToUpdate = newColumnToUpdate._id;
        let newColumns = [...columns];
        const columnIndexToUpdate = newColumns.findIndex(
            (i) => i._id === columnIdToUpdate
        );
        if (newColumnToUpdate._destroy) {
            //remove column
            newColumns.splice(columnIndexToUpdate, 1);
        } else {
            // update column info
            newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate);
            console.log(newColumnToUpdate);
        }

        let newBoard = { ...board };
        const requestDistincLabels = await getDistinctLabels(newBoard._id);
        newBoard.labels = requestDistincLabels.labels;
        newBoard.colOrder = newColumns.map((c) => c._id);
        newBoard.cols = newColumns;
        console.log('NEWBOARD: ', newBoard);
        setColumns(newColumns);
        setBoard(newBoard);
    };

    const [selectedLabels, setSelectedLabels] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const toggleLabel = (labelValue) => {
        const newLabels = [...selectedLabels];
        const idx = newLabels.indexOf(labelValue);
        if (idx !== -1) {
            newLabels.splice(idx, 1);
        } else {
            newLabels.push(labelValue);
        }
        setSelectedLabels(newLabels);
    };

    const toggleUsers = (usersValue) => {
        const newUsers = [...selectedUsers];
        const idx = newUsers.indexOf(usersValue);
        if (idx !== -1) {
            newUsers.splice(idx, 1);
        } else {
            newUsers.push(usersValue);
        }
        setSelectedUsers(newUsers);
    };

    const handleFilterCardByLabels = (e) => {
        e.preventDefault();
        let labelValue = e.currentTarget.getAttribute('name');
        e.currentTarget.classList.toggle('drop-shadow');
        toggleLabel(labelValue);
    };
    
    const handleFilterCardByUsers = (e) => {
        e.preventDefault();
        let usersValue = e.currentTarget.getAttribute('name');
        e.currentTarget.classList.toggle('selected-user');
        toggleUsers(usersValue);
    };

    //create board modal action
    const onConfirmModalAction = async (type, newBoardName) => {
        if (type === MODAL_ACTION_CONFIRM) {
            const newBoard = await createNewBoard({ name: newBoardName });
            listBoardOfUser.push(newBoard.board);
        }
        setCreateBoardModalOpen(!createBoardModalOpen);
    };
    // const navigate = useNavigate()
    const handleChangeSelectedBoard = (e) => {
        // navigate(`/goals/${e.target.value}`)
        const boardId = e.target.value;
        const selectBoard = listBoardOfUser.find(
            (board) => board._id === boardId
        );
        setSelectedBoard(selectBoard);
        // setSelectedBoard(e.target.value);
        getFullBoard(e.target.value).then((res) => {
            console.log('RES NE: ', res);
            let board = res.fullBoard;
            board.labels = assignColorsToLabels(COLORS_PALLETE, board.labels);
            board = addColorToLabels(board);
            console.log('BOARDDD MOI LAY VE: ', board);
            setBoard(board);
            setColumns(mapOrder(board.cols, board.colOrder, '_id'));
        });
    };
    return (
        <>
            {listBoardOfUser.length > 0 && (
                <div className='flex items-center'>
                    <div className='flex items-center'>
                        <h1 className='text-2xl text-slate-800 font-bold mb-3'>
                            <select
                                className='text-sm font-semibold min-w-44 rouded border border-slate-100 shadow'
                                id='board-name'
                                value={selectedBoard._id}
                                onChange={handleChangeSelectedBoard}
                                defaultValue={{}}
                            >
                                {listBoardOfUser.map((board, index) => {
                                    return (
                                        <option key={index} value={board._id}>
                                            {board.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </h1>

                        <ListGoalDropdown
                            setCreateBoardModalOpen={setCreateBoardModalOpen}
                            setEditGoalModalOpen={setEditGoalModalOpen}
                            setListUserModalOpen={setListUserModalOpen}
                        />
                    </div>

                    <div className='ml-7 w-72 mb-3'>
                        {board.labels &&
                            board.labels.map((e, i) => (
                                <span
                                    key={i}
                                    onClick={handleFilterCardByLabels}
                                    name={e.value}
                                    className="inline-block text-emerald-400 last:mr-0 mr-2 rounded-md text-xs px-2 py-1 relative after:content-[''] after:absolute after:inset-0 after:rounded-[inherit] after:bg-current after:opacity-20 border cursor-pointer hover:opacity-80"
                                    style={{ color: `${e.color}` }}
                                >
                                    {e.label}
                                </span>
                            ))}
                    </div>
                    <div className='user-list'>
                        <GoalUserList users={users} handleFilterCardByUsers={handleFilterCardByUsers} />
                    </div>
                </div>
            )}
            <div className='board-content flex items-stretch overflow-x-auto'>
                <Container
                    orientation='horizontal'
                    onDrop={onColumnDrop}
                    getChildPayload={(index) => columns[index]}
                    dragHandleSelector='.column-drag-handle'
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'column-drop-preview',
                    }}
                >
                    {/* {columns.map((colums, index) => <Column key={index} columns={columns} /> )} */}
                    {columns.map((column, index) => {
                        return (
                            <Draggable key={index}>
                                <Column
                                    column={column}
                                    onCardDrop={onCardDrop}
                                    // setCardModalOpen={setCardModalOpen}
                                    onUpdateColumnState={onUpdateColumnState}
                                    filteredLabels={selectedLabels}
                                    filteredUsers={selectedUsers}
                                    setUpdateModalOpen={setUpdateCardModalOpen}
                                    setSelectedCard={setSelectedCard}
                                    users={users}
                                />
                            </Draggable>
                        );
                    })}
                </Container>

                {listBoardOfUser.length > 0 && (
                    <button
                        onClick={addNewColumn}
                        className='relative w-80 min-w-80 card-list mr-3 rounded bg-slate-100 hover:bg-slate-200 transition-all duration-200 p-4 border-slate-400 hover:border-slate-600 min-h-[85vh] flex flex-col items-center border-dashed border-2 text-slate-400 hover:text-slate-600'
                    >
                        <div className='flex justify-between w-full mb-5'>
                            <div className='flex items-center'>
                                <h4 className='font-semibold text-lg text-left mr-2'>
                                    Add new column
                                </h4>
                            </div>
                        </div>
                        <BsPlusSquare className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/5 h-1/5' />
                    </button>
                )}
                {listBoardOfUser.length <= 0 && (
                    <button className='border border-dashed border-slate-200' onClick={() => setCreateBoardModalOpen(true)}>
                        You don't have any goal yet. Click here to create one.
                    </button>
                )}
            </div>
            <UpdateCardModal
                id='update-card-modal'
                modalOpen={updateCardModalOpen}
                setModalOpen={setUpdateCardModalOpen}
                selectedCard={selectedCard}
                onUpdateColumnState={onUpdateColumnState}
                columns={columns}
                setColumns={setColumns}
                board={board}
                setBoard={setBoard}
                users={users}
            />
            <CreateGoalModal
                id='create-new-board-modal'
                modalOpen={createBoardModalOpen}
                setModalOpen={setCreateBoardModalOpen}
                onAction={onConfirmModalAction}
            />
            <EditGoalModal
                id='edit-board-modal'
                modalOpen={editGoalModalOpen}
                setEditGoalModalOpen={setEditGoalModalOpen}
                selectedBoard={selectedBoard}
                setListBoardOfUser={setListBoardOfUser}
                listBoardOfUser={listBoardOfUser}
            />
            <ListUserModal
                id='list-user-modal'
                modalOpen={listUserModalOpen}
                setModalOpen={setListUserModalOpen}
                selectedBoard={selectedBoard}
                users={users}
                setUsers={setUsers}
            />
        </>
    );
};

export default Goals;
