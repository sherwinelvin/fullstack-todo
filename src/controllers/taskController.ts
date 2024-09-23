// src/controllers/taskController.ts
import { Request, Response } from 'express';
import redis from '../config/redisConfig';
import Task, { ITask } from '../models/taskModel';

// Function to add a task
export const addTask = async (req: Request, res: Response) => {
  try {
    const { task }: { task: ITask } = req.body;

    // Validate task input to ensure required fields are present
    if (!task || typeof task.title !== 'string' || typeof task.description !== 'string') {
      return res.status(400).json({ message: 'Invalid task data: Title and description are required.' });
    }

    // Retrieve existing tasks from Redis
    let tasks = await redis.get('FULLSTACK_TASK_H');
    let taskList: ITask[] = tasks ? JSON.parse(tasks) : [];

    // Filter out any null or invalid tasks before adding a new task
    taskList = taskList.filter(task => task && task.title && task.description);

    // Add the new task to the list
    taskList.push(task);

    // Save the updated list back to Redis
    await redis.set('FULLSTACK_TASK_H', JSON.stringify(taskList));

    // Check if the task list exceeds 50 items
    if (taskList.length > 50) {
      // Save tasks to MongoDB and clear the Redis cache
      await Task.insertMany(taskList);
      await redis.del('FULLSTACK_TASK_H');
    }

    res.status(201).json({ message: 'Task added successfully' });
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: 'Error adding task', error });
  }
};

// Function to fetch all tasks
export const fetchAllTasks = async (req: Request, res: Response) => {
  try {
    // Retrieve tasks from Redis
    const tasks = await redis.get('FULLSTACK_TASK_H');
    const taskList: ITask[] = tasks ? JSON.parse(tasks) : [];

    // Filter out null values and ensure proper task formatting
    const validTasks = taskList.filter(task => task && task.title && task.description);

    // Respond with the list of valid tasks
    res.status(200).json(validTasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};
