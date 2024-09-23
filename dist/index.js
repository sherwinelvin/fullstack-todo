"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoConfig_1 = __importDefault(require("./config/mongoConfig"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
// Load environment variables from the .env file
dotenv_1.default.config();
// Connect to MongoDB using the connection function defined in mongoConfig.ts
(0, mongoConfig_1.default)();
// Initialize the Express application
const app = (0, express_1.default)();
// Use middleware to handle CORS and JSON request bodies
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Set up the API routes for tasks
app.use('/api', taskRoutes_1.default);
// Start the server on port 5000
app.listen(5004, () => {
    console.log('Server running on http://localhost:5004');
});
console.log('MongoDB URI:', process.env.MONGO_URI);
console.log('Redis Host:', process.env.REDIS_HOST);
console.log('Redis Port:', process.env.REDIS_PORT);
