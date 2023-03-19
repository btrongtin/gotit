import React, { useEffect, useState } from 'react';
import UpdateCardModal from '../components/goal/card/UpdateCardModal';
import { Container, Draggable } from 'react-smooth-dnd';
import { addColorToLabels, applyDrag, assignColorsToLabels, mapOrder, toggle } from '../utils/Utils';
import Column from '../components/goal/column/Column';
import { BsPlusSquare } from 'react-icons/bs';
import { flushSync } from 'react-dom';
import {
    createNewColumn,
    getDistinctLabels,
    getFullBoard,
    updateBoard,
    updateCard,
    updateColumn,
} from '../utils/apiRequest/apiRequest';
import { cloneDeep } from 'lodash';
import { COLORS_PALLETE } from '../constant';

const Goals = () => {
    const [updateCardModalOpen, setUpdateCardModalOpen] = useState(false);
    const [board, setBoard] = useState({});
    const [columns, setColumns] = useState([]);
    const [selectedCard, setSelectedCard] = useState({})

    console.log('SELECTED CARD: ', selectedCard)

    //Start get all note
    useEffect(() => {
        getFullBoard('6402f4cf58d3489d44ae3bd8').then((res) => {
            console.log('RES NE: ', res);
            let board = res.fullBoard;
            board.labels = assignColorsToLabels( COLORS_PALLETE,board.labels)
            board = addColorToLabels(board)
            console.log('BOARDDD: ', board)
            setBoard(board);
            setColumns(mapOrder(board.cols, board.colOrder, '_id'));
        });
    }, []);

    const onCardDrop = (columnId, dropResult) => {
        if (
            dropResult.removedIndex !== null ||
            dropResult.addedIndex !== null
        ) {
            let newColumns = cloneDeep(columns);
            let currentColumn = newColumns.find((c) => c._id === columnId);
            if (!currentColumn.cards) currentColumn.cards = []
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
        newBoard.value = newColumns;
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
        newBoard.value = newColumns;

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
        const requestDistincLabels = await getDistinctLabels(newBoard._id)
        newBoard.labels = requestDistincLabels.labels
        newBoard.colOrder = newColumns.map((c) => c._id);
        newBoard.value = newColumns;

        setColumns(newColumns);
        setBoard(newBoard);
    };

    // let selectedLabels = []
    const [selectedLabels, setSelectedLabels] = useState([]);

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

    const handleFilterCardByLabels = (e) => {
        e.preventDefault();
        let labelValue = e.currentTarget.getAttribute('name');
        e.currentTarget.classList.toggle('drop-shadow')
        toggleLabel(labelValue);
    };

    return (
        <>
            <div className='flex items-center'>
                <h1 className='text-2xl text-slate-800 font-bold mb-3'>
                    {board ? board.name : 'Board not found'}
                </h1>
                <div className='ml-5 w-72 mb-3'>
                    {board.labels &&
                        board.labels.map((e, i) => (
                            <span
                                key={i}
                                onClick={handleFilterCardByLabels}
                                name={e.value}
                                className="inline-block text-emerald-400 last:mr-0 mr-2 rounded-md text-xs px-2 py-1 relative after:content-[''] after:absolute after:inset-0 after:rounded-[inherit] after:bg-current after:opacity-20 border cursor-pointer hover:opacity-80"
                                style={{ color: `${e.color}`}}
                            >
                                {e.label}
                            </span>
                        ))}
                </div>
            </div>
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
                                    setUpdateModalOpen={setUpdateCardModalOpen}
                                    setSelectedCard={setSelectedCard}
                                />
                            </Draggable>
                        );
                    })}
                </Container>

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
            </div>
            <UpdateCardModal
                id='update-card-modal'
                modalOpen={updateCardModalOpen}
                setModalOpen={setUpdateCardModalOpen}
                selectedCard={selectedCard}
                onUpdateColumnState={onUpdateColumnState}
                columns = {columns}
                setColumns = {setColumns}
                board={board}
                setBoard={setBoard}
            />
        </>
    );
};

export default Goals;
