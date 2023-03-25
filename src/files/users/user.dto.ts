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
  // fetchMultipleUsers: (payload: Partial<IUser>) => Promise<IUser[]>
  // fetchSingleUser: (payload: Partial<IUser>) => Promise<IUser>
}