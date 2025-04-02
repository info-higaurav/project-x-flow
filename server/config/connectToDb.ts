import mongoose  from "mongoose";

const connectToDb = async () =>{
    try {
        return await mongoose.connect(process.env.DB_URI as string, {dbName:process.env.DB_NAME as string});
    } catch (error) {
        throw error;
    }
}

export default connectToDb;