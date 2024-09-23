"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controllers/taskController");
const router = express_1.default.Router();
// Define route for adding a new task
router.post('/add', taskController_1.addTask);
// Define route for fetching all tasks
router.get('/fetchAllTasks', taskController_1.fetchAllTasks);
exports.default = router;
