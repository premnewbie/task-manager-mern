import Task from "../models/tasks.models.js";

export const createTask = async (req, res) => {
  console.log("Create task called");
  const user = req.user;
  try {
    const { title, description, status, category, dueDate } = req.body;

    if (!title || !description || !category) {
      throw new Error("All the fields are required");
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const inputDate = new Date(dueDate);

    if (inputDate <= today) {
      return res
        .status(400)
        .json({ message: "The dueDate must be a future date." });
    }

    const task = new Task({
      title,
      description,
      status,
      category,
      dueDate,
      user: user._id,
    });

    if (task) {
      await task.save();
      console.log("task created");
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Error while creating the task" });
    }

    res.status(200).json({
      success: true,
      task: task,
      message: "Task created successfully",
    });
  } catch (error) {
    console.log(
      "Error from the create task function in task controller",
      error.message
    );
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const updateTask = async (req, res) => {
  const { title, description, status, category, dueDate } = req.body.taskData;
  const { user } = req;
  const { taskId } = req.params;
  console.log("Checking the status",status)

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const inputDate = new Date(dueDate);

  if (inputDate <= today && status.toLowerCase()!=='completed') {
    return res.status(403).json({
      success: false,
      message: "Due Date must be a future date",
    });
  }

  try {
    const taskToUpdate = await Task.findOne({ _id: taskId, user: user._id });
    if (!taskToUpdate) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized or Task Not Found!",
      });
    }

    taskToUpdate.title = title;
    taskToUpdate.description = description;
    taskToUpdate.status = status;
    taskToUpdate.category = category;
    taskToUpdate.dueDate = dueDate;

    const updatedTask = await taskToUpdate.save();

    return res.status(200).json({
      success: true,
      task: updatedTask,
      message: "Task has been updated successfully",
    });
  } catch (error) {
    console.error("Error in updateTask:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const user = req.user;
  try {
    const userHasAccess = await Task.findOne({ _id: taskId, user: user._id });
    if (!userHasAccess) {
      return res.status(401).json({
        success: false,
        message:
          "UnAuthorized - You do not have the permission to delete the task",
      });
    }
    
    const result = await Task.deleteOne({ _id: taskId });
    
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Task Not Found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.log(
      "Error from the delete task function in task controller",
      error.message
    );
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getTasks = async (req, res) => {
  const { user } = req;
  try {
    const tasks = await Task.find({ user: user._id }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      tasks: tasks,
      message: "Fetched the tasks successfully",
    });
  } catch (error) {
    console.log(
      "Error from the get tasks function in task controller",
      error.message
    );
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getTask = async (req, res) => {
  const { user } = req;
  const { taskId } = req.params;
  try {
    const task = await Task.find({ _id: taskId, user: user._id })
    return res.status(200).json({
      success: true,
      task: task,
      message: "Fetched the task successfully",
    });
  } catch (error) {
    console.log(
      "Error from the get task function in task controller",
      error.message
    );
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};