import mongoose from "mongoose";

const connectDB = async () => {
    try {
       const conn= await mongoose.connect(process.env.DB_URL)
        console.log(`connected to ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

export default connectDB

PORT = 8000
DB_URL = mongodb://localhost:27017/taskManagement
JWT_SECRET = IF55f&*mnv8b
ACTIVATION_SECRET = ghusd%@*567njbSJB
GMAIL = ajishraj5@gmail.com
GPASS = yeuebnsdsvfcrjoh
NODE_ENV = development