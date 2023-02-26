import { ConnectOptions } from 'mongodb';
import mongoose from 'mongoose';
import Logger from '../utils/logger';
export const connectDB = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        Logger.debug('MongoDb Connected');   
    } catch (error) {
        Logger.debug(error);   
        throw error
    }
}