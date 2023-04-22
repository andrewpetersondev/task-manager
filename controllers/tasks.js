const { response } = require("express")
const Task = require("../models/task")

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.status(200).json({ tasks }) // option 1
    // res.status(200).json({ tasks, amount: tasks.length }) // option 2
    // res
    //   .status(200)
    //   .json({ status: "success", data: { tasks, nbHits: tasks.length } }) // option 3
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params
    const task = await Task.findOne({ _id: taskID })
    if (!task) {
      return res.status(404).json({ msg: `no task with id : ${taskID}` })
    }
    res.status(200).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params
    // const { data } = req.body
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    })
    if (!task) {
      return res.status(404).json({ msg: `no task with id : ${taskID}` })
    }
    res.status(200).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params
    const task = await Task.findOneAndDelete({ _id: taskID })
    if (!task) {
      return res.status(404).json({ msg: `no task with id : ${taskID}` })
    }
    res.status(200).json({ task }) // option 1
    //  res.status(200).send() // option 2
    // res.status(200).json({ task: null, status: "success" }) // option 3
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask }
