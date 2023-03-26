import request from "supertest"
import { app } from "../src/core/app"
import { userSuccess } from "../src/files/users/user.messages"
import { AlphaNumeric } from "../src/utils"
import { setupServer } from "./server"

setupServer()

describe("auth", () => {
  describe("given the details are valid", function () {
    describe("proceeds to create the user ", function () {
      it("should return payload and a 201 status code", async function () {
        const payload = {
          userName: `${AlphaNumeric(8)}.${AlphaNumeric(8)}`,
          password: "password123",
          role: "buyer",
        }

        const { statusCode, headers, body } = await request(app)
          .post("/api/v1/auth/signup")
          .send(payload)
          .set("Content-Type", "application/json")
          .set("Accept", "application/json")

        expect(headers["content-type"]).toMatch(/json/)
        expect(statusCode).toBe(201)
        expect(body.msg).toBe(userSuccess.CREATED)
        expect(body.success).toBeTruthy()
        expect(body.data.token.token).toEqual(expect.any(String))
      })
    })
  })

  describe("login", function () {
    it("should return payload and a 200 status code", async function () {
      const payload = {
        userName: process.env.CLIENT_EMAIL,
        password: process.env.CLIENT_PASSWORD,
      }

      const { statusCode, headers, body } = await request(app)
        .post("/api/v1/auth/login")
        .send(payload)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")

      expect(headers["content-type"]).toMatch(/json/)
      expect(statusCode).toBe(200)
      expect(body.msg).toBe(userSuccess.LOGIN)
      expect(body.success).toBeTruthy()
      expect(body.data.token.token).toEqual(expect.any(String))
    })
  })
})
