import assert from 'assert';
import models from '../src/models';

// Use the default DB (in-memory under NODE_ENV=test)

describe('Artist model (sqlite::memory:)', () => {
  beforeEach(async () => {
    await models.sequelize.sync({ force: true, logging: false, alter: true });
  });

  it('creates and fetches a Song', async () => {
    // DB is synced in beforeEach
    const created = await models.Song.create({
      artist_id: 'Bouss',
      album_id: 'Et si j\échoue ??',
      title: 'Biff pas d\'love',
      genre: 'Rap français',
      release_date: '30-05-2025',
      cover_url: 'https://i.scdn.co/image/ab67616d00001e02d095d0a1566f379723c5ec3b',
      duration: 154,
      audio_url: 'https://open.spotify.com/intl-fr/track/4R0HXKZBeDJerIq9oCnDIp?si=dd5f066e4f574efc'
    });
    assert.ok(created.id > 0);

    const found = await models.Song.findByPk(created.id);
    assert.ok(found);
    assert.equal(found!.artist_id, 'Bouss');
    assert.equal(found!.album_id, 'Et si j\échoue ??');
    assert.equal(found!.title, 'Biff pas d\'love');
    assert.equal(found!.genre, 'Rap français');
    assert.equal(found!.release_date, '30-05-2025');
    assert.equal(found!.cover_url, 'https://i.scdn.co/image/ab67616d00001e02d095d0a1566f379723c5ec3b');
    assert.equal(found!.duration, 154);
    assert.equal(found!.audio_url, 'https://open.spotify.com/intl-fr/track/4R0HXKZBeDJerIq9oCnDIp?si=dd5f066e4f574efc');

  });

  // it('updates and deletes a user', async () => {
  //   // DB is synced in beforeEach

  //   const u = await models.User.create({ name: 'Linus', email: 'linus@example.org' });
  //   assert.ok(u.id > 0);

  //   // Update name and email
  //   await models.User.update({ name: 'Linus T', email: 'linus.t@example.org' }, { where: { id: u.id } });
  //   const updated = await models.User.findByPk(u.id);
  //   assert.ok(updated);
  //   assert.equal(updated!.name, 'Linus T');
  //   assert.equal(updated!.email, 'linus.t@example.org');

  //   // Delete and verify
  //   await models.User.destroy({ where: { id: u.id } });
  //   const deleted = await models.User.findByPk(u.id);
  //   assert.equal(deleted, null);

  //   const count = await models.User.count();
  //   assert.equal(count, 0);
  // });
});
