import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import  "./lib/TaskScheduler.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api", userRoutes);
app.use("/api", taskRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, async () => {
  await connectDb();
  console.log("Server started on port:", PORT);
});