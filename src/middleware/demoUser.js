import { db } from "../config/db.js";
import Paciente from "../models/PacienteModels.js";

export const demoUser = async (req, res, next) => {
  const { email, id } = req.doctor;

  const DEMO_USER_EMAIL = "demo@docpanel.com";

  if (email === DEMO_USER_EMAIL) {
    // Usamos el modelo Paciente con count de Sequelize
    const contador = await Paciente.count({
      where: { doctorId: id }, // Ajusta 'doctorId' al nombre de tu columna FK
    });

    if (req.method === "POST" && contador >= 5) {
      return res.status(403).json({
        msg: "Límite del modo demo alcanzado. No puedes crear más de 5 pacientes.",
      });
    }
  }

  next();
};
