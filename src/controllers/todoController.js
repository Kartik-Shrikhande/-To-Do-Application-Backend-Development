const todoModel = require('../models/todoModel')
const { validationResult } = require('express-validator')


//-----------Create Todo API -----//

exports.createTodo = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const { title, description, dueDate, priority, category } = req.body
    const todo = await todoModel.create({ user: req.userId, title, description, dueDate, priority, category })
    return res.status(201).json({ message: 'To-Do created successfully', todo })
  }
  catch (error) {
    return res.status(500).json({ error: 'Error creating To-Do' })
  }
}



//-----------Retrives Todo with Fiteration API -----//

exports.getTodos = async (req, res) => {
  try {
    const { status, priority, dueDate, limit = 10 } = req.query
    const filter = { user: req.userId, isDeleted: false }
    if (status) filter.status = status
    if (priority) filter.priority = priority
    if (dueDate) filter.dueDate = { $lte: new Date(dueDate) }

    const limitNum = parseInt(limit, 10) || 10
    const todos = await todoModel.find(filter).limit(limitNum)
    if (!todos || todos.length === 0) return res.status(404).json({ message: 'No data found' })
    return res.status(200).json({ total: todos.length, todos: todos })
  }
  catch (error) {
    return res.status(500).json({ error: 'Error fetching To-Dos' })
  }
}



//-----------update Todo API -----//

exports.updateTodo = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const { id } = req.params
    const updates = req.body
    const todo = await todoModel.findByIdAndUpdate({ _id: id, user: req.userId, isDeleted: false }, updates, { new: true })
    if (!todo) return res.status(404).json({ error: 'To-Do not found in Users List' })
    return res.status(200).json({ message: 'To-Do updated successfully', todo })
  }
  catch (error) {
    return res.status(500).json({ error: 'Error updating To-Do' })
  }
}



//-----------Delete Todo API -----//

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params
    const todo = await todoModel.findOne({ _id: id, user: req.userId })
    if (!todo) return res.status(404).json({ error: 'To-Do not found' })
    if (todo.isDeleted) return res.status(400).json({ error: 'To-Do is already deleted' })
    await todoModel.findOneAndDelete({ _id: id, user: req.userId })
    return res.status(200).json({ message: 'To-Do deleted successfully' })
  }
  catch (error) {
    return res.status(500).json({ error: 'Error deleting To-Do' })
  }
}



//-----------Assign Category API -----//

exports.assignCategory = async (req, res) => {
  try {
    const { id } = req.params
    const { category } = req.body
    const todo = await todoModel.findOneAndUpdate({ _id: id, user: req.userId, isDeleted: false }, { category }, { new: true })
    if (!todo) return res.status(404).json({ error: 'To-Do not found' })
    return res.status(200).json({ message: 'Category assigned successfully', todo })
  }
  catch (error) {
    return res.status(500).json({ error: 'Error assigning category' })
  }
}



//-----------Get Due Date Reminders API -----//

exports.getDueDateReminders = async (req, res) => {
  try {
    const now = new Date()
    const upcomingDate = new Date()
    upcomingDate.setDate(now.getDate() + 3)
    const todos = await todoModel.find({ user: req.userId, isDeleted: false, dueDate: { $gte: now, $lte: upcomingDate } })
    return res.status(200).json({ total: todos.length, todos: todos })
  }
  catch (error) {
    return res.status(500).json({ error: 'Error fetching due date reminders' })
  }
}



//-----------search Todos API -----//

exports.searchTodos = async (req, res) => {
  try {
    const { keyword } = req.query
    const regex = new RegExp(keyword, 'i') // Case-insensitive search
    const todos = await todoModel.find({ user: req.userId, isDeleted: false, $or: [{ title: regex }, { description: regex }] })
    if (!todos || todos.length === 0) return res.status(404).json({ message: 'No data found' })
    return res.status(200).json({ total: todos.length, todos: todos })
  }
  catch (error) {
    return res.status(500).json({ error: 'Error searching To-Dos' })
  }
}
