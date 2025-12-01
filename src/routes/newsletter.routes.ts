// src/routes/newsletter.routes.ts
import { Router } from "express";
import { sendEmail } from "./email.routes";
const router = Router();

router.post("/send", async (req, res) => {
  const { emails, subject, message } = req.body as { emails: string[]; subject: string; message: string };

  if (!emails || !subject || !message) {
    return res.status(400).json({ success: false, error: "Tous les champs sont requis" });
  }

  try {
    for (const email of emails) {
      await sendEmail({ to: email, subject, html: `<p>${message}</p>` });
    }
    res.json({ success: true, message: "Newsletter envoyée !" });
  } catch (err) {
    console.error("Erreur newsletter:", err);
    res.status(500).json({ success: false, error: "Erreur lors de l'envoi" });
  }
});

export default router;
