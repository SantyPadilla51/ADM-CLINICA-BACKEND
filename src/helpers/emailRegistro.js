import nodemailer from "nodemailer";

const emailRegistro = async ({ email, nombre, token }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: "padillasantiago51@gmail.com",
        pass: "qoxd puwy zofi zdzf",
      },
    });

    const info = await transporter.sendMail({
      from: '"Administrador de Pacientes" <padillasantiago51@gmail.com>',
      to: email,
      subject: "Registro de usuario",
      text: "Comprueba tu cuenta",
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb; padding: 40px 0; text-align: center;">
        <div style="background-color: #ffffff; max-width: 500px; margin: 0 auto; border-radius: 12px; padding: 30px 40px; box-shadow: 0 2px 10px rgba(0,0,0,0.08);">
        <h1 style="color: #111827; font-size: 24px;">¡Hola ${nombre}!</h1>
        <p style="color: #374151; font-size: 16px; line-height: 1.6;">
        Gracias por registrarte en <strong>Administrador de Pacientes</strong>.<br/>
        Por favor, confirma tu cuenta haciendo clic en el siguiente botón:
        </p>
        <a href="https://adm-clinica-frontend.vercel.app/confirmar-cuenta/${token}"
        style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; margin-top: 20px;">
        Confirmar mi cuenta
        </a>
        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
        Si tú no creaste esta cuenta, puedes ignorar este mensaje.
        </p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        <p style="color: #9ca3af; font-size: 13px;">— El equipo de <strong>Administrador de Pacientes</strong></p>
        </div>
        </div>
      `,
    });

    console.log("Correo enviado correctamente:", info.messageId);
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
};

export default emailRegistro;
