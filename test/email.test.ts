import request from 'supertest';
import express from 'express';
import { expect } from 'chai'; 
import emailRoute from '../src/utils/email.routes';


const app = express();
app.use(express.json());
app.use('/api/email', emailRoute);

describe('API Email', () => {
  it('envoie un email via POST /api/email/send', async () => {
    const response = await request(app)
      .post('/api/email/send')
      .send({
        to: 'test@example.com',
        subject: 'Test',
        message: 'Ceci est un test'
      });

    expect(response.status).to.equal(200);
    expect(response.body.success).to.equal(true);
    expect(response.body.message).to.equal('Email envoyé !');
  });

  it('retourne 400 si il manque un champ', async () => {
    const response = await request(app)
      .post('/api/email/send')
      .send({
        to: 'test@example.com', // subject et message manquants
      });

    expect(response.status).to.equal(400);
    expect(response.body.success).to.equal(false);
  });
});


