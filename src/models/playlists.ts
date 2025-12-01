import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

export class Playlists extends Model<InferAttributes<Playlists>, InferCreationAttributes<Playlists>> {
  declare id: CreationOptional<number>;
  declare user_id: number;
  declare name: string;
  declare description: string;
  declare created_at: Date;

  static initModel(sequelize: Sequelize): typeof Playlists {
    Playlists.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        name: { type: DataTypes.STRING(100), allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      },
      {
        sequelize,
        tableName: 'playlists',
        modelName: 'Playlists',
        timestamps: false,
      }
    );
    return Playlists;
  }
}
