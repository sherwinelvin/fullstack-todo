"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllTasks = exports.addTask = void 0;
const redisConfig_1 = __importDefault(require("../config/redisConfig"));
const taskModel_1 = __importDefault(require("../models/taskModel"));
// Function to add a task
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task } = req.body; // Extract task data from the request body
        // Retrieve existing tasks from Redis
        let tasks = yield redisConfig_1.default.get('FULLSTACK_TASK_H');
        let taskList = tasks ? JSON.parse(tasks) : [];
        // Add the new task to the list
        taskList.push(task);
        // Save updated list back to Redis
        yield redisConfig_1.default.set('FULLSTACK_TASK_H', JSON.stringify(taskList));
        // Check if task list exceeds 50 items
        if (taskList.length > 50) {
            // Save tasks to MongoDB and clear the Redis cache
            yield taskModel_1.default.insertMany(taskList.map((task) => ({ task })));
            yield redisConfig_1.default.del('FULLSTACK_TASK_H');
        }
        res.status(201).json({ message: 'Task added successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding task', error });
    }
});
exports.addTask = addTask;
// Function to fetch all tasks
const fetchAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Retrieve tasks from Redis
        const tasks = yield redisConfig_1.default.get('FULLSTACK_TASK_H');
        const taskList = tasks ? JSON.parse(tasks) : [];
        // Respond with the list of tasks
        res.status(200).json(taskList);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
});
exports.fetchAllTasks = fetchAllTasks;
