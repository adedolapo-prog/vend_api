import { NextFunction, Response, Request } from "express"
import config from "../core/config"
import { verify, sign } from "jsonwebtoken"
import bcrypt from "bcrypt"
import { IUser } from "../files/users/user.dto"
import { CustomError } from "./error"

export interface UtilResponse {
  success: boolean
  msg: string
}

export interface IToken {
  _id: any
  userName: string
  role: String
  iat: number
  exp: number
}

const tokenHandler = (data: Partial<IUser>) => {
  const { id, userName, role } = data
  const token = sign(data, config.SECRET_KEY!, {
    expiresIn: config.TOKEN_EXPIRE_IN,
  })
  return { token, id, userName, role }
}

const isAuthenticated = async (req: any, res: Response, next: NextFunction) => {
  try {
    let authToken = req.headers.authorization

    if (authToken) {
      authToken = authToken.split(" ")[1]
      const payload = await verifyToken(authToken)
      if (payload) {
        req.payload = payload
        res.locals.jwt = payload
        return next()
      }
    }

    throw new Error("Not Authorized!")
  } catch (error: any) {
    if (error.message.includes("jwt expired")) {
      error.message = "Token expired, please sign in again"
    }
    return res.status(401).json({ message: error.message })
  }
}

const verifyToken = async (token: string) => {
  try {
    return verify(token, config.SECRET_KEY!)
  } catch (error) {
    throw new Error("Unable to verify token.")
  }
}

const AlphaNumeric = (length: number, type: string = "alpha"): string => {
  var result: string = ""
  var characters: string =
    type === "alpha"
      ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
      : "0123456789"

  var charactersLength: number = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

const verifyPassword = async (
  password: string,
  dbpassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, dbpassword)
}

const manageAsyncOps = async <T>(
  fn: Promise<T>
): Promise<[Error | null, Awaited<T> | null]> => {
  try {
    const response = await fn
    return [null, response]
  } catch (error) {
    const err = error as Error
    return [err, null]
  }
}

const verifyWhoAmI = (user: IToken, query: { [key: string]: any }): boolean => {
  return true
}

const restrictTo = (...roles: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!roles.includes(res.locals.jwt.role)) {
        return res.status(401).json({
          message: "You do not have permission to perform this action",
        })
      }

      next()
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong",
      })
    }
  }
}

export {
  tokenHandler,
  isAuthenticated,
  hashPassword,
  verifyPassword,
  manageAsyncOps,
  verifyWhoAmI,
  restrictTo,
  AlphaNumeric,
}
