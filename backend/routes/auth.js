const express= require("express");
const { registerController, loginController, testController, forgotPasswordController, updateprofileController, getOrdersController, getAllOrdersController, orderStatusController } = require("../controllers/authController");
const { requireSignIn,isAdmin } = require("../middlewares/authMiddleware");

// router object
const router = express.Router() 

// routing
// Registeration
router.post("/register",registerController)

// Login
router.post("/login",loginController)

// ForGet Password
router.post("/forgot-password",forgotPasswordController)


// Test Routes
router.get("/test", requireSignIn, isAdmin, testController)

// Protected User Route Auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });

  // Protected Admin Route Auth
  router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });

  // Update Profile
  router.put("/profile", requireSignIn, updateprofileController)

  // orders
  router.get("/orders", requireSignIn, getOrdersController)

  // all orders
  router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController)
  
  // status update
  router.put("/order-status/:orderId", requireSignIn, isAdmin, orderStatusController)


module.exports = router;

