import express from 'express'
import verifyToken from "../middlewares/auth.js";
import User from "../models/User.js";
const router = express.Router()

import Board from '../models/Board.model.js'
import { boardService } from '../services/board.service.js';
import { columnService } from '../services/column.service.js';
import { cardService } from '../services/card.service.js';
import schedule from 'node-schedule'
import {mailer} from '../mail/mailer.js'
// const Card = require('../models/Card')
// const Column = require('../models/Column')

// @route GET api/Cards
// @desc Get Cards
// @access Private
router.get('/', async (req, res) => {
	try {

		let board = await Board.findOne({user: req.uid})
		if(!board) board = await Board.create({user: req.uid})

		const result = board.populate({
			path: 'column',
			populate: {
				path: 'card'
			}
		})

		res.json({ success: true, result })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

export default router;