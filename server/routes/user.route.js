import express from 'express'
import verifyToken from "../middlewares/auth.js";
import User from "../models/User.js";
const router = express.Router()

import Board from '../models/Board.model.js'
import { boardService } from '../services/board.service.js';
import { columnService } from '../services/column.service.js';
// const Card = require('../models/Card')
// const Column = require('../models/Column')
import {mailer} from '../mail/mailer.js'
import { userService } from '../services/user.service.js';

router.get('/', async (req, res) => {
	try {
	} catch (error) {
        console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

router.get('/:id', async (req, res) => {
	try {

	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})


router.post('/', async (req, res) => {
	try {
		// const result = await columnService.createNew(req.body)
		// res.json({ success: true, column: result })

	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

//update user accessboards
router.put('/:boardId', verifyToken,async (req, res) => {
	const boardId = req.params.boardId
	try {
		const result = await userService.updateAccessBoards(req.body.email, boardId)

		res.json({
			success: true,
			user: result
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
				message: 'Post not found or user not authorized'
			})

		res.json({ success: true, post: deletedPost })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

export default router;