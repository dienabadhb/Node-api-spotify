import express, { Application, Request, Response } from 'express';
import models from './models';
import {emailRoute} from "./routes/email.routes"; // ← import

export const app: Application = express();
const PORT: number = 3005;

app.use(express.json());

import newsletterRoute from "./routes/newsletter.routes";
app.use("/api/newsletter", newsletterRoute);


// Monte la route email
app.use("/api/email", emailRoute);

// Initialize SQLite + Sequelize
const inTest = process.env.NODE_ENV === 'test';
const { sequelize } = models;
sequelize.sync().then(() => {
  console.log('Database synchronized');
}).catch((err) => {
  console.error('Database sync error:', err);
});

app.get('/', (_: Request, res: Response) => {
  res.send('Hello, TypeScript + Express!');
});

app.post('/song', async (req: Request, res: Response) => {
  console.info('Received artist creation request:', req.body);
  const created = await models.Song.create(req.body);
  res.status(201).json({ created });
});

// Only start server when not under test
if (!inTest) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}




