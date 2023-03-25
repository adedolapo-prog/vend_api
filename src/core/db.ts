import { Sequelize, SequelizeOptions } from "sequelize-typescript"

export const connectToDatabase = async (options: SequelizeOptions) => {
  const sequelize = new Sequelize(options)
  await sequelize.authenticate()
  await sequelize.sync({ alter: true })

  console.log("connected to database")
  return sequelize
}
