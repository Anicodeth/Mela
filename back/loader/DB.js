import mongoose from "mongoose";
import config from '../config.js';

mongoose.connect(
    config.db.remote, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() =>{
    console.log("Database successfully connected");
}).catch((err)=>{
    console.log('Error while connecting to database');
});

const db_conn = mongoose.connection;

db_conn.on("error", (err) => {
    console.log(`Error while connecting to DB`);
    console.error(err);
});

db_conn.on("disconnected", () => {
    console.log(`DB is disconnected`);
});

export default db_conn;
