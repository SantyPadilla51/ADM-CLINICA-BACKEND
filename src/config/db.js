import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  define: {
    timestamps: false,
  },
  //   dialectOptions: {
  //     ssl: {
  //       require: true,
  //       rejectUnauthorized: false, // esto es importante para Supabase
  //     },
  //   },
});

export const connectDB = async () => {
  try {
    await db.authenticate();
    console.log("Conectado a la Base de Datos");
  } catch (error) {
    console.error("No se pudo conectar a la Base de Datos:", error);
  }
};

export default db;
