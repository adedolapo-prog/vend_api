import Purchase from "./purchase.model"

export interface IPurchase {
  id?: string
  productId: any
  buyerId: any
  change: number
  amount: number
}

export interface IPurchaseRepo {
  create: (purchasePayload: IPurchase) => Promise<Purchase>
}
