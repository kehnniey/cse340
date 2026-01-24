const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  
  // Check if data exists
  if (!data || data.length === 0) {
    const error = new Error("No vehicles found for this classification")
    error.status = 404
    throw error
  }
  
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build vehicle detail view
 * ************************** */
invCont.buildInventoryDetail = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  const vehicle = await invModel.getInventoryById(inv_id)

  if (!vehicle) {
    const error = new Error("Vehicle not found")
    error.status = 404
    throw error
  }

  const nav = await utilities.getNav()
  const detailHTML = utilities.buildVehicleDetail(vehicle)

  res.render("./inventory/detail", {
    title: `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`,
    nav,
    detailHTML,
    classificationId: vehicle.classification_id
  })
}

/* ***************************
 *  Intentional 500 error for testing
 * ************************** */
invCont.triggerError = async function (req, res, next) {
  throw new Error("Intentional Server Error")
}

/* Export the controller object */
module.exports = invCont