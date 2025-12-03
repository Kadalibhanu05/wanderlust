const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingsController = require("../controller/listings.js");
const multer = require("multer");
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });

router.route("/")
.get( wrapAsync(listingsController.index) )
.post( isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync (listingsController.createListing)
);


//New Route
router.get("/new", isLoggedIn, listingsController.rendernewForm );

router.route("/:id")
.get( wrapAsync(listingsController.showListing) )  // show route
.put( isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingsController.updateListing) ) // update route
.delete( isLoggedIn, isOwner, wrapAsync(listingsController.destroyListing) ); // delete route

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingsController.editListing) );

// //Index Route
// router.get("/", wrapAsync(listingsController.index) );

// //New Route
// router.get("/new", isLoggedIn, listingsController.rendernewForm );

// //Show Route
// router.get("/:id", wrapAsync(listingsController.showListing) );
 
// // Create route
// router.post ("/", isLoggedIn, validateListing, wrapAsync (listingsController.createListing) 
// );

// //Edit Route
// router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingsController.editListing) );

// //Update Route
// router.put("/:id",validateListing, isLoggedIn, isOwner, wrapAsync(listingsController.updateListing) );

// //Delete Route
// router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingsController.destroyListing) );

module.exports = router;