import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./routes/PacientesRouter.js";
import routerDoc from "./routes/DoctorRouter.js";
import serverless from "serverless-http";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: [
      "https://adm-clinica-frontend.vercel.app",
      "http://localhost:5173",
    ],
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

await connectDB();

app.use("/api", router);
app.use("/api", routerDoc);

const handler = serverless(app);

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
