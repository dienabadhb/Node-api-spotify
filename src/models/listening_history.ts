import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { User } from './user';
import { Song } from './song';

export class Listening_history extends Model<
  InferAttributes<Listening_history>,
  InferCreationAttributes<Listening_history>
> {
  declare history_id: CreationOptional<number>;
  declare user_id: number;
  declare song_id: number;
  declare played_at: Date;

  static initModel(sequelize: Sequelize): typeof Listening_history {
    Listening_history.init(
      {
        history_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        song_id: { type: DataTypes.INTEGER, allowNull: false },
        played_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      },
      {
        sequelize,
        tableName: 'listening_history',
        modelName: 'Listening_history',
        timestamps: false, // pcq la table a déjà une date 'played_at'
      }
    );
    return Listening_history;
  }

  static associate() {
    // ça c'est pcq un utilisateur a plusieurs écoutes
    Listening_history.belongsTo(User, { foreignKey: 'user_id' });
    // Et ça pcq une chanson peut être écoutée plusieurs fois
    Listening_history.belongsTo(Song, { foreignKey: 'song_id' });
  }
}
