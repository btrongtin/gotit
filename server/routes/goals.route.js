import express from 'express'
import verifyToken from "../middlewares/auth.js";
import User from "../models/User.js";
const router = express.Router()
import Board from '../models/Board.model.js'
import { boardService } from '../services/board.service.js';
// const Card = require('../models/Card')
// const Column = require('../models/Column')

// @route GET api/Cards
// @desc Get Cards
// @access Private
router.get('/:id', async (req, res) => {
	try {
		const fullBoard = await boardService.getFullBoard(req.params.id)

		res.json({ success: true, fullBoard })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Board Not Found' })
	}
})

// @route POST api/posts
// @desc Create post
// @access Private
router.post('/', verifyToken, async (req, res) => {
	// Simple validation
	// if (!title)
	// 	return res
	// 		.status(400)
	// 		.json({ success: false, message: 'Title is required' })

	try {
		const result = await boardService.createNew({user: req.uid})
		res.json({ success: true, board: result })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

router.put('/:id', async (req, res) => {
	try {
		const result = await boardService.update(req.params.id, req.body)
		res.json({ success: true, board: result })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

//Update distinct labels of board
router.patch('/:id', async (req, res) => {
	try {
		const result = await boardService.getDistinctLabels(req.params.id)
		res.json({ success: true, labels: result })
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