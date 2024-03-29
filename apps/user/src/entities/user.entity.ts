import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  modelName: 'user',
  tableName: 'users',
  underscored: true,
  timestamps: true,
  version: true,
})
export class User extends Model<User> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    comment: 'The identifier for the user record',
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'The name of the user',
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'The email address of the user',
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: 'The password of the user',
  })
  password: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    comment: 'The date and time the record was created',
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: 'The date and time the record was last updated',
  })
  updatedAt: Date;
}
