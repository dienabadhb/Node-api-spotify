import assert from 'assert';
import models from '../src/models';

describe('Listening_history model (sqlite::memory:)', () => {
  beforeEach(async () => {
    await models.sequelize.sync({ force: true, logging: false, alter: true });
  });

  it('creates and fetches a Listening_history entry', async () => {
    const user = await models.User.create({
      name: 'Alice',
      surname: 'Dupont',
      pseudo: 'AliD',
      email: 'alice@test.com',
      password: 'password123',
    })
    
    const artist = await models.Artist.create({
      id: 1,
      name: 'Artiste1',
      bio: 'bio',
      country: 'FR',
      album_id: 1,
    });

    const song = await models.Song.create({
      id: 42,
      title: 'My Song',
      artist_id: artist.id,     
    });

   
    const created = await models.Listening_history.create({
      user_id: user.id,
      song_id: song.id,
      played_at: new Date('2025-10-31T12:00:00Z'),
    });

  
    assert.ok(created.history_id! > 0);
    assert.equal(created.user_id, user.id);
    assert.equal(created.song_id, song.id);
    assert.equal(
      created.played_at.toISOString(),
      new Date('2025-10-31T12:00:00Z').toISOString()
    );

    
    const found = await models.Listening_history.findByPk(created.history_id);
    assert.ok(found);
    assert.equal(found!.history_id, created.history_id);
    assert.equal(found!.user_id, user.id);
    assert.equal(found!.song_id, song.id);
    assert.equal(
      found!.played_at.toISOString(),
      new Date('2025-10-31T12:00:00Z').toISOString()
    );
  });
});
