import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({ to, subject, html }: EmailOptions) => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error("EMAIL_USER et EMAIL_PASS doivent être définis dans .env");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io", 
    port: 587,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Mon App" <${user}>`,
    to,
    subject,
    html,
  });
};