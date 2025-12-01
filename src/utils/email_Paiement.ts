import { sendEmail } from './email.routes'; // utilise ta fonction sendEmail existante

export const sendPaymentConfirmation = async ({
  to,
  amount,
  productName,
}: {
  to: string;
  amount: number;
  productName: string;
}) => {
  const subject = "Confirmation de votre paiement";
  const html = `
    <h2>Merci pour votre achat !</h2>
    <p>Vous venez de payer <strong>${amount} €</strong> pour <em>${productName}</em>.</p>
    <p>Votre commande est confirmée.</p>
  `;

  await sendEmail({ to, subject, html });
};
