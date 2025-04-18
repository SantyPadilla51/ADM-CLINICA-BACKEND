import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import router from "./routes/PacientesRouter.js"
import routerDoc from "./routes/DoctorRouter.js"


dotenv.config()
const app = express()

app.use(cors({
    origin: ["https://adm-clinica-frontend.vercel.app", "http://localhost:5173"],
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json())

const iniciarServer = async () => {
    await connectDB();

    app.use(router);
    app.use(routerDoc);

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Conectado al puerto: ${PORT}`);
    });
};

iniciarServer();
