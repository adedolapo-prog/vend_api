import { NextFunction, Request, Response } from "express"
import { responseHandler } from "../../../core/response"
import { manageAsyncOps } from "../../../utils"
import { CustomError } from "../../../utils/error"
import UserService from "../services/user.service"

const resetDeposit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [error, data] = await manageAsyncOps(
    UserService.resetDeposit(res.locals.jwt)
  )

  if (error) return next(error)

  if (!data?.success) return next(new CustomError(data!.msg, 400, data!))

  return responseHandler(res, 200, data!)
}

const makeDeposit = async (req: Request, res: Response, next: NextFunction) => {
  const [error, data] = await manageAsyncOps(
    UserService.makeDeposit({ id: res.locals.jwt.id, amount: req.body.amount })
  )

  if (error) return next(error)
  if (!data?.success) return next(new CustomError(data!.msg, 400, data!))

  return responseHandler(res, 200, data!)
}

export default {
  resetDeposit,
  makeDeposit,
}
