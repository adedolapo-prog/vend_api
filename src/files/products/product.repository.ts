import { IProduct, IProductRepo } from "./product.dto"
import Product from "./product.model"

export default class ProductRepository implements IProductRepo {
  async create(payload: IProduct) {
    return Product.create(payload)
  }

  async fetchAllProducts() {
    return Product.findAll()
  }

  async findOne(
    productQuery: Partial<IProduct>,
    attributes: Partial<keyof IProduct>[]
  ) {
    const product = await Product.findOne({
      where: productQuery,
      attributes: [...attributes],
    })

    if (!product) return null
    return product.toJSON()
  }

  async update(productId: Pick<IProduct, "id">, update: Partial<IProduct>) {
    return Product.update(update, { where: productId })
  }

  async deleteProduct(productQuery: Partial<IProduct>) {
    return Product.destroy({ where: productQuery })
  }
}
