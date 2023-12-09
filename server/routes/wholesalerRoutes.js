const router = require("express").Router();
const {
  getWholesalers,
  getWholesaler,
  createWholesaler,
  updateWholesaler,
  deleteWholesaler,
} = require("../controllers/wholesalerControllers");

const isAuthenticated = require("../middlewares/isAuthenticated");
const { userType } = require("../utils/userType");

router.get("/", getWholesalers);
router.get(
  "/:id",
  isAuthenticated([userType.admin, userType.premium]),
  getWholesaler
);
router.post(
  "/",
  isAuthenticated([userType.admin, userType.premium]),
  createWholesaler
);
router.patch(
  "/:id",
  isAuthenticated([userType.admin, userType.premium]),
  updateWholesaler
);
router.delete(
  "/:id",
  isAuthenticated([userType.admin, userType.premium]),
  deleteWholesaler
);

module.exports = router;
