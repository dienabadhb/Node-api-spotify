import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

export class Song extends Model<InferAttributes<Song>, InferCreationAttributes<Song>> {
  declare id: CreationOptional<number>;
  declare artist_id: string;
  declare album_id: string;
  declare title: string;
  declare genre: string;
  declare release_date: string;
  declare cover_url: string;
  declare duration: number;
  declare audio_url: number

  static initModel(sequelize: Sequelize): typeof Song {
    Song.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        artist_id: { type: DataTypes.STRING(120), allowNull: false },
        album_id: { type: DataTypes.STRING(50), allowNull: false },
        title: { type: DataTypes.STRING(50), allowNull: false },
        genre: { type: DataTypes.STRING(50), allowNull: false },
        release_date: { type: DataTypes.STRING(50), allowNull: false },
        cover_url: { type: DataTypes.TEXT, allowNull: false },
        duration: { type: DataTypes.INTEGER, allowNull: false },
        audio_url: { type: DataTypes.INTEGER, allowNull: false },

      },
      { sequelize, tableName: 'Song', modelName: `Song`, timestamps: true }
    );
    return Song;
  }
}
