import request from 'supertest';
import assert from 'assert';
import { app } from '../src/app';

describe('App functional tests', () => {
  it('GET / should return greeting', async () => {
    const res = await request(app).get('/');
    assert.equal(res.status, 200);
    assert.ok(res.text.includes('Hello, TypeScript + Express!'));
  });

  it('POST /song should create an song', async () => {
    const songData = {
      artist_id: 'Bouss',
              
              album_id:'Et si j\échoue ??' ,
              title:'Biff pas d\'love' ,
              genre:'Rap français',
              release_date:'30-05-2025',
              cover_url:'https://i.scdn.co/image/ab67616d00001e02d095d0a1566f379723c5ec3b' ,
              duration:154 ,
              audio_url:'https://open.spotify.com/intl-fr/track/4R0HXKZBeDJerIq9oCnDIp?si=dd5f066e4f574efc',
    };

    const res = await request(app)
      .post('/song')
      .send(songData)
      .set('Accept', 'application/json');

    assert.equal(res.status, 201);
    assert.ok(res.body.created);
    assert.equal(res.body.created.artist_id, songData.artist_id)
    assert.equal(res.body.created.album_id, songData.album_id);
    assert.equal(res.body.created.title, songData.title);
    assert.equal(res.body.created.genre, songData.genre);
    assert.equal(res.body.created.release_date, songData.release_date);
    assert.equal(res.body.created.cover_url, songData.cover_url);
    assert.equal(res.body.created.duration, songData.duration);
    assert.equal(res.body.created.audio_url, songData.audio_url);
  });
});
