import request from 'supertest';
import express from 'express';
import { expect } from 'chai';
import newsletterRoute from '../src/routes/newsletter.routes';
import * as emailModule from '../src/routes/email.routes'; // pour mocker sendEmail

// Mock de sendEmail pour éviter d'envoyer de vrais emails
before(() => {
  (emailModule.sendEmail as any) = async () => Promise.resolve();
});

describe('Newsletter API', () => {
  const app = express();
  app.use(express.json());
  app.use('/api/newsletter', newsletterRoute);

  it('envoie une newsletter', async () => {
    const response = await request(app)
      .post('/api/newsletter/send')
      .send({
        emails: ['test1@example.com', 'test2@example.com'],
        subject: 'Hello!',
        message: 'Ceci est un test newsletter'
      });

    expect(response.status).to.equal(200);
    expect(response.body.success).to.equal(true);
    expect(response.body.message).to.equal('Newsletter envoyée !');
  });

  it('retourne 400 si un champ est manquant', async () => {
    const response = await request(app)
      .post('/api/newsletter/send')
      .send({
        emails: ['test@example.com'],
        subject: '', // champ vide
        message: 'Test'
      });

    expect(response.status).to.equal(400);
    expect(response.body.success).to.equal(false);
    expect(response.body.error).to.equal('Tous les champs sont requis');
  });
});
