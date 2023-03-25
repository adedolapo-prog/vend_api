import { NextFunction, Request, Response } from "express"
import { responseHandler } from "../../../core/response"
import { manageAsyncOps } from "../../../utils"
import { CustomError } from "../../../utils/error"
import ProductService from "../services/product.service"

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [error, data] = await manageAsyncOps(
    ProductService.createProduct({ ...req.body, sellerId: res.locals.jwt.id })
  )

  if (error) return next(error)

  if (!data?.success) return next(new CustomError(data!.msg, 400, data!))

  return responseHandler(res, 200, data!)
}

const fetchProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [error, data] = await manageAsyncOps(ProductService.fetchProducts())

  if (error) return next(error)

  if (!data?.success) return next(new CustomError(data!.msg, 400, data!))

  return responseHandler(res, 200, data!)
}

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [error, data] = await manageAsyncOps(
    ProductService.updateProduct({
      productId: req.params.productId,
      update: req.body,
    })
  )

  if (error) return next(error)

  if (!data?.success) return next(new CustomError(data!.msg, 400, data!))

  return responseHandler(res, 200, data!)
}

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [error, data] = await manageAsyncOps(
    ProductService.deleteProduct({
      productId: req.params.productId,
    })
  )

  if (error) return next(error)

  if (!data?.success) return next(new CustomError(data!.msg, 400, data!))

  return responseHandler(res, 200, data!)
}

export default {
  createProduct,
  fetchProducts,
  updateProduct,
  deleteProduct,
}
