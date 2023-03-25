import { IUser, IUserRepo } from "./user.dto"
import User from "./user.model"

export default class UserRepository implements IUserRepo {
  async createUser(payload: Omit<IUser, "deposit">) {
    return User.create(payload)
  }

  async fetchSingleUser(
    userPayload: Partial<IUser>,
    attributes: Partial<keyof IUser>[]
  ) {
    const user = await User.findOne({
      where: userPayload,
      attributes: [...attributes],
    })

    if (!user) return null
    return user.toJSON()
  }
}
