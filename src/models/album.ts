import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

export class Album extends Model<InferAttributes<Album>, InferCreationAttributes<Album>> {
  declare id: CreationOptional<number>;
  declare artist_id: string;
  declare type: string;
  declare album_name: string;
  declare genre: string;
  declare release_date: string;
  declare cover_url: string;

  static initModel(sequelize: Sequelize): typeof Album {
    Album.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        artist_id: { type: DataTypes.STRING(120), allowNull: false },
        type: { type: DataTypes.STRING(50), allowNull: false },
        album_name: { type: DataTypes.STRING(50), allowNull: false },
        genre: { type: DataTypes.STRING(50), allowNull: false },
        release_date: { type: DataTypes.STRING(50), allowNull: false },
        cover_url: { type: DataTypes.TEXT, allowNull: false },

      },
      { sequelize, tableName: 'Album', modelName: `Album`, timestamps: true }
    );
    return Album;
  }
}
