import mongoose from "mongoose";
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
dotenv.config()

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' })); // setting up limit of data that we can send to the server

app.get('/', (req, res, next) => {
    res.status(200).json({ message: "Hello from DALL.E" });
});

app.listen(8888, () => {
    console.log("Server is running on port 8888")
})