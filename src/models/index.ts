import path from 'node:path';
import { Sequelize } from 'sequelize';
import { User } from './user';
import { Artist } from './artist';
import { Album } from './album';
import { Playlists } from './playlists';
import { Playlists_song} from './playlists_song';
import { Listening_history } from './listening_history';
import { Favorites } from './favorites';
import { Song } from './song';



export interface Database {
  sequelize: Sequelize;
  models: {
    User: typeof User;
    Artist: typeof Artist;
    Album: typeof Album;
    Playlists: typeof Playlists;
    Playlists_song: typeof Playlists_song;
    Listening_history: typeof Listening_history;
    Favorites: typeof Favorites;
    Song: typeof Song;
   
  };
}

export type DbOptions = {
  storage?: string;
  logging?: boolean | ((sql: string) => void);
  inMemory?: boolean;
};

export function createDatabase(opts: DbOptions = {}): Database {
  let database = '../../data-development.sqlite'
  if (process.env.NODE_ENV === 'prod') {
    database = '../../data-development.sqlite'
  }

  const storage = opts.inMemory
    ? ':memory:'
    : opts.storage ?? path.resolve(__dirname, database);

  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage,
    logging: opts.logging ?? false,
  });

  // Init models
  User.initModel(sequelize);
  Artist.initModel(sequelize);
  Playlists.initModel(sequelize);
  Playlists_song.initModel(sequelize);
  Album.initModel(sequelize);
  Listening_history.initModel(sequelize);
  Favorites.initModel(sequelize);
  Song.initModel(sequelize);


  return {
    sequelize,
    models: { User, Artist, Album, Playlists,Playlists_song, Song, Listening_history, Favorites},
  };
}

export type { User, Artist, Album, Playlists, Playlists_song, Song, Listening_history, Favorites };

// Default database instance
// - Uses in-memory SQLite under test to keep tests isolated and fast
// - Disables logging by default to reduce noise
const _defaultDb = createDatabase({
  inMemory: process.env.NODE_ENV === 'test',
  logging: false,
});

// Flatten models on the default export to allow `models.sequelize` and `models.User`
const defaultExport = {
  sequelize: _defaultDb.sequelize,
  ..._defaultDb.models,
};

export default defaultExport;
