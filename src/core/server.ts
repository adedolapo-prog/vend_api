import { application, app } from "./app"
import * as dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.join(__dirname, "../../.env") })

const PORT = process.env.PORT || 5000

export const startServer = async () => {
  application() //instantiate express app

  app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`)
  })
}
