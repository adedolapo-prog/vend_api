import { Application } from "express"
import AuthRoute from "../files/auth/auth.route"

export const routes = (app: Application) => {
  const base = "/api/v1"

  app.use(`${base}/auth`, AuthRoute)
}
