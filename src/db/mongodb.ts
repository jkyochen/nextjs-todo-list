import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGODB_URI);
    } catch (error) {
        process.exit(1);
    }
};

const disconnectDB = async (): Promise<void> => {
    await mongoose.disconnect();
};

process.on('SIGINT', async () => {
    console.log('Received SIGINT. Closing MongoDB connection...');
    await disconnectDB();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('Received SIGTERM. Closing MongoDB connection...');
    await disconnectDB();
    process.exit(0);
});
