import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import dns from "dns";

dotenv.config();
dns.setDefaultResultOrder("ipv4first");

const db = new Sequelize(
  "postgresql://postgres.hzapzfyxfsvaabpvvgis:Paulmccartney29@aws-0-us-east-1.pooler.supabase.com:5432/postgres",
  {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

try {
  await sequelize.authenticate();
  console.log("✅ ¡Conexión exitosa!");
} catch (err) {
  console.error("❌ Error al conectar:", err.message);
}

export default db;
