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

router.get('/', async (req, res) => {
	try {

		mailer.sendMail('btrongtin891@gmail.com', "Test Email", `This is a test email <b>Hihi</b>`)
		console.log('SENDED MAIL')
		// console.log(transporter.options.host);
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})
router.get('/:id', async (req, res) => {
	try {

		let column = await columnService.getById(req.params.id)
		res.json({column})
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
		const result = await columnService.createNew(req.body)
		res.json({ success: true, column: result })

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
		const result = await columnService.update(id, req.body)
		if (!result)
			return res.status(401).json({
				success: false,
				message: 'Column not found or user not authorised'
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