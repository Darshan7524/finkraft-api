import express from "express";
import mongoose from "mongoose";
import { PORT,mongoDBURL } from "./config.js";
import csv from "csvtojson";
import transactRoute from "./routes/transactRoute.js";
import uploadCsvRouter from "./routes/uploadcsvRouter.js"
import cors from 'cors';
import multer from "multer";
import bodyParser from "body-parser";
import dotenv from 'dotenv/config';
var upload = multer({ dest: 'uploads/' });

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
   return res.status(200).send('<h1>Finkraft API</h1>') 
});


app.use('/upload-csv', uploadCsvRouter);
app.use('/transact', transactRoute);


mongoose
 .connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
 .then(() => {
  console.log('App connected to database');
  app.listen(PORT, () => {
    console.log(`App is listening to port : ${PORT}`);
});
 })
 .catch((error) => {
  console.log(error ,"unable to connect to database");
 });  

