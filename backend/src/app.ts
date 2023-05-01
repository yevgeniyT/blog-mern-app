// import express server, and types
import express, { Application, Request, Response } from "express";

// import dependencies
import cors from "cors";
// import nodemon from "nodemon";
// import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// import cloudinary from "./config/setCloudinary";

//other components imports
import connectDB from "./config/db";
import dev from "./config";
import useRouter from "./routes/userRoutes";
import adminRouter from "./routes/adminRoutes";
import blogsRouter from "./routes/blogsRouters";

// use Application type from express
const app: Application = express();

//to use dependencies
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Server is running OK",
    });
});

app.use("/api/v1/users", useRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/blogs", blogsRouter);
const PORT = dev.app.serverPort;

app.listen(PORT, async () => {
    console.log("Server is OK");
    await connectDB();
});
