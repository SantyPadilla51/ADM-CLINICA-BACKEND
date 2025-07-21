import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(
  "postgresql://postgres:Paulmccartney29@db.hzapzfyxfsvaabpvvgis.supabase.co:5432/postgres",
  {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    define: {
      timestamps: false,
    },
  }
);

export const connectDB = async () => {
  try {
    await db.authenticate();
    console.log("Conectado a la Base de Datos");
  } catch (error) {
    console.error("No se pudo conectar a la Base de Datos:", error.message);
  }
};

export default db;
