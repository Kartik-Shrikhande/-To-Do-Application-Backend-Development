const express = require('express')
const router = express.Router()
const { createTodo, getTodos, updateTodo, deleteTodo, searchTodos, assignCategory, getDueDateReminders }
  = require('../controllers/todoController')

const { createTodoValidation, updateTodoValidation } = require('../validations/todosValidations')
const authMiddleware = require('../middlewares/authentication')

router.use(authMiddleware.authentication)
router.post('/create', createTodoValidation, createTodo)
router.get('/get/:filter', getTodos);
router.put('/update/:id', updateTodoValidation, updateTodo)
router.delete('/delete/:id', deleteTodo)
router.patch('/category/:id', assignCategory)
router.get('/reminders', getDueDateReminders)
router.get('/search/:keyword', searchTodos)

module.exports = router;
