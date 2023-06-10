import { Task } from "../models/tasks.js";
import ErrorHandler from "../utils/customError.js";

export const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task added successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const myTasks = await Task.find({ user: userId });
    res.status(201).json({
      success: true,
      myTasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Invalid task id!", 404));

    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(201).json({
      success: true,
      message: "Task updated successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) return next(new ErrorHandler("Task not found!", 404));
    return res.status(201).json({
      success: true,
      message: "Task deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};
