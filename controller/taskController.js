const Task = require("../model/Task");

// Create a new task
async function createTask(req, res) {
  try {
    const { title, description } = req.body;
    const userId = req.user; // Access the authenticated user's ID from the middleware

    // Create a new task
    const task = new Task({ title, description, userId });

    // Save the task to the database
    await task.save();

    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

// Get all tasks
async function getAllTasks(req, res) {
  try {
    const userId = req.user; // Access the authenticated user's ID from the middleware

    // Find all tasks associated with the user
    const tasks = await Task.find({ userId });

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

// Get a specific task by ID
async function getTaskById(req, res) {
  try {
    const taskId = req.params.id;
    const userId = req.user; // Access the authenticated user's ID from the middleware

    // Find the task by ID and user ID
    const task = await Task.findOne({ _id: taskId, userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

// Update a task
async function updateTask(req, res) {
  try {
    const taskId = req.params.id;
    const { title, description } = req.body;
    const userId = req.user; // Access the authenticated user's ID from the middleware

    // Find the task by ID and user ID
    const task = await Task.findOne({ _id: taskId, userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update task details
    task.title = title;
    task.description = description;

    // Save the updated task to the database
    await task.save();

    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

// Delete a task
async function deleteTask(req, res) {
  try {
    const taskId = req.params.id;
    const userId = req.user; // Access the authenticated user's ID from the middleware

    // Find the task by ID and user ID
    const task = await Task.findOne({ _id: taskId, userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Delete the task
    await task.deleteOne();

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}


module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
