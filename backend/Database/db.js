import mongoose from "mongoose";

const connectToDB = async() => {

    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('MongoDB connected successfully');

    } catch(error) {
        console.error('Mongodb connection failed', error);
        process.exit(1);
    }
}

export default connectToDB;