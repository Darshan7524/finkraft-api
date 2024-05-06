import express from "express";
import mongoose from "mongoose";
import { PORT,mongoDBURL } from "./config.js";
// import uploadCsvRouter from "./routes/uploadcsvRouter.js";
import transactRoute from "./routes/transactRoute.js";
import uploadCsvRouter from "./routes/uploadcsvRouter.js"
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
   return res.status(200).send('<h1>Finkraft API</h1>') 
});
app.use('/upload-csv', uploadCsvRouter);
app.use('/transact', transactRoute);
mongoose
 .connect(mongoDBURL,{
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

