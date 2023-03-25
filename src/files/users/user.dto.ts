import User from "./user.model"

export type BASE_ROLES = "buyer" | "seller"

export interface IUser {
  id?: string
  userName: string
  deposit: number
  password?: string
  role: BASE_ROLES
}

export interface IUserRepo {
  createUser: (payload: IUser) => Promise<User>
  fetchSingleUser: (
    payload: Partial<IUser>,
    attributes: Partial<keyof IUser>[]
  ) => Promise<IUser>
}
