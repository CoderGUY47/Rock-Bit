import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Basic health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "Rock-Bit Crypto API",
  });
});

app.listen(PORT, () => {
  console.log(
    `[server]: Rock-Bit Crypto Backend is running at http://localhost:${PORT}`,
  );
});
