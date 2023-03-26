import { IResponse } from "../../../core/response.dto"
import {
  purchaseFailure,
  purchaseSuccess,
} from "../../purchases/purchase.messages"
import UserRepository from "../../users/user.repository"
import ProductRepository from "../product.repository"

const userRepository = new UserRepository()
const productRepository = new ProductRepository()

export default class PurchaseProductService {
  static async purchaseProduct(payload: {
    productId: any
    amount: number
    buyerId: any
  }): Promise<IResponse> {
    const { productId, amount, buyerId } = payload

    const [userDetails, productDetails] = await Promise.all([
      userRepository.fetchSingleUser({ id: buyerId }, ["id", "deposit"]),
      productRepository.findOne({ id: productId }, [
        "id",
        "productName",
        "cost",
      ]),
    ])

    if (!userDetails || !productDetails)
      return { success: false, msg: "Something went wrong" }

    const totalAmount = amount * productDetails.cost

    if (userDetails.deposit < totalAmount)
      return { success: true, msg: purchaseFailure.INSUFFICIENT_FUNDS }

    let change: number | number[] =
      userDetails.deposit - totalAmount > 0
        ? userDetails.deposit - totalAmount
        : 0

    change = this.calculateChange(change)

    return {
      success: true,
      msg: purchaseSuccess.CREATED,
      data: {
        ...productDetails,
        totalAmount,
        change,
      },
    }
  }

  private static calculateChange(change: number): number[] {
    const changeArray: number[] = []
    let changeValue = change

    while (changeValue > 0) {
      if (changeValue >= 100) {
        changeArray.push(100)
        changeValue -= 100
      }
      if (changeValue >= 50) {
        changeArray.push(50)
        changeValue -= 50
      }
      if (changeValue >= 20) {
        changeArray.push(20)
        changeValue -= 20
      }
      if (changeValue >= 10) {
        changeArray.push(10)
        changeValue -= 10
      }
      if (changeValue >= 5) {
        changeArray.push(5)
        changeValue -= 5
      }
    }

    return changeArray
  }
}
