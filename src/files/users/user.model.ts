import {
  Column,
  DataType,
  Default,
  DefaultScope,
  HasMany,
  Model,
  PrimaryKey,
  Scopes,
  Table,
} from "sequelize-typescript"
import Product from "../products/product.model"
import { BASE_ROLES, IUser } from "./user.dto"

@Table({
  timestamps: true,
  tableName: "users",
  paranoid: true,
})
@DefaultScope(() => ({
  attributes: { exclude: ["password", "createdAt", "updatedAt"] },
}))
@Scopes(() => ({
  withPassword: {
    attributes: { exclude: ["createdAt", "updatedAt"] },
  },
}))
export default class User extends Model<IUser> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string

  @Column
  declare userName: string

  @Default(0)
  @Column(DataType.BIGINT)
  declare deposit: number

  @Column
  declare password: string

  @Column
  declare role: BASE_ROLES

  @HasMany(() => Product)
  products: Product[]
}
