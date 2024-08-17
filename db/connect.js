import mongoose from 'mongoose';

async function connectToMongoDB(MONGODB_URL) {
    return mongoose.connect(MONGODB_URL);
}

export default connectToMongoDB;
