import { application, app } from "./app"
import connectToDatabase from "./db"
import * as dotenv from "dotenv"
import path from "path"
import { loanRepaymentCRON } from "../utils/cron"

dotenv.config({ path: path.join(__dirname, "../../.env") })

const PORT = process.env.PORT || 5000

export const startServer = async () => {
  application() //instantiate express app
  await connectToDatabase()
  loanRepaymentCRON()

  app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`)
  })
}
