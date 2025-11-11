import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

export class Song extends Model<InferAttributes<Song>, InferCreationAttributes<Song>> {
  declare id: CreationOptional<number>;
  declare artist_id: number;
  declare album_id?: number;
  declare title: string;
  declare genre?: string;
  declare release_date?: string;
  declare cover_url?: string;
  declare duration?: number;
  declare audio_url?: string;

  static initModel(sequelize: Sequelize): typeof Song {
    Song.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        artist_id: { type: DataTypes.INTEGER, allowNull: false }, 
        album_id: { type: DataTypes.INTEGER, allowNull: true },   
        title: { type: DataTypes.STRING(50), allowNull: false },
        genre: { type: DataTypes.STRING(50), allowNull: true },
        release_date: { type: DataTypes.STRING(50), allowNull: true },
        cover_url: { type: DataTypes.TEXT, allowNull: true },
        duration: { type: DataTypes.INTEGER, allowNull: true },
        audio_url: { type: DataTypes.STRING, allowNull: true },
      },
      { sequelize, tableName: 'Song', modelName: 'Song', timestamps: true }
    );
    return Song;
  }
}
