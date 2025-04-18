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
  obtenerExamenes,
} from "../controllers/PacienteController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.post("/crear-paciente", authMiddleware, crearPaciente);

router.get("/pacientes", authMiddleware, obtenerPacientes);

router.get("/pacientes/:dni", authMiddleware, obtenerPaciente);

router.get("/pacienteId/:id", authMiddleware, obtenerPacienteID);

router.put("/actualizar-paciente/:id", authMiddleware, actualizarPaciente);

router.delete("/eliminar-paciente/:id", authMiddleware, eliminarPaciente);

router.get("/pacientes/historial/:id", authMiddleware, obtenerHistorial);

router.post("/pacientes/historial", authMiddleware, crearHistorial);

router.delete("/pacientes/historial/:id", authMiddleware, eliminarHistorial);

router.get("/pacientes/examenes/:id", authMiddleware, obtenerExamenes);

export default router;
