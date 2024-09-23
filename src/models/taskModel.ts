// src/models/taskModel.ts
import mongoose, { Document, Schema } from 'mongoose';

// Define the Task interface extending the Mongoose Document
export interface ITask extends Document {
  title: string;        // Task title
  description: string;  // Task description
  completed: boolean;   // Task completion status
}

// Define the schema for tasks with validation
const taskSchema: Schema = new Schema(
  {
    title: { 
      type: String, 
      required: true,   // Mark the title field as required
      trim: true,       // Automatically remove leading and trailing whitespace
    },
    description: { 
      type: String, 
      required: true,   // Mark the description field as required
      trim: true,       // Automatically remove leading and trailing whitespace
    },
    completed: { 
      type: Boolean, 
      default: false,   // Default value for completed is false
    },
  },
  { timestamps: true } // Enable automatic createdAt and updatedAt timestamps
);

// Export the Task model
export default mongoose.model<ITask>('Task', taskSchema);
