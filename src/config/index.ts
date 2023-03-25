import path from "path"
import dotenv from "dotenv"
import { SequelizeOptions } from "sequelize-typescript"

dotenv.config()

interface IApplicationConfig {
  serverPort: number
  JWTTokenSecret: string
  passwordSaltRounds: number
  accessTokenExpiresIn: number
  dbOptions: SequelizeOptions
}

export default class ApplicationConfig {
  private static configuration: IApplicationConfig = {
    serverPort: Number(process.env?.SERVER_PORT),
    JWTTokenSecret: process.env.JWT_TOKEN_SECRET,
    passwordSaltRounds: +process.env.PASSWORD_SALT_ROUNDS || 10,
    accessTokenExpiresIn: +process.env.ACCESS_TOKEN_EXPIRES_IN,
    dbOptions: {
      dialect: "postgres",
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      models: [
        path.resolve(__dirname, "../**/*.model.ts"),
        path.resolve(__dirname, "../**/*.model.js"),
      ],
    },
  }

  static getConfiguration = async (): Promise<IApplicationConfig> => {
    return this.configuration
  }

  static configOrchestrator = () => this.configuration
}
