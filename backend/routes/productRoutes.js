import express from "express"
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  getProductsByCategory,
  getProductsByColor,
  getProductsByPrice,
  getTopProducts,
  updateProduct
} from "../controllers/productController.js"
import { admin, protect } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route("/").get(getProducts).post(protect, admin, createProduct)
router.route("/filterByColor").get(getProductsByColor)
router.route("/filterByCategory").get(getProductsByCategory)
router.route("/filterByPrice").get(getProductsByPrice)
router.route("/:id/reviews").post(protect, createProductReview)
router.get("/top", getTopProducts)
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

export default router
