const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const budgetItemController = require("../controllers/budgetItem");

// @route GET api/posts
// @desc Get posts
// @access Private
router.get("/", verifyToken, budgetItemController.getBudgetItems);

//@route POST api/posts
//@desc Create post
//@access Private
router.post("/", verifyToken, budgetItemController.createBudgetItem);

// @route PUT api/posts
// @desc Update post
// @access Private
router.put("/:id", verifyToken, budgetItemController.updateBudgetItem);

// @route POST api/BudgetItem
// @desc add new todo into a BudgetItem
// @access Private
router.post("/:id/", verifyToken, budgetItemController.addTodo);

// @route DELETE api/posts
// @desc Delete post
// @access Private
router.delete("/:id", verifyToken, budgetItemController.deleteBudgetItem);

// @route put api/BudgetItems/idTodo/
// @desc Delete todo in BudgetItem
// @access Private
router.put("/:id/:idTodo", verifyToken, budgetItemController.deleteTodo);
router.patch(
    "/:id/:idTodo",
    verifyToken,
    budgetItemController.toggleStatusTodo
);

module.exports = router;
