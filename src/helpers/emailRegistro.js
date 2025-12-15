import nodemailer from "nodemailer";

const emailRegistro = async ({ email, token }) => {
  try {
    const confirmUrl = `https://adm-clinica-frontend.vercel.app/confirmar/${token}`;

    // Transporter SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 587,
      secure: false,
      auth: {
        user: "noreply@sancodehub.com",
        pass: "Los3Mosqueteros.",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Envío de email
    const info = await transporter.sendMail({
      from: "Administrador de Pacientes <noreply@sancodehub.com>",
      to: email,
      replyTo: "soporte@sancodehub.com",
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

    console.log("📨 Email enviado correctamente:", info.messageId);
  } catch (error) {
    console.error("❌ Error al enviar el correo con SMTP:", error);
  }
};

export default emailRegistro;
