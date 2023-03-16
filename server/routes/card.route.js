import express from 'express'
import verifyToken from "../middlewares/auth.js";
import User from "../models/User.js";
const router = express.Router()

import Board from '../models/Board.model.js'
import { boardService } from '../services/board.service.js';
import { columnService } from '../services/column.service.js';
import { cardService } from '../services/card.service.js';
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

		console.log('RESULTTTTT: ', result)



		// const cols = await Column.find({board: board._id}).lean()

		// const getCardsOfCols = async (col, i) => {
		// 	return await Card.find({column: col._id, user: req.uid}).populate('column', ['name'])
		//   };

		// const resultPromise = cols.map(getCardsOfCols)
		// const results = await Promise.all(resultPromise)

		// const cards = await Card.find({ user: req.uid }).populate('user', [
		// 	'name'
		// ])
		res.json({ success: true, result })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route POST api/posts
// @desc Create post
// @access Private
router.post('/', async (req, res) => {
	try {
		const result = await cardService.createNew(req.body)
		// console.log('RESULT: ', result)
		// await boardService.pushBoardLabels(result.board, result.labels)
		res.json({ success: true, card: result })

	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route PUT api/posts
// @desc Update post
// @access Private
router.put('/:id', async (req, res) => {
	// const { title, description, url, status } = req.body
	const id = req.params.id
	try {
		const result = await cardService.update(id, req.body)
		if (!result)
			return res.status(401).json({
				success: false,
				message: 'Card not found or user not authorised'
			})

		res.json({
			success: true,
			column: result
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route DELETE api/posts
// @desc Delete post
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
	try {
		const postDeleteCondition = { _id: req.params.id, user: req.userId }
		const deletedPost = await Post.findOneAndDelete(postDeleteCondition)

		// User not authorised or post not found
		if (!deletedPost)
			return res.status(401).json({
				success: false,
				message: 'Post not found or user not authorised'
			})

		res.json({ success: true, post: deletedPost })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

export default router;