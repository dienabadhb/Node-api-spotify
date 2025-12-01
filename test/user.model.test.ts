import assert from 'assert';
import models from '../src/models';

describe('User model (sqlite::memory:)', () => {
  beforeEach(async () => {

    await models.sequelize.sync({ force: true, logging: false, alter: true });
  });

  it('creates and fetches a User', async () => {
  
    const created = await models.User.create({
      name: 'Vanella',
      surname: 'EFFA',
      pseudo: 'namverro',
      email: 'vanella@test.com',
      password: 'password123',
    });

    assert.ok(created.id! > 0);
    assert.equal(created.name, 'Vanella');
    assert.equal(created.surname, 'EFFA');
    assert.equal(created.pseudo, 'namverro');
    assert.equal(created.email, 'vanella@test.com');
    assert.equal(created.password, 'password123');


    const found = await models.User.findByPk(created.id);
    assert.ok(found);
    assert.equal(found!.id, created.id);
    assert.equal(found!.name, 'Vanella');
    assert.equal(found!.surname, 'EFFA');
    assert.equal(found!.pseudo, 'namverro');
    assert.equal(found!.email, 'vanella@test.com');
    assert.equal(found!.password, 'password123');
  });

  it('fails if email is invalid', async () => {
    let error: any = null;
    try {
      await models.User.create({
        name: 'Bob',
        surname: 'Martin',
        pseudo: 'BobM',
        email: 'invalid-email',
        password: 'password123',
      });
    } catch (err) {
      error = err;
    }
    assert.ok(error, 'Expected validation error');
    assert.ok(error.name === 'SequelizeValidationError', 'Expected SequelizeValidationError');
  });
});
