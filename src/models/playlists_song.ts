import {Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes} from 'sequelize';
import { Playlists } from './playlists';
import { Song } from './song';

export class Playlists_song extends Model<
  InferAttributes<Playlists_song>,
  InferCreationAttributes<Playlists_song>
> {
  declare playlist_id: number;
  declare song_id: number;
  declare added_at: Date;

  static initModel(sequelize: Sequelize): typeof Playlists_song {
    Playlists_song.init(
      {
        playlist_id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true,},
        song_id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true,},
        added_at: {type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW,},},
      {
        sequelize,
        tableName: 'playlists_song',
        modelName: 'Playlists_song',
        timestamps: false,
      }
    );
    return Playlists_song;
  }

  static associate(): void {
    Playlists_song.belongsTo(Playlists, { foreignKey: 'playlist_id' });
    Playlists_song.belongsTo(Song, { foreignKey: 'song_id' });
  }
}
