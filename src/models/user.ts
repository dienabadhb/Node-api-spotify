import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare surname: string;
  declare pseudo: string;
  declare email: string | null;
  declare password: string | null;

  static initModel(sequelize: Sequelize): typeof User {
    User.init(
      {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
        name: {type: DataTypes.STRING(120), allowNull: false,},
        surname: {type: DataTypes.STRING(120), allowNull: false,},
        pseudo: {type: DataTypes.STRING(120), allowNull: false,},
        email: {type: DataTypes.STRING(255), allowNull: true, unique: true,validate: {isEmail: true,},},
        password: {type : DataTypes.STRING(120), allowNull: true, unique: true,validate: {isEmail: true,},},
        /*account_type : {
            type : DataTypes.STRING(120),
            allowNull: true,
        },
        created_at : {
            type : DataTypes.STRING(120),
            allowNull: true,
        },*/


      },
      {
        sequelize,
        tableName: 'users',
        modelName: 'User',
        timestamps: true,
      }
    );
    return User;
  }
}
