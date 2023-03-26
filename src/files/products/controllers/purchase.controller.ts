import { NextFunction, Request, Response } from "express"
import { responseHandler } from "../../../core/response"
import { manageAsyncOps } from "../../../utils"
import { CustomError } from "../../../utils/error"
import PurchaseProductService from "../services/purchase.service"

const purchaseProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [error, data] = await manageAsyncOps(
    PurchaseProductService.purchaseProduct({
      ...req.body,
      buyerId: res.locals.jwt.id,
    })
  )

  if (error) return next(error)

  if (!data?.success) return next(new CustomError(data!.msg, 400, data!))

  return responseHandler(res, 201, data!)
}

export default { purchaseProduct }
