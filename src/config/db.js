import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import dns from "dns";

dotenv.config();
dns.setDefaultResultOrder("ipv4first");

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
    console.log("✅ Conectado a la Base de Datos");
  } catch (error) {
    console.error("❌ No se pudo conectar a la Base de Datos:");

    // 1. Mensaje general
    console.error("Mensaje:", error.message);

    // 2. Stack trace
    console.error("Stack:", error.stack);

    // 3. Detalles adicionales (propios de Sequelize / Node.js)
    if (error.parent) {
      console.error("Código:", error.parent.code);
      console.error("Errno:", error.parent.errno);
      console.error("Syscall:", error.parent.syscall);
      console.error("Dirección:", error.parent.address);
      console.error("Puerto:", error.parent.port);
    }

    // 4. Como último recurso, mostrar el objeto entero
    console.error("Error completo:", error);
  }
};

export default db;
