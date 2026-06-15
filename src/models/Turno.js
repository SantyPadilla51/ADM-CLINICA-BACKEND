import { Sequelize } from "sequelize";
import { db } from "../config/db.js";
import Doctor from "./DoctorModels.js";

const Turno = db.define(
  "turnos",
  {
    paciente: { type: Sequelize.TEXT, allowNull: false },
    hora: { type: Sequelize.TEXT, allowNull: false },
    min: { type: Sequelize.TEXT, allowNull: false },
    dia: { type: Sequelize.TEXT, allowNull: false },
    mes: { type: Sequelize.TEXT, allowNull: false },
    anio: { type: Sequelize.TEXT, allowNull: false },
    estado: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: "Pendiente",
    },
    doctorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Doctor,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  },
);

export default Turno;
