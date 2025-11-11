import assert from 'assert';
import models from '../src/models';

describe('Playlists_song model (sqlite::memory:)', () => {
  beforeEach(async () => {
   
    await models.sequelize.sync({ force: true, logging: false, alter: true });
  });

  it('creates and fetches a Playlists_song entry', async () => {
    
    const user = await models.User.create({
      name: 'Vanella',
      surname: 'EFFA',
      pseudo: 'namverro',
      email: 'vanella@test.com',
      password: 'password123',
    });

    
    const playlist = await models.Playlists.create({
      name: 'My Playlist',
      description: 'Playlist de test',
      user_id: user.id,      
      created_at: new Date(), 
    });

    
    const song = await models.Song.create({
      artist_id: 123,
      album_id: 123,
      title: 'Biff pas d\'love',
      genre: 'Rap',
      release_date: '2025-05-30',
      cover_url: 'https://i.scdn.co/image/ab67616d00001e02d095d0a1566f379723c5ec3b',
      duration: 200,
      audio_url:'https://open.spotify.com/intl-fr/track/4R0HXKZBeDJerIq9oCnDIp?si=dd5f066e4f574efc',
    });

    
    const created = await models.Playlists_song.create({
      playlist_id: playlist.id,
      song_id: song.id,
      added_at: new Date('2025-10-31T12:00:00Z'),
    });

    assert.ok(created.playlist_id > 0);
    assert.ok(created.song_id > 0);
    assert.equal(
      created.added_at.toISOString(),
      new Date('2025-10-31T12:00:00Z').toISOString()
    );

  
    const found = await models.Playlists_song.findOne({
      where: { playlist_id: playlist.id, song_id: song.id },
    });
    assert.ok(found);
    assert.equal(found!.playlist_id, playlist.id);
    assert.equal(found!.song_id, song.id);
    assert.equal(
      found!.added_at.toISOString(),
      new Date('2025-10-31T12:00:00Z').toISOString()
    );
  });
});
