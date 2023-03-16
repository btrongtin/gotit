import Column from '../models/Column.model.js';
import { boardService } from './board.service.js';
import { cardService } from './card.service.js';
import mongoose from 'mongoose';

const createNew = async (data) => {
    try {
        const newColumn = await Column.create(data);
        newColumn.cards = [];
        //update column order in board collection
        const boardId = newColumn.board;
        const newColumnId = newColumn._id;

        await boardService.pushColumnOrder(boardId, newColumnId);
        return newColumn;
    } catch (error) {
        throw new Error(error);
    }
};

const getById = async (id) => {
    try {
        const column = await Column.findById(id).lean();
        return column;
    } catch (error) {
        throw new Error(error);
    }
};

const pushCardOrder = async (columnId, cardId) => {
    try {
        const result = await Column.findOneAndUpdate(
            { _id: columnId },
            { $push: { cardOrder: cardId } },
            { new: true }
        );

        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const update = async (id, data) => {
    try {
        const updateData = {
            ...data,
            updatedAt: Date.now(),
        };
        if (data.board) updateData.board = mongoose.Types.ObjectId(data.board);
        const updateCondition = { _id: id };

        if (updateData._id) delete updateData._id;
        if (updateData.cards) delete updateData.cards;
        console.log('UPDATE DATA: ', updateData);
        const result = await Column.findOneAndUpdate(
            updateCondition,
            updateData,
            { new: true }
        );

        if (result._destroy) {
            //delete many card in this column
            cardService.deleteMany(result.cardOrder);
        }

        return result;
    } catch (error) {
        throw new Error(error);
    }
};

export const columnService = { createNew, update, pushCardOrder, getById };
