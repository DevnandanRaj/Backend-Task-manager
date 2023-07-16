const express = require('express');
const taskController = require("../controller/taskController");
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/view', taskController.getAllTasks);
router.post('/create', taskController.createTask);
router.get('/view/:id', taskController.getTaskById);
router.put('/update/:id', taskController.updateTask);
router.delete('/delete/:id', taskController.deleteTask);

module.exports = router;
