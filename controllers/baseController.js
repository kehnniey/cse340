// Required Resources
const utilities = require("../utilities/")

// Base Controller Object
const baseController = {}

// // Build home page
baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  req.flash("notice", "This is a flash message.")
  res.render("index", {title: "Home", nav})
}

// Export the controller object

module.exports = baseController