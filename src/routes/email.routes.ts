import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

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

router.post("/send", async (req, res) => {
  const { to, subject, message } = req.body as {
    to?: string;
    subject?: string;
    message?: string;
  };

  if (!to || !subject || !message) {
    return res.status(400).json({ success: false, error: "to, subject et message sont requis" });
  }

  try {
    await sendEmail({ to, subject, html: `<p>${message}</p>` });
    res.json({ success: true, message: "Email envoyé !" });
  } catch (err) {
    console.error("Erreur sendEmail:", err);
    res.status(500).json({ success: false, error: "Erreur lors de l'envoi de l'email" });
  }
});

// ⚠️ Export nommé
export { router as emailRoute };
