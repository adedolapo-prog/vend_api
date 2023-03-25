import { Application } from "express"
import AdminRouter from "../files/admin/admin.route"
import AnalyticsRouter from "../files/analytics/analytics.route"
import AuthRouter from "../files/auth/auth.route"
import BankRouter from "../files/bank/bank.route"
import LoanRouter from "../files/loans/loan.route"
import NotificationRouter from "../files/notifications/notification.route"
import SupportRouter from "../files/support/support.route"
import TransactionRouter from "../files/transactions/transaction.route"
import UserRouter from "../files/user/user.route"

export const routes = (app: Application) => {
  const base = "/api/v1"

  app.use(`${base}/auth`, AuthRouter)
  app.use(`${base}/users`, UserRouter)
  app.use(`${base}/admins`, AdminRouter)
  app.use(`${base}/loans`, LoanRouter)
  app.use(`${base}/analytics`, AnalyticsRouter)
  app.use(`${base}/banks`, BankRouter)
  app.use(`${base}/support`, SupportRouter)
  app.use(`${base}/transactions`, TransactionRouter)
  app.use(`${base}/notifications`, NotificationRouter)
}
