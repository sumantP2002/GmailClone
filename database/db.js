import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();



const Connection = () => {
    const DB_URI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ac-bocuzot-shard-00-00.lhmhtye.mongodb.net:27017,ac-bocuzot-shard-00-01.lhmhtye.mongodb.net:27017,ac-bocuzot-shard-00-02.lhmhtye.mongodb.net:27017/?ssl=true&replicaSet=atlas-x3sgln-shard-0&authSource=admin&retryWrites=true&w=majority`
    try{
        mongoose.connect(DB_URI , { useNewUrlParser: true});
        mongoose.set('strictQuery', false);
        console.log('DataBase Connected Successfully');
    } catch(error){
        console.log('Error while connectiong with the database' , error.message);
    }
}

export default Connection;