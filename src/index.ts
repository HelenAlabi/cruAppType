// import express from "express";
// import mongoose from "mongoose";
// import router from "./routes";

// const app = express();
// app.use(express.json());

// const MONGO_URL = "mongodb://127.0.0.1:27017";
// mongoose.connect(MONGO_URL, {
//     dbName :"cruApptypes"
// })
//    .then(()=>{
//         console.log("DataBase Connected");
//     })
//     .catch((error)=>console.log(error));

//     app.use("/", router);


// app.listen(4000, ()=>{
//     console.log("server running on http://localhost:4000");

// });


import express from "express";
import mongoose from "mongoose";
import router from "./routes";

import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());


const MONGO_URL = process.env.MONGO_URL as string;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Database Connected");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};


connectToDatabase();

const port = process.env.PORT || 3000;

app.use("/", router);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});



// import express from 'express';
// import mongoose from 'mongoose';
// import router from './routes';
// import dotenv from 'dotenv';

// // Load environment variables early
// dotenv.config();

// const app = express();
// app.use(express.json());

// // Ensure MONGO_URL is defined
// const MONGO_URL = process.env.MONGO_URL as string;
// if (!MONGO_URL) {
//     throw new Error('MONGO_URL is not defined in the environment variables.');
// }

// const connectToDatabase = async () => {
//     try {
//         await mongoose.connect(MONGO_URL);
//         console.log('Database Connected');
//     } catch (error) {
//         console.error('Database connection error:', error);
//     }
// };

// connectToDatabase();

// const port = process.env.PORT || 3000;

// app.use('/', router);

// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });

 