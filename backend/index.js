import express, { request, response } from "express";
import { mongoDBURL, PORT } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default cors(*)
app.use(cors());

// Option 2: Allow Custom Origins
/*app.use(
    cors({
        origin: 'http://localhost:5002',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);*/

app.get('/', (request,response) => {
    console.log(request)
    return response.status(234).send('Welcome in DevOps')
});

app.use("/books", booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen (PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
