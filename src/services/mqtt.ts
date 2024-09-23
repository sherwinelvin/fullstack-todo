// src/services/mqtt.ts

import mqtt from 'mqtt';
import redisClient from '../config/redisConfig'; // Adjust the path if necessary
import dotenv from 'dotenv';

dotenv.config();

// Set up the MQTT client and connect to the broker
const mqttClient = mqtt.connect('mqtt://broker.hivemq.com'); // Replace with your MQTT broker URL if different

// Event handler for when the MQTT client successfully connects
mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
  
  // Subscribe to the /add topic to listen for new task messages
  mqttClient.subscribe('/add', (err) => {
    if (err) {
      console.error('Error subscribing to /add topic:', err);
    } else {
      console.log('Subscribed to /add topic');
    }
  });
});

// Event handler for when a message is received on the subscribed topic
mqttClient.on('message', async (topic, message) => {
  if (topic === '/add') {
    try {
      const task = message.toString();
      console.log(`Received task: ${task}`);

      // Retrieve existing tasks from Redis or initialize an empty array
      const redisKey = `FULLSTACK_TASK_<YOUR_FIRST_NAME>`; // Replace <YOUR_FIRST_NAME> with your actual first name
      const tasks = JSON.parse((await redisClient.get(redisKey)) || '[]');
      tasks.push(task);

      // Check if the task list exceeds 50 items
      if (tasks.length > 50) {
        // Logic to move tasks from Redis to MongoDB
        console.log('Moving tasks from Redis to MongoDB...');
        // TODO: Add MongoDB insertion logic here
        await redisClient.set(redisKey, JSON.stringify([])); // Clear the Redis cache
      } else {
        // Update Redis with the new task list
        await redisClient.set(redisKey, JSON.stringify(tasks));
      }
    } catch (error) {
      console.error('Error processing MQTT message:', error);
    }
  }
});

export default mqttClient;
