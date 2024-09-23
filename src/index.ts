import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectMongo from './config/mongoConfig';
import './config/redisConfig'; // Initialize Redis
import taskRoutes from './routes/taskRoutes';
import './services/mqtt'; // Initialize MQTT service


// Load environment variables from the .env file
dotenv.config();

// Connect to MongoDB using the connection function defined in mongoConfig.ts
connectMongo();

// Initialize the Express application
const app = express();

// Use middleware to handle CORS and JSON request bodies
app.use(cors());
app.use(express.json());

// Set up the API routes for tasks
app.use('/api', taskRoutes);

// Start the server on port 5000


app.listen(5012, () => {
  console.log('Server running on http://localhost:5011');
});
console.log('MongoDB URI:', process.env.MONGO_URI);
console.log('Redis Host:', process.env.REDIS_HOST);
console.log('Redis Port:', process.env.REDIS_PORT);
