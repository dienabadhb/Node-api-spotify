import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes } from 'sequelize';

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

}
