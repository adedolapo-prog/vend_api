import {
  BelongsTo,
  Column,
  DataType,
  Default,
  DefaultScope,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript"
import Product from "../products/product.model"
import User from "../users/user.model"
import { IPurchase } from "./purchase.dto"

@Table({
  timestamps: true,
  tableName: "purchases",
  paranoid: true,
})
@DefaultScope(() => ({
  attributes: { exclude: ["createdAt", "updatedAt"] },
}))
export default class Purchase extends Model<IPurchase> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string

  @Column
  declare change: number

  @Default(0)
  @Column(DataType.BIGINT)
  declare amount: number

  @ForeignKey(() => Product)
  @Column(DataType.UUID)
  productId: any

  @BelongsTo(() => Product)
  product: Product

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  buyerId: any

  @BelongsTo(() => User)
  buyer: User
}
