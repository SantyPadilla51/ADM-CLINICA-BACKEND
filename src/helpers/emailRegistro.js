// emailRegistro.js
import { Resend } from "resend";

const resend = new Resend("re_8QPoTvTb_48tYNPYtqVxaYn4sAKEy9Ara");

const { data, error } = await resend.apiKeys.create({
  name: "Production",
  permission: "full_access",
});

const emailRegistro = async ({ email, token }) => {
  try {
    const confirmUrl = `https://adm-clinica-frontend.vercel.app/confirmar/${token}`;

    const response = await resend.emails.send({
      from: "Administrador de Pacientes <test@sancodehub.com>",
      to: email,
      subject: "Confirma tu cuenta",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color:#333">Bienvenido/a a Administrador de Pacientes</h2>
          <p>Tu cuenta ya está casi lista. Haz clic en el siguiente botón para confirmarla:</p>

          <a href="${confirmUrl}" 
             style="
                display:inline-block; 
                margin-top:20px; 
                padding:12px 20px;
                background:#4CAF50; 
                color:white; 
                text-decoration:none; 
                border-radius:6px;">
            Confirmar Cuenta
          </a>

          <p style="margin-top:30px;">
            Si no creaste esta cuenta, simplemente ignora este correo.
          </p>
        </div>
      `,
    });

    console.log("📨 Email enviado correctamente:", response);
  } catch (error) {
    console.error("❌ Error al enviar el correo con Resend:", error);
  }
};

export default emailRegistro;
