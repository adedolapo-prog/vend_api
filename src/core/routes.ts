import { Application } from "express"
import AuthRoute from "../files/auth/auth.route"
import ProductRoute from "../files/products/product.route"
import UserRoute from "../files/users/user.route"

export const routes = (app: Application) => {
  const base = "/api/v1"

  app.use(`${base}/auth`, AuthRoute)
  app.use(`${base}/users`, UserRoute)
  app.use(`${base}/products`, ProductRoute)
}
