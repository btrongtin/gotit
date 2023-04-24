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

<<<<<<< Updated upstream
=======
export const getListBoardOfUser = async () => {
    const res = await axios.get(`${apiUrl}/goals/goals`)
    console.log('RES ALL BOARD: ', res.data)
    return res.data
}

export const getDashboard = async () => {
    const res = await axios.get(`${apiUrl}/dashboard`)
    // console.log('RES ALL BOARD: ', res.data)
    return res.data
}

export const getListUserOfBoard = async (boardId) => {
    const res = await axios.get(`${apiUrl}/goals/users/${boardId}`)
    console.log('RES ALL USER: ', res.data)
    return res.data
}

export const updateAccessBoardsByUser = async (boardId, email) => {
    const res = await axios.put(`${apiUrl}/user/${boardId}`, {email})
    return res.data
}

>>>>>>> Stashed changes

