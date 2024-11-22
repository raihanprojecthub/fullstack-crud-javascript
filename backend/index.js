import express from "express";
import cors from "cors";
import UserRouter from "./routes/UserRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRouter);
app.use('/uploads', express.static('uploads'));

app.listen(5000, ()=> console.log('Server up and running...'));

