import Card from '../models/Card.model.js';
import Column from '../models/Column.model.js';
import { columnService } from './column.service.js';
import mongoose from 'mongoose';

const createNew = async (data) => {
    try {
        console.log('DATAAA: ', data)
        const newCard = await Card.create(data);

        await columnService.pushCardOrder(newCard.column, newCard._id);

        return newCard;
    } catch (error) {
        throw new Error(error);
    }
};

const deleteMany = async (ids) => {
    try {
        const transformIds = ids.map((i) => mongoose.Types.ObjectId(i));
        const result = await Card.updateMany(
            { _id: { $in: transformIds } },
            { $set: { _destroy: true } }
        );
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const update = async (id, data) => {
    try {
        const oldCard =  await Card.findOne({ _id: id }).lean()
        const oldCardRemind = oldCard.remind
        console.log('OLDCARD REMIND: ', oldCardRemind)
        const updateData = {
            ...data,
            updatedAt: Date.now(),
        };
        if(data.board) updateData.board = mongoose.Types.ObjectId(data.board)
        if(data.column) updateData.column = mongoose.Types.ObjectId(data.column)
        const updateCondition = { _id: id };

        if (updateData._id) delete updateData._id;

        const result = await Card.findOneAndUpdate(
            updateCondition,
            updateData,
            { new: true }
        );
        console.log('NEWCARD REMIND: ', result.remind)

        return {card: result, oldCardRemind};
    } catch (error) {
        throw new Error(error);
    }
};

export const cardService = { createNew, deleteMany, update };
