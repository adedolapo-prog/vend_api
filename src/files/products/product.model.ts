import {
  BelongsTo,
  Column,
  DataType,
  Default,
  DefaultScope,
  ForeignKey,
  Model,
  PrimaryKey,
  Scopes,
  Table,
} from "sequelize-typescript"
import User from "../users/user.model"
import { IProduct } from "./product.dto"

@Table({
  timestamps: true,
  tableName: "products",
  paranoid: true,
})
@DefaultScope(() => ({
  attributes: { exclude: ["createdAt", "updatedAt"] },
}))
export default class Product extends Model<IProduct> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string

  @Column
  declare productName: string

  @Column
  declare amountAvailable: number

  @Default("0.00")
  @Column(DataType.DECIMAL)
  declare cost: number

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: any

  @BelongsTo(() => User)
  user: User
}
