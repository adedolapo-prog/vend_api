import { IResponse } from "../../../core/response.dto"
import { hashPassword, tokenHandler, verifyPassword } from "../../../utils"
import { IUser } from "../../users/user.dto"
import { userFailure, userSuccess } from "../../users/user.messages"
import UserRepository from "../../users/user.repository"

const userRepository = new UserRepository()

export default class AuthService {
  static async createUser(payload: Omit<IUser, "deposit">): Promise<IResponse> {
    const { userName, password } = payload

    const validateUser = await userRepository.fetchSingleUser({ userName }, [
      "id",
    ])

    if (validateUser) return { success: false, msg: userFailure.EXISTS }

    const { dataValues: user } = await userRepository.createUser({
      ...payload,
      password: await hashPassword(password),
    })

    if (!user.id) return { success: false, msg: userFailure.CREATED }

    const { password: hashedPassword, deposit, ...restOfUser } = user

    return {
      success: true,
      msg: userSuccess.CREATED,
      data: {
        token: tokenHandler(restOfUser),
      },
    }
  }

  static async loginUser(payload: Partial<IUser>): Promise<IResponse> {
    const { userName, password } = payload

    console.log(" here")
    const user = await userRepository.fetchSingleUser({ userName }, [
      "id",
      "password",
      "role",
      "userName",
    ])

    if (!user) return { success: false, msg: userFailure.INVALID_CREDENTIALS }

    console.log("user", user)
    const validatePassword = await verifyPassword(password, user.password)
    if (!validatePassword)
      return { success: false, msg: userFailure.INVALID_CREDENTIALS }

    console.log("validatePassword", validatePassword)
    return {
      success: true,
      msg: userSuccess.LOGIN,
      data: {
        token: tokenHandler(user),
      },
    }
  }
}
