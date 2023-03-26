import { IResponse } from "../../../core/response.dto"
import { IProduct } from "../product.dto"
import { productFailure, productSuccess } from "../product.messages"
import ProductRepository from "../product.repository"

const productRepository = new ProductRepository()

export default class ProductService {
  static async createProduct(productPayload: IProduct): Promise<IResponse> {
    const { sellerId, amountAvailable, cost, productName } = productPayload

    const { dataValues: product } = await productRepository.create({
      sellerId,
      amountAvailable,
      cost,
      productName,
    })

    if (!product.id) return { success: false, msg: productFailure.CREATED }

    return { success: true, msg: productSuccess.CREATED, data: product }
  }

  static async fetchProducts(): Promise<IResponse> {
    const products = await productRepository.fetchAllProducts()

    if (products.length < 1)
      return { success: false, msg: productFailure.FETCHED }

    return { success: true, msg: productSuccess.FETCHED, data: products }
  }

  static async updateProduct(payload: {
    productId: any
    sellerId: any
    update: Partial<IProduct>
  }): Promise<IResponse> {
    const { productId, sellerId, update } = payload
    let product = await productRepository.findOne({ id: productId, sellerId }, [
      "id",
    ])

    if (!product) return { success: false, msg: productFailure.FETCHED }

    const [updateCount] = await productRepository.update(
      { id: productId },
      update
    )

    if (updateCount < 1) return { success: false, msg: productFailure.UPDATED }
    return { success: true, msg: productSuccess.UPDATED }
  }

  static async deleteProduct(payload: {
    productId: any
    sellerId: any
  }): Promise<IResponse> {
    const { productId, sellerId } = payload
    const deleteProduct = await productRepository.deleteProduct({
      id: productId,
      sellerId,
    })

    if (deleteProduct < 1)
      return { success: false, msg: productFailure.DELETED }

    return { success: true, msg: productSuccess.DELETED }
  }
}
