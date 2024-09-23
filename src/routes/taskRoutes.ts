import express from 'express';
import { addTask, fetchAllTasks } from '../controllers/taskController';

const router = express.Router();

// Define route for adding a new task
router.post('/add', addTask);

// Define route for fetching all tasks
router.get('/fetchAllTasks', fetchAllTasks);

export default router;
