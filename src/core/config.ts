import * as dotenv from "dotenv"
dotenv.config()

export interface IConfig {
  SECRET_KEY: string
  TOKEN_EXPIRE_IN: string
  ENV: string
}

const config = {
  SECRET_KEY: process.env.SECRET_KEY,
  TOKEN_EXPIRE_IN: process.env.TOKEN_EXPIRE_IN,
  ENV: process.env.ENVIRONMENT,
}

export default config
