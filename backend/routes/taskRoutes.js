const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');
const auth = require('../middleware/auth');

router.post('/', auth, taskController.createTask);
router.get('/', auth, taskController.getAllTasks);
router.put('/:id', auth, taskController.updateTask);
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router; 