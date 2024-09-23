import mongoose from 'mongoose';

// Function to connect to MongoDB
const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://sherwin567:123@cluster0.8gdgs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
};

export default connectMongo;

