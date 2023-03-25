import { NextFunction, Request, Response } from "express"
import { responseHandler } from "../../../core/response"
import { manageAsyncOps } from "../../../utils"
import { CustomError } from "../../../utils/error"
import AuthService from "../services/auth.service"

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const [error, data] = await manageAsyncOps(AuthService.createUser(req.body))

  if (error) return next(error)

  if (!data?.success) return next(new CustomError(data!.msg, 400, data!))

  return responseHandler(res, 200, data!)
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const [error, data] = await manageAsyncOps(AuthService.loginUser(req.body))

  console.log("error", error)

  if (error) return next(error)

  if (!data?.success) return next(new CustomError(data!.msg, 400, data!))

  return responseHandler(res, 200, data!)
}

export default {
  createUser,
  loginUser,
}
