const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controller/users.js");
const user = require("../models/user.js");

router.route("/signup")
.get(userController.renderSignup) // signup route for get
.post( wrapAsync(userController.signup) );  // signup route for post

router.route("/login")
.get(userController.renderLoginform) // login route for get
.post( saveRedirectUrl, passport.authenticate("local", {
  failureRedirect: "/login",
  failureFlash: true,
}), userController.login ); // login route for post

router.get("/logout", userController.logout);  // logout route

// router.get("/signup", userController.renderSignup);

// router.post("/signup", wrapAsync(userController.signup) );

// router.get("/login", userController.renderLoginform);

// router.post("/login", saveRedirectUrl, passport.authenticate("local", {
//   failureRedirect: "/login",
//   failureFlash: true,
// }),
//  userController.login
// );

// router.get("/logout", userController.logout);

module.exports = router;// Route handlers for user-related actions will go here