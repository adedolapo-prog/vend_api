import * as dotenv from "dotenv"
dotenv.config()

export interface IConfig {
  TERMII_BASE_URL: string
  TERMII_KEY: string
  SECRET_KEY: string
  REDIS_URL: string
  REDIS_TLS_URL: string
  LENDSQR_URL: string
  LENDSQR_KEY: string
  OKRA_URL: string
  OKRA_KEY: string
  PAYSTACK_URL: string
  PAYSTACK_KEY: string
  ENV: string
}

const config = {
  TERMII_BASE_URL: process.env.TERMII_BASE_URL,
  TERMII_KEY: process.env.TERMII_KEY,
  SECRET_KEY: process.env.SECRET_KEY,
  REDIS_URL: process.env.REDIS_URL,
  REDIS_TLS_URL: process.env.REDIS_TLS_URL,
  LENDSQR_URL: process.env.LENDSQR_URL,
  LENDSQR_KEY: process.env.LENDSQR_KEY,
  OKRA_URL: process.env.OKRA_URL,
  OKRA_KEY: process.env.OKRA_KEY,
  PAYSTACK_URL: process.env.PAYSTACK_BASE_URL,
  PAYSTACK_KEY: process.env.PAYSTACK_SK_KEY,
  ENV: process.env.ENVIRONMENT,
}

export default config
