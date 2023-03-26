import request from "supertest"
import { app } from "../src/core/app"
import { purchaseSuccess } from "../src/files/purchases/purchase.messages"
import { setupServer } from "./server"

setupServer()

describe("buy", () => {
  describe("given the details are valid", function () {
    it("should proceed to buy and return payload along with a 200 status code", async function () {
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

      const { body: product } = await request(app)
        .get("/api/v1/products")
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)

      const productPayload = {
        productId: product.data[0].id,
        amount: 2,
      }

      const { headers, statusCode, body } = await request(app)
        .post("/api/v1/products/buy")
        .send(productPayload)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)

      expect(headers["content-type"]).toMatch(/json/)
      expect(statusCode).toBe(201)
      expect(body.msg).toBe(purchaseSuccess.CREATED)
      expect(body.success).toBeTruthy()
      expect(body.data.id).toEqual(product.data[0].id)
      expect(body.data.productName).toEqual(expect.any(String))
    })
  })
})
