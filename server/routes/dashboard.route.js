import express from 'express';
import verifyToken from '../middlewares/auth.js';
import User from '../models/User.js';
const router = express.Router();

import Board from '../models/Board.model.js';
import { boardService } from '../services/board.service.js';
import { columnService } from '../services/column.service.js';
import { cardService } from '../services/card.service.js';
import schedule from 'node-schedule';
import { mailer } from '../mail/mailer.js';
// const Card = require('../models/Card')
// const Column = require('../models/Column')

// @route GET api/Cards
// @desc Get Cards
// @access Private
const countCardNum = (board) => {
    let cardCount = 0;
    for (let i = 0; i < board.cols.length; i++) {
        cardCount += board.cols[i].cards.length;
    }
    return cardCount
};

router.get('/', verifyToken, async (req, res) => {
    try {
        // const user = await User.findOne({ uid: req.uid });
        const boards = await boardService.getAllBoard(req.uid);
        let fullBoards = [];
        boards.forEach((board) => {
            const fullBoard = boardService.getFullBoard(board._id.toString());
            fullBoards.push(fullBoard);
        });
        fullBoards = await Promise.all(fullBoards);
        // console.log('FULLBOARD: ', fullBoards)
        const data = {};
        data.goals = {
            count: fullBoards.length,
            value: fullBoards.map((board) => ({
                name: board.name,
                count: countCardNum(board),
            })),
        };
        data.tasks = await boardService.getTasksOfUser(req.uid, fullBoards.map(board=>({_id: board._id, name: board.name})))
        // console.log('RESUT DASHBOARD: ', data.tasks);
        res.json({ success: true, data });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

export default router;
