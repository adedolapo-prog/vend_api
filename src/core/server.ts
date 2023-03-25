import { application, app } from "./app"
import * as dotenv from "dotenv"
import path from "path"
import { connectToDatabase } from "./db"
import ApplicationConfig from "../config"

dotenv.config({ path: path.join(__dirname, "../../.env") })

const PORT = process.env.PORT || 5000

export const startServer = async () => {
  application() //instantiate express app
  const config = await ApplicationConfig.getConfiguration()
  connectToDatabase(config.dbOptions)
  app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`)
  })
}
