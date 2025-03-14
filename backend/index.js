import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/jobs.route.js";
import applicantRoute from "./routes/application.route.js";
import path from "path";
import { fileURLToPath } from "url"; // ✅ Fix for __dirname in ES modules

dotenv.config();

const app = express();

// ✅ Correct way to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.get("/home", (req, res) => {
  return res.status(200).json({
    message: "Welcome to home page",
    success: true,
  });
});

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicantRoute);

// ✅ Fix for serving static files
app.use(express.static(path.join(__dirname, "../frontend/job-portal/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/job-portal/dist","index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectDB(); // ✅ Ensures DB connection before server starts
  console.log(`Server running on port ${PORT}`);
});
