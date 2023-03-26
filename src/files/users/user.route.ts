import express from "express"
import { isAuthenticated, restrictTo } from "../../utils"
const UserRoute = express.Router()
import userController from "./controllers/user.controller"

//authenticate users
UserRoute.use(isAuthenticated)

//buyers route
UserRoute.use(restrictTo("buyer"))
UserRoute.put("/deposit", userController.makeDeposit)
UserRoute.put("/reset", userController.resetDeposit)

export default UserRoute
