import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import goalsRouter from "./routes/goals.route.js";
import cardRouter from "./routes/card.route.js";
import columnRouter from "./routes/column.route.js";
import dashboardRouter from "./routes/dashboard.route.js";
import userRouter from "./routes/user.route.js";
import "./firebaseConfig.js";

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@gotitcluster.vv8smn1.mongodb.net/?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRouter);
app.use('/api/goals', goalsRouter);
app.use('/api/card', cardRouter);
app.use('/api/column', columnRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/user', userRouter);
// app.use("/api/statistic", statisticRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
