import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  crearTurno,
  editarTurno,
  eliminarTurno,
  obtenerTurnos,
} from "../controllers/TurnoControllers.js";

const routerTurno = Router();

routerTurno.post("/crear-turno", authMiddleware, crearTurno);
routerTurno.get("/turnos", authMiddleware, obtenerTurnos);
routerTurno.put("/turnos/:id", authMiddleware, editarTurno);
routerTurno.delete("/eliminar-turno/:id", authMiddleware, eliminarTurno);

export default routerTurno;
