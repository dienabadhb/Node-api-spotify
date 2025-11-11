import assert from 'assert';
import models from '../src/models';

describe('Favorites model (sqlite::memory:)', () => {
  beforeEach(async () => {
    await models.sequelize.sync({ force: true, logging: false, alter: true });
  });

  it('creates and fetches a Favorite', async () => {
    
    const created = await models.Favorites.create({
      user_id: 1,
      song_id: 42,
    });

    assert.equal(created.user_id, 1);
    assert.equal(created.song_id, 42);

    const found = await models.Favorites.findOne({
      where: { user_id: 1, song_id: 42 },
    });

    assert.ok(found);
    assert.equal(found!.user_id, 1);
    assert.equal(found!.song_id, 42);
  });
});

