import { app, application } from "../src/core/app"
import { connectToDatabase } from "../src/core/db"
import ApplicationConfig from "../src/config"

/**
 * intialize the server and bootstrap it with
 * the necessary settings
 * @return { Express }
 */

export async function setupServer() {
  const app = application()
  const config = await ApplicationConfig.getConfiguration()
  connectToDatabase(config.dbOptions)
  return app
}
