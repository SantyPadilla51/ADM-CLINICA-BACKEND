import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./routes/PacientesRouter.js";
import routerDoc from "./routes/DoctorRouter.js";
import routerTurno from "./routes/TurnosRouter.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: [
      "https://adm-clinica-frontend.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  }),
);

app.use(express.json());

const iniciarServer = async () => {
  await connectDB();

  app.use(router);
  app.use(routerDoc);
  app.use(routerTurno);

  const PORT = process.env.PORT || 8080;
  const HOST = "0.0.0.0";

  app.listen(Number(PORT), HOST, () => {
    console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
  });
};

iniciarServer();
