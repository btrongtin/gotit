import React, { useCallback, useEffect, useState } from 'react';
import { mapOrder } from '../../../utils/Utils';
import Card from '../card/Card';
import { Container, Draggable } from 'react-smooth-dnd';
import ColumnDropdown from './ColumnDropdown';
import RemoveColumnModal from './RemoveColumnModal';
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from '../../../constant';
import CardModal from '../card/CardModal';
import { updateColumn } from '../../../utils/apiRequest/apiRequest';

const Column = (props) => {
    const {
        column,
        onCardDrop,
        onUpdateColumnState,
        filteredLabels,
        filteredUsers,
        setUpdateModalOpen,
        setSelectedCard,
        users,
    } = props;
    // console.log('')
    let filteredCards;
    function filterCards(cards, filteredLabels, filteredUsers) {
        const matchingLabels = cards.filter((item) => {
            return item.labels.some((label) => {
                return filteredLabels.includes(label.value);
            });
        });
        const matchingUsers = cards.filter((item) => {
            // console.log('FAFAFAF: ', item)
            return filteredUsers.includes(item.assignedTo);
        });
        
        return [...new Set(matchingLabels.concat(matchingUsers))]
    }

    if (filteredLabels.length || filteredUsers.length) {
        console.log('FILTERED LABELS: ', filteredLabels);
        console.log('FILTERED Users: ', filteredUsers);
        // filteredCards = column.cards.filter((item) => {
        //     return item.labels.some((label) => {
        //         return filteredLabels.includes(label.value);
        //     });
        // });
        filteredCards = filterCards(
            column.cards,
            filteredLabels,
            filteredUsers
        );
    } else filteredCards = column.cards;
    console.log('FILTERED CARDDDD: ', filteredCards);

    //   const cards = mapOrder(column.cards, column.cardOrder, '_id');
    const cards = mapOrder(filteredCards, column.cardOrder, '_id');
    const [removeColumnModalOpen, setRemoveColumnModalOpen] = useState(false);
    const [columnTitle, setColumnTitle] = useState('');
    const [cardModalOpen, setCardModalOpen] = useState(false);

    const onConfirmModalAction = async (type) => {
        console.log(type);
        if (type === MODAL_ACTION_CONFIRM) {
            //remove column
            const newColumn = { ...column, _destroy: true };
            const res = await updateColumn(newColumn._id, newColumn);
            const updatedColumn = res.column;
            onUpdateColumnState(updatedColumn);
        }
        setRemoveColumnModalOpen(!removeColumnModalOpen);
    };

    useEffect(() => {
        setColumnTitle(column.name);
    }, [column.name]);

    const selectAllInlineText = (e) => {
        e.target.focus();
        e.target.select();
    };

    const handleColumnTitleChange = (e) => {
        setColumnTitle(e.target.value);
    };

    //update col title
    const handleColumnTitleBlur = async () => {
        if (columnTitle !== column.name) {
            const newColumn = { ...column, name: columnTitle };
            console.log('NEW COL: ', newColumn);
            const res = await updateColumn(newColumn._id, newColumn);
            const updatedColumn = res.column;
            updatedColumn.cards = newColumn.cards;
            onUpdateColumnState(updatedColumn);
        }
    };

    const saveContentAfterPressEnter = (e) => {
        if (e.key === 'Enter') {
            e.target.blur();
        }
    };

    let body = null;

    // if (column.cards)
    body = (
        <>
            <div className='card-list relative mr-3 rounded bg-slate-200 p-4 border border-white w-80 min-h-[85vh] flex flex-col items-center shadow'>
                <div className='column-drag-handle flex justify-between w-full mb-5 hover:cursor-grab'>
                    <div className='flex items-center'>
                        <h4 className=' text-slate-800 font-semibold text-lg text-left mr-2'>
                            <input
                                type='text'
                                className='px-1 py-2 min-w-[8rem] max-w-[10rem] rounded border-none bg-inherit'
                                value={columnTitle}
                                onChange={handleColumnTitleChange}
                                onBlur={handleColumnTitleBlur}
                                onKeyDown={saveContentAfterPressEnter}
                                onClick={selectAllInlineText}
                                onMouseDown={(e) => e.preventDefault()}
                            />
                        </h4>
                        <span className='flex items-center justify-center p-2 bg-violet-200 w-5 h-5 rounded text-sm text-purple-600 font-semibold'>
                            {column.cards ? column.cards.length : 0}
                        </span>
                    </div>
                    <ColumnDropdown
                        setCardModalOpen={setCardModalOpen}
                        setRemoveColumnModalOpen={setRemoveColumnModalOpen}
                    />
                </div>

                <Container
                    orientation='vertical'
                    groupName='tinbui-column'
                    onDrop={(dropResult) => onCardDrop(column._id, dropResult)}
                    getChildPayload={(index) => cards[index]}
                    dragClass='card-ghost'
                    dropClass='card-ghost-drop'
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'card-drop-preview',
                    }}
                    dropPlaceholderAnimationDuration={200}
                >
                    {cards.map((card, index) => (
                        <Draggable key={index}>
                            <Card
                                card={card}
                                cards={column.cards}
                                setUpdateModalOpen={setUpdateModalOpen}
                                setSelectedCard={setSelectedCard}
                                users={users}
                            />
                        </Draggable>
                    ))}
                </Container>
            </div>
        </>
    );

    return (
        <>
            {body}
            <RemoveColumnModal
                columnName={column.name}
                id='remove-column-modal'
                modalOpen={removeColumnModalOpen}
                setModalOpen={setRemoveColumnModalOpen}
                onAction={onConfirmModalAction}
            />
            {/* MODAL */}
            <CardModal
                id='card-modal'
                modalOpen={cardModalOpen}
                setModalOpen={setCardModalOpen}
                column={column}
                users={users}
                onUpdateColumnState={onUpdateColumnState}
            />
        </>
    );
};

export default Column;
