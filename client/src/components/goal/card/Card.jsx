import React from 'react';
import moment from 'moment';

const Card = (props) => {
    const { card, cards, setUpdateModalOpen, setSelectedCard } = props;
    const handleCardClick = () => {
        const currentCard = cards.find((item) => item._id === card._id)
        setUpdateModalOpen(true)
        setSelectedCard(currentCard)
    }
    return (
        <div onClick={handleCardClick} className='card flex flex-col cursor-pointer w-72 min-w-72 min-h-40 p-5 pb-3 mb-3 bg-[#F8F9FD] border border-white rounded-md'>
            <div className='mb-3 text-xs font-semibold'>
                {card.labels.map((label, index) => (
                    <span
                        key={index}
                        className={`inline-block last:mr-0 mr-2 mb-2 rounded-md px-4 py-1 relative after:content-[''] after:absolute after:inset-0 after:rounded-[inherit] after:bg-current after:opacity-20`}
                        style={{ color: `${label.color}`}}
                    >
                        {label && label.label}
                    </span>
                ))}
            </div>
            <h5 className='text-md font-bold mb-4'>{card.name}</h5>
            <div className='card-footer mt-auto flex justify-between items-center'>
                <span className='text-xs text-slate-400'>{card.dueDate && moment(card.dueDate).format('DD MMM YYYY')}</span>
                <span className='text-md text-blue-600 font-semibold'>
                    {card.priority}
                </span>
            </div>
        </div>
    );
};

export default Card;
