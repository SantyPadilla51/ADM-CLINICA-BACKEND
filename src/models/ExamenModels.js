import { Sequelize } from "sequelize";
import { db } from "../config/db.js";

const Examen = db.define("examenes", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descripcion: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  fecha: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  imagenUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  pacienteId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

export default Examen;
