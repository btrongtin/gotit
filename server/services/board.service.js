import Board from '../models/Board.model.js';
import mongoose from 'mongoose';
import Card from '../models/Card.model.js';

const createNew = async (data) => {
    try {
        const result = await Board.create(data);

        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const pushColumnOrder = async (boardId, columnId) => {
    try {
        const result = await Board.findOneAndUpdate(
            { _id: boardId },
            { $push: { colOrder: columnId } },
            { new: true }
        );

        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const getDistinctLabels = async (boardId) => {
    let cardsOfBoard = await Card.find({
        board: boardId,
        _destroy: false,
    }).lean();
    let labelsOfBoard = cardsOfBoard.map((e) => e.labels);
    labelsOfBoard = labelsOfBoard.flat(Infinity);
    let distincLabels = [];
    labelsOfBoard.filter((item) => {
        var i = distincLabels.findIndex(
            (x) => x.value == item.value && x.label == item.label
        );
        if (i <= -1) {
            distincLabels.push(item);
        }
        return null;
    });
    return distincLabels
};

const getFullBoard = async (boardId) => {
    try {
        let result = await Board.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(boardId),
                    _destroy: false,
                },
            },
            {
                $lookup: {
                    from: 'columns',
                    localField: '_id',
                    foreignField: 'board',
                    as: 'cols',
                },
            },
            {
                $lookup: {
                    from: 'cards',
                    localField: '_id',
                    foreignField: 'board',
                    as: 'cards',
                },
            },
        ]);
        
        // const distincLabels = [...new Set(labelsOfBoard)]
        let distincLabels = await getDistinctLabels(boardId)
        console.log('DISTINC LABEL: ', distincLabels)
        result = result[0] || {};

        const transformBoard = JSON.parse(JSON.stringify(result));

        //filter deleted columns
        transformBoard.cols = transformBoard.cols.filter(
            (col) => !col._destroy
        );

        if (Object.keys(result).length) {
            transformBoard.cols.forEach((col) => {
                col.cards = transformBoard.cards.filter(
                    (card) => card.column.toString() === col._id.toString()
                );
            });
        } else throw new Error('Board not found');

        delete transformBoard.cards;
        transformBoard.labels = distincLabels;
        return transformBoard;
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
        const updateCondition = { _id: id };

        if (updateData._id) delete updateData._id;
        if (updateData.columns) delete updateData.columns;
        if (updateData.labels) delete updateData.labels;

        const result = await Board.findOneAndUpdate(
            updateCondition,
            updateData,
            { new: true }
        );

        return result;
    } catch (error) {
        throw new Error(error);
    }
};

export const boardService = {
    createNew,
    getFullBoard,
    pushColumnOrder,
    update,
    getDistinctLabels
};