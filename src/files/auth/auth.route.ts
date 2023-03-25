import express from "express"
import authController from "./controllers/auth.controller"
const AuthRoute = express.Router()

AuthRoute.post("/signup", authController.createUser)
AuthRoute.post("/login", authController.loginUser)

export default AuthRoute
