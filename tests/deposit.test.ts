import request from "supertest"
import { app } from "../src/core/app"
import { userFailure, userSuccess } from "../src/files/users/user.messages"
import { AlphaNumeric } from "../src/utils"
import { setupServer } from "./server"

setupServer()

describe("auth", () => {
  describe("deposit coin", function () {
    it("should return payload and a 200 status code", async function () {
      const loginPayload = {
        userName: process.env.CLIENT_EMAIL,
        password: process.env.CLIENT_PASSWORD,
      }

      const {
        body: {
          data: {
            token: { token },
          },
        },
      } = await request(app)
        .post("/api/v1/auth/login")
        .send(loginPayload)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")

      const depositPayload = {
        amount: 10,
      }

      const { headers, statusCode, body } = await request(app)
        .put("/api/v1/users/deposit")
        .send(depositPayload)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)

      expect(headers["content-type"]).toMatch(/json/)
      expect(statusCode).toBe(200)
      expect(body.msg).toBe(userSuccess.DEPOSIT)
      expect(body.success).toBeTruthy()
    })
  })

  describe("throw error if invalid deposit", function () {
    it("should return payload and a 200 status code", async function () {
      const loginPayload = {
        userName: process.env.CLIENT_EMAIL,
        password: process.env.CLIENT_PASSWORD,
      }

      const {
        body: {
          data: {
            token: { token },
          },
        },
      } = await request(app)
        .post("/api/v1/auth/login")
        .send(loginPayload)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")

      const depositPayload = {
        amount: 40,
      }

      const { headers, statusCode, body } = await request(app)
        .put("/api/v1/users/deposit")
        .send(depositPayload)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)

      console.log("body", body)

      expect(headers["content-type"]).toMatch(/json/)
      expect(statusCode).toBe(400)
      expect(body.errors.msg).toBe(userFailure.INVALID_DEPOSIT)
      expect(body.errors.success).toBeFalsy()
    })
  })
})
