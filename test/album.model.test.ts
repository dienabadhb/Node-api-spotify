import assert from 'assert';
import models from '../src/models';

describe('Album model (sqlite::memory:)', () => {
  beforeEach(async () => {
    
    await models.sequelize.sync({ force: true, logging: false, alter: true });
  });

  it('creates and fetches an Album', async () => {
    
    const created = await models.Album.create({
      artist_id: 'bouss123',
      type: 'Studio',
      album_name: 'Premier Album',
      genre: 'Rap',
      release_date: '2025-05-30',
      cover_url: 'https://example.com/cover.jpg',
    });

    
    assert.ok(created.id! > 0);
    assert.equal(created.artist_id, 'bouss123');
    assert.equal(created.type, 'Studio');
    assert.equal(created.album_name, 'Premier Album');
    assert.equal(created.genre, 'Rap');
    assert.equal(created.release_date, '2025-05-30');
    assert.equal(created.cover_url, 'https://example.com/cover.jpg');


    const found = await models.Album.findByPk(created.id);
    assert.ok(found);
    assert.equal(found!.id, created.id);
    assert.equal(found!.artist_id, 'bouss123');
    assert.equal(found!.type, 'Studio');
    assert.equal(found!.album_name, 'Premier Album');
    assert.equal(found!.genre, 'Rap');
    assert.equal(found!.release_date, '2025-05-30');
    assert.equal(found!.cover_url, 'https://example.com/cover.jpg');
  });
});
