import axios from "axios";
import {apiUrl} from "../../constant";

export const updateBoard = async (id, data) => {
    const res = await axios.put(`${apiUrl}/goals/${id}`, data)
    return res.data
}

export const getDistinctLabels = async (id) => {
    const res = await axios.patch(`${apiUrl}/goals/${id}`)
    return res.data
}

export const getFullBoard = async (id) => {
    const res = await axios.get(`${apiUrl}/goals/${id}`)
    return res.data
}

export const createNewColumn = async (data) => {
    const res = await axios.post(`${apiUrl}/column`, data)
    return res.data
}

//update or remove column
export const updateColumn = async (id, data) => {
    const res = await axios.put(`${apiUrl}/column/${id}`, data)
    return res.data
}

export const createNewCard = async (data) => {
    const res = await axios.post(`${apiUrl}/card`, data)
    return res.data
}

//update or remove card
export const updateCard = async (id, data) => {
    const res = await axios.put(`${apiUrl}/card/${id}`, data)
    return res.data
}

export const getColumnById = async (id) => {
    const res = await axios.get(`${apiUrl}/column/${id}`)
    console.log('RES COL: ', res.data)
    return res
}


