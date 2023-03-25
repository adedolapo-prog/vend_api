import express from "express"
import { isAuthenticated } from "../../utils"
const ProductRoute = express.Router()
import ProductController from "./controllers/product.controller"
import { restrictTo } from "../../utils/index"

//all routes are authenticated
ProductRoute.use(isAuthenticated)
ProductRoute.get("/", ProductController.fetchProducts)

//routes for sellers
ProductRoute.use(restrictTo("seller"))

ProductRoute.post("/", ProductController.createProduct)
ProductRoute.put("/:productId", ProductController.updateProduct)
ProductRoute.delete("/:productId", ProductController.deleteProduct)

export default ProductRoute
