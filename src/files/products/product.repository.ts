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
    productId: Pick<IProduct, "id">,
    attributes: Partial<keyof IProduct>[]
  ) {
    const product = await Product.findOne({
      where: productId,
      attributes: [...attributes],
    })

    if (!product) return null
    return product.toJSON()
  }

  async update(productId: Pick<IProduct, "id">, update: Partial<IProduct>) {
    return Product.update(update, { where: productId })
  }

  async deleteProduct(productId: Pick<IProduct, "id">) {
    return Product.destroy({ where: productId })
  }
}
