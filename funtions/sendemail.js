const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Método no permitido' };
  }

  const { name, email } = JSON.parse(event.body);

  // Configuración del transporte de correo
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Configuración del correo
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Gracias por registrarte',
    text: `Hola ${name}, gracias por registrarte.`,
    attachments: [
      {
        filename: 'Como impulsar tu negocio.pdf',
        path: '/assets/docs/Como impulsar tu negocio en internet', // Ruta del archivo a adjuntar
        contentType: 'application/pdf',
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    return { statusCode: 200, body: 'Correo enviado con éxito' };
  } catch (error) {
    return { statusCode: 500, body: `Error al enviar el correo: ${error.message}` };
  }
};
