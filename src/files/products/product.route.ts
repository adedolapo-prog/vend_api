import express from "express"
import { isAuthenticated } from "../../utils"
const ProductRoute = express.Router()
import ProductController from "./controllers/product.controller"
import PurchaseProductController from "./controllers/purchase.controller"
import { restrictTo } from "../../utils/index"

//all routes are authenticated
ProductRoute.use(isAuthenticated)
ProductRoute.get("/", ProductController.fetchProducts)
ProductRoute.post("/buy", PurchaseProductController.purchaseProduct)

//routes for sellers
ProductRoute.use(restrictTo("seller"))

ProductRoute.post("/", ProductController.createProduct)
ProductRoute.put("/:productId", ProductController.updateProduct)
ProductRoute.delete("/:productId", ProductController.deleteProduct)

export default ProductRoute
