// Week 6: Final Project - Review Validation

const utilities = require(".")
const { body, validationResult } = require("express-validator")
const reviewModel = require("../models/review-model")

const validate = {}

/* **********************
 * Review validation rules
 * ********************* */
validate.reviewRules = () => {
  return [
    body("review_rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be between 1 and 5."),
    
    body("review_text")
      .trim()
      .isLength({ min: 10, max: 1000 })
      .withMessage("Review must be between 10 and 1000 characters.")
      .escape(),  // Prevent XSS attacks
  ]
}

/* **********************
 * Check review data
 * ********************* */
validate.checkReviewData = async (req, res, next) => {
  const { inv_id, review_text, review_rating } = req.body
  let errors = validationResult(req)
  
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    const vehicleData = await invModel.getInventoryById(inv_id)
    const vehicleName = `${vehicleData.inv_year} ${vehicleData.inv_make} ${vehicleData.inv_model}`
    
    res.render("reviews/add-review", {
      errors,
      title: `Review ${vehicleName}`,
      nav,
      inv_id,
      vehicleName,
      review_text,
      review_rating
    })
    return
  }
  next()
}

module.exports = validate