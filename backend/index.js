import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js"

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // ✅ Fixed the typo
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectDB(); // ✅ Wait for DB Connection before starting server
  console.log(`Server running on port ${PORT}`);
});
