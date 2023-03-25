import Product from "./product.model"

export interface IProduct {
  id?: string
  productName: string
  amountAvailable: number
  cost: number
  sellerId: any
}

export interface IProductRepo {
  create: (productPayload: IProduct) => Promise<Product>
  fetchAllProducts: () => Promise<Product[]>
  findOne: (
    productId: Pick<IProduct, "id">,
    attributes: Partial<keyof IProduct>[]
  ) => Promise<IProduct>

  update: (
    productId: Pick<IProduct, "id">,
    update: Partial<IProduct>
  ) => Promise<[affectedCount: number]>

  deleteProduct: (productId: Pick<IProduct, "id">) => Promise<number>
}
