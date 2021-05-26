import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userTypeRoutes from './Routes/userRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

app.use(userTypeRoutes);

const connect__url = "mongodb+srv://github:user1234@cluster0.jsmuf.mongodb.net/User?retryWrites=true&w=majority"

mongoose.connect(connect__url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });



app.listen(PORT, () => console.log(`server running on port${PORT}`))
