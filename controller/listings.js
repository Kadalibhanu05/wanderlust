const Listing = require("../models/listing");
// const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
// const mapBoxToken = process.env.MAPBOX_TOKEN;
// const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const ExpressError = require("../utils/ExpressError");



module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.rendernewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
  .populate({ 
    path : "reviews",
    populate: {
    path: "author",
  },
})
.populate("owner");
  if(!listing){
    req.flash("error", "Cannot find that listing!");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {


  let url = req.file.path;
  let filename = req.file.filename;
  
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  // newListing.geometry = response.body.features[0].geometry;
   newListing.geometry = { type: 'Point', coordinates: [78.9629, 20.5937] };
  let savedListing = await newListing.save();
   console.log(savedListing);
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
  };

// module.exports.createListing = async (req, res, next) => {
//   let response = await geocoder.forwardGeocode ({
//   query: req.body.listing.location,
//   limit: 1
//   })
// .send ();

//   let url = req.file.path;
//   let filename = req.file.filename;
  
//   const newListing = new Listing(req.body.listing);
//   newListing.owner = req.user._id;
//   newListing.image = { url, filename };
//   newListing.geometry = response.body.features[0].geometry;
//   let savedListing = await newListing.save();
//    console.log(savedListing);
//   req.flash("success", "New Listing Created!");
//   res.redirect("/listings");
//   };

  module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error", "Cannot find that listing!");
      res.redirect("/listings");
    }
    let originialImageurl = listing.image.url;
    originialImageurl = originialImageurl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listing, originialImageurl });
  };

  module.exports.updateListing = async (req, res) => {
    if (!req.body.listing) {
      throw new ExpressError(400, "Send valid data for listing");
    }
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
      if(typeof req.file !== 'undefined'){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
    req.flash("success", "Listing Updated Successfully!");
    res.redirect(`/listings/${id}`);
  };

  module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted Successfully!");
  res.redirect("/listings");
};