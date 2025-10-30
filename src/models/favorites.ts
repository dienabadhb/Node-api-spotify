import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes } from 'sequelize';
import { User } from './user';
import { Song } from './song';

export class Favorites extends Model<
  InferAttributes<Favorites>,
  InferCreationAttributes<Favorites>
> {
  declare user_id: number;
  declare song_id: number;

  static initModel(sequelize: Sequelize): typeof Favorites {
    Favorites.init(
      {
        user_id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true, },
        song_id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true, },
      },
      {
        sequelize,
        tableName: 'favorites',
        modelName: 'Favorites',
        timestamps: false,
      }
    );
    return Favorites;
  }

  static associate() {
    Favorites.belongsTo(User, { foreignKey: 'user_id' });
    Favorites.belongsTo(Song, { foreignKey: 'song_id' });
  }
}
