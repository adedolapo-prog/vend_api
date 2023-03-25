import { IUser, IUserRepo } from "./user.dto"
import User from "./user.model"

export default class UserRepository implements IUserRepo {
  async createUser(payload: IUser) {
    return User.create(payload)
  }
}
