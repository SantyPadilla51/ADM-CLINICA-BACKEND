import nodemailer from "nodemailer";

const emailOlvidePassword = async ({ email, nombre, token }) => {
  try {
    const url = `https://adm-clinica-frontend.vercel.app/olvide-password/${token}`;

    // Transporter SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: process.env.SMTP_PORT == 465, // true si es 465
      auth: {
        user: "noreply@sancodehub.com",
        pass: "Los3Mosqueteros.",
      },
    });

    await transporter.sendMail({
      from: "Administrador de Pacientes <noreply@sancodehub.com>",
      to: email,
      replyTo: "soporte@sancodehub.com",
      subject: "Restablecer tu contraseña",
      html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb; padding: 40px 0; text-align: center;">
        <div style="background-color: #ffffff; max-width: 500px; margin: 0 auto; border-radius: 12px; padding: 30px 40px; box-shadow: 0 2px 10px rgba(0,0,0,0.08);">

          <h1 style="color: #111827; font-size: 24px;">¡Hola ${nombre}!</h1>

          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Recibimos una solicitud para restablecer tu contraseña en <strong>Administrador de Pacientes</strong>.<br/>
            Si fuiste tú, haz clic en el siguiente botón:
          </p>

          <a href="${url}"
            style="
              display: inline-block;
              background-color: #2563eb;
              color: #ffffff;
              text-decoration: none;
              padding: 12px 24px;
              border-radius: 8px;
              font-weight: bold;
              margin-top: 20px;">
            Restablecer contraseña
          </a>

          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            Si tú no solicitaste este cambio, ignora este mensaje. Tu contraseña seguirá siendo válida.
          </p>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

          <p style="color: #9ca3af; font-size: 13px;">
            — El equipo de <strong>Administrador de Pacientes</strong>
          </p>

        </div>
      </div>
      `,
    });

    console.log("📧 Email de restablecimiento enviado a:", email);
  } catch (error) {
    console.error("❌ Error enviando email con SMTP:", error);
  }
};

export default emailOlvidePassword;
