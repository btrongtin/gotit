import Board from "../models/Board.model";


const checkAuthorization = async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board.accessByUsers.includes(req.uid)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // If user is authorized, pass the request along to the next middleware
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export default checkAuthorization;