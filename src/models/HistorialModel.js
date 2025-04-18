import { Sequelize } from "sequelize";
import db from "../config/db.js";

const Historial = db.define("historiales", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  motivo: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  fecha: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  diagnostico: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  tratamiento: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  idPaciente: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

export default Historial;
