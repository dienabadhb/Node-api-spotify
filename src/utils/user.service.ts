 // ou ton ORM / DB connection
// Si tu utilises SQLite + better-sqlite3, adapte ici

export const updateUserPremiumStatus = async (userId: number, isPremium: boolean) => {
  // Exemple SQL simple si tu utilises SQLite sans ORM
  const db = require("../db"); // adapter selon ton fichier DB
  await db.run(
    `UPDATE user SET is_premium = ? WHERE id = ?`,
    [isPremium ? 1 : 0, userId]
  );
};
