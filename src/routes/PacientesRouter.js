import Router from "express";
import {
  obtenerPaciente,
  obtenerPacientes,
  actualizarPaciente,
  eliminarPaciente,
  crearPaciente,
  obtenerPacienteID,
  obtenerHistorial,
  crearHistorial,
  eliminarHistorial,
  crearExamen,
  obtenerExamenes,
  eliminarExamen,
} from "../controllers/PacienteController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { demoUser } from "../middleware/demoUser.js";

const router = Router();

router.post("/crear-paciente", authMiddleware, demoUser, crearPaciente);
router.get("/pacientes", authMiddleware, obtenerPacientes);
router.get("/pacientes/:dni", authMiddleware, obtenerPaciente);
router.get("/pacienteId/:id", authMiddleware, obtenerPacienteID);
router.put("/actualizar-paciente/:id", authMiddleware, actualizarPaciente);
router.delete("/eliminar-paciente/:id", authMiddleware, eliminarPaciente);
router.get("/pacientes/historial/:id", authMiddleware, obtenerHistorial);
router.post("/pacientes/historial/:id", authMiddleware, crearHistorial);
router.delete("/pacientes/historial/:id", authMiddleware, eliminarHistorial);
router.post("/pacientes/examenes/:id", authMiddleware, crearExamen);
router.delete("/pacientes/examenes/:id", authMiddleware, eliminarExamen);
router.get("/pacientes/examenes/:id", authMiddleware, obtenerExamenes);

export default router;
