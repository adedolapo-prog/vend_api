import { IPurchase, IPurchaseRepo } from "./purchase.dto"
import Purchase from "./purchase.model"

export default class PurchaseRepository implements IPurchaseRepo {
  async create(payload: IPurchase) {
    return Purchase.create(payload)
  }
}
