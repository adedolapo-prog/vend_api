import { IResponse } from "../../../core/response.dto"
import { IUser } from "../user.dto"
import { userFailure, userSuccess } from "../user.messages"
import UserRepository from "../user.repository"

const userRepository = new UserRepository()

export default class UserService {
  static async resetDeposit(payload: Partial<IUser>): Promise<IResponse> {
    const { id } = payload

    const [resetDepositCount] = await userRepository.update(
      { id },
      { deposit: 0 }
    )

    if (resetDepositCount < 1)
      return { success: false, msg: userFailure.UPDATE }

    return { success: true, msg: userSuccess.UPDATE }
  }

  static async makeDeposit(payload: {
    id: any
    amount: number
  }): Promise<IResponse> {
    const { id, amount } = payload

    //ensure amount to deposit is accepted
    const acceptedDeposits = [5, 10, 20, 50, 100]
    if (!acceptedDeposits.includes(amount))
      return { success: false, msg: userFailure.INVALID_DEPOSIT }

    //credit user's wallet
    const creditWallet = await userRepository.increment(
      { id },
      { deposit: amount }
    )

    console.log("[creditwallet]", creditWallet)

    return { success: true, msg: userSuccess.DEPOSIT }
  }
}
