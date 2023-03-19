export const apiUrl = 'http://localhost:5000/api';
// export const apiUrl =
//     process.env.NODE_ENV !== "production"
//         ? "http://localhost:5000/api"
//         : "https://warm-island-31040.herokuapp.com/api";

export const LOCAL_STORAGE_TOKEN_NAME = 'gotIt';
export const MODAL_ACTION_CONFIRM = 'confirm';
export const MODAL_ACTION_CLOSE = 'close';

// export const COLORS_PALLETE = ['#f472b6','#4ade80', '#38bdf8', '#a78bfa', '#d946ef', '#facc15', '#F87171', '#FB7185']
export const COLORS_PALLETE = ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#0ead69', '#3a86ff']

const colsData = {
    board: 'board1',
    colNum: 3,
    colOrder: ['col-1', 'col-2', 'col-3'],
    value: [
        {
            id: 'col-1',
            board: 'board1',
            name: 'To-do',
            cardNum: 2,
            cardOrder: ['card-1', 'card-2'],
            cards: [
                {
                    id: 'card-1',
                    labels: [
                        { name: 'design', color: 'emerald' },
                        { name: 'marketting', color: 'yellow' },
                    ],
                    name: 'Design landing page for support team',
                    createdAt: '27 Jan 2023',
                    priority: 'P1',
                },
                {
                    id: 'card-2',
                    labels: [
                        { name: 'design', color: 'emerald' },
                        { name: 'marketting', color: 'yellow' },
                    ],
                    name: 'Design landing page for support team',
                    createdAt: '27 Jan 2023',
                    priority: 'P1',
                },
            ],
        },
        {
            id: 'col-2',
            board: 'board1',
            name: 'Inprogress',
            cardNum: 1,
            cardOrder: ['card-3'],
            cards: [
                {
                    id: 'card-3',
                    labels: [
                        { name: 'design', color: 'emerald' },
                        { name: 'marketting', color: 'yellow' },
                    ],
                    name: 'Design landing page for support team',
                    createdAt: '27 Jan 2023',
                    priority: 'P1',
                },
            ],
        },
        {
            id: 'col-3',
            board: 'board1',
            name: 'Done',
            cardNum: 3,
            cardOrder: ['card-4', 'card-5', 'card-6', 'card-7'],
            cards: [
                {
                    id: 'card-4',
                    labels: [
                        { name: 'design', color: 'emerald' },
                        { name: 'marketting', color: 'yellow' },
                    ],
                    name: 'Design landing page for support team',
                    createdAt: '27 Jan 2023',
                    priority: 'P1',
                },
                {
                    id: 'card-5',
                    labels: [
                        { name: 'design', color: 'emerald' },
                        { name: 'marketting', color: 'yellow' },
                    ],
                    name: 'Design landing page for support team',
                    createdAt: '27 Jan 2023',
                    priority: 'P1',
                },
                {
                    id: 'card-6',
                    labels: [
                        { name: 'design', color: 'red' },
                        { name: 'marketting', color: 'pink' },
                    ],
                    name: 'Design6 landing page for support team',
                    createdAt: '27 Jan 2023',
                    priority: 'P1',
                },
                {
                    id: 'card-7',
                    labels: [
                        { name: 'design', color: 'emerald' },
                        { name: 'marketting', color: 'yellow' },
                    ],
                    name: 'Design7 landing page for support team',
                    createdAt: '27 Jan 2023',
                    priority: 'P1',
                },
            ],
        },
    ],
};