const express = require('express')
const Todo = require('../models/todo')
const router = express.Router()

//Get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find()
        console.log("Fetching todos")
        res.status(200).json(todos)
    } catch(err) {
        console.log({ 
            message: "Failed to fetch todos", 
            error: err })
        res.status(500).json("Failed to fetch todos")
    }
})

//Get todo by id
router.get('/:todoId', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.todoId)
        console.log("Fetching todo with id: " + req.params.todoId)
        res.json(todo)
    } catch(err) {
        console.log({ 
            message: "Failed to fetch todo with id: " + req.params.todoId, 
            error: err})
        res.status(404).json("Todo not found")
    }
})

//Create todo
router.post('/', async (req, res) => {

    if (req.body.task == ""  || req.body.task == null){
        console.log("Failed to create todo")
        res.status(400).json("Task can not be empty")
        return
    }
 
    var listIdExists = await Todo.exists({'listId': req.body.listId})
    if (!listIdExists) {
        console.log("Failed to create todo")
        res.status(400).json("List does not exist")
        return
    }

    const todo = new Todo({
        listId: req.body.listId,
        task: req.body.task,
        completed: req.body.completed
    })

    try {
        const savedTodo = await todo.save()
        console.log("Todo has been created")
        res.status(201).json(savedTodo)
    } catch(err) {
        console.log({ 
            message: "Failed to create todo",
            error: err})
        res.status(500).json("Failed to create todo")
    }
})

//Update todo
router.patch('/:todoId', async (req, res) => {

    var todoExsists = await Todo.exists({'todoId': req.params.todoId })
    if (!todoExsists) {
        console.log("Failed to update todo")
        res.status(400).json("Todo not found")
        return
    }

    try {
        const updatedTodo = await Todo.updateOne(
            {_id: req.params.todoId },
            { $set: {task: req.body.task, completed: req.body.completed } 
        })
        res.json(updatedTodo)
        console.log("Todo with id: " + req.params.todoId + " has been updated")
    } catch (err) {
        console.log({
            message:"Failed to update todo with id: " + req.params.todoId,
            error: err})
        res.status(500).json({ message: err})
    }
})

//Delete todo
router.delete('/:todoId', async (req, res) => {
    try {
        const removedTodo = await Todo.remove({_id: req.params.todoId })
        res.json(removedTodo)
        console.log("Todo with id: " + req.params.todoId + " has been deleted")
    } catch(err) {
        console.log({
            message: "Failed to delete todo with id: " + req.params.todoId,
            error: error}) 
        res.status(500).json("Failed to delete todo")
    }
})

//Get all todos for list by listId
router.get('/list/:listId', async (req, res) => {
    try {
        const todos = await Todo.find({ 'listId': req.params.listId })
        console.log("Fetching todos for listId: " + req.params.listId)
        res.json(todos)
    } catch (err) {
        console.log({
            message: "Failed to fetch todos for listId: " + req.params.listId, 
            error: err})
        res.status(404).json("List not found")
    }
})

module.exports = router