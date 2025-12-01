// src/routes/email.routes.ts
import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

// Fonction sendEmail utilisant les variables d'environnement Mailtrap
export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    html,
  });
};

// Route POST /send
router.post("/send", async (req, res) => {
  const { to, subject, message } = req.body as {
    to?: string;
    subject?: string;
    message?: string;
  };

  // Vérification pour éviter les undefined
  if (!to || !subject || !message) {
    return res
      .status(400)
      .json({ success: false, error: "to, subject et message sont requis" });
  }

  try {
    await sendEmail({ to, subject, html: `<p>${message}</p>` });
    res.json({ success: true, message: "Email envoyé !" });
  } catch (err) {
    console.error("Erreur sendEmail:", err);
    res
      .status(500)
      .json({ success: false, error: "Erreur lors de l'envoi de l'email" });
  }
});

export default router;
