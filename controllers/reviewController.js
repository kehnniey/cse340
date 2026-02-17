/* ******************************************
 * Review Controller
 *******************************************/
const reviewModel = require("../models/review-model")
const invModel = require("../models/inventory-model")  
const utilities = require("../utilities/")

const reviewCont = {}

/* **********************
 * Build add review view
 * ********************* */
  reviewCont.buildAddReview = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  const vehicleData = await invModel.getInventoryById(inv_id)
  const vehicleName = `${vehicleData.inv_year} ${vehicleData.inv_make} ${vehicleData.inv_model}`
  
  res.render("reviews/add-review", {
    title: `Review ${vehicleName}`,
    nav,
    errors: null,
    inv_id,
    vehicleName
  })
}

/* **********************
 * Process new review
 * ********************* */
  reviewCont.addReview = async function (req, res, next) {
  const { inv_id, review_text, review_rating } = req.body
  const account_id = res.locals.accountData.account_id
  
  // Check if user already reviewed this vehicle
  const hasReviewed = await reviewModel.checkExistingReview(inv_id, account_id)
  if (hasReviewed) {
    req.flash("notice", "You have already reviewed this vehicle.")
    return res.redirect(`/inv/detail/${inv_id}`)
  }
  
  const result = await reviewModel.addReview(inv_id, account_id, review_text, review_rating)
  
  if (result) {
    req.flash("notice", "Review added successfully!")
    res.redirect(`/inv/detail/${inv_id}`)
  } else {
    req.flash("notice", "Sorry, adding review failed.")
    res.redirect(`/reviews/add/${inv_id}`)
  }
}

/* **********************
 * Build my reviews view
 * ********************* */
  reviewCont.buildMyReviews = async function (req, res, next) {
  const account_id = res.locals.accountData.account_id
  let nav = await utilities.getNav()
  const reviews = await reviewModel.getReviewsByUser(account_id)
  
  res.render("reviews/my-reviews", {
    title: "My Reviews",
    nav,
    reviews,
    errors: null
  })
}

/* **********************
 * Build edit review view
 * ********************* */
  reviewCont.buildEditReview = async function (req, res, next) {
  const review_id = parseInt(req.params.review_id)
  let nav = await utilities.getNav()
  const reviewData = await reviewModel.getReviewById(review_id)
  
  // Security check: make sure user owns this review
  if (!reviewData || reviewData.account_id !== res.locals.accountData.account_id) {
    req.flash("notice", "You can only edit your own reviews.")
    return res.redirect("/reviews/my-reviews")
  }
  
  // Fetch vehicle information
  const vehicleData = await invModel.getInventoryById(reviewData.inv_id)
  const vehicleName = `${vehicleData.inv_year} ${vehicleData.inv_make} ${vehicleData.inv_model}`
  
  res.render("reviews/edit-review", {
    title: `Edit Review - ${vehicleName}`,  // 
    nav,
    errors: null,
    review_id: reviewData.review_id,
    review_text: reviewData.review_text,
    review_rating: reviewData.review_rating,
    vehicleName  
  })
}
/* **********************
 * Process review update
 * ********************* */
  reviewCont.updateReview = async function (req, res, next) {
  const { review_id, review_text, review_rating } = req.body
  
  // Security check
  const reviewData = await reviewModel.getReviewById(review_id)
  if (reviewData.account_id !== res.locals.accountData.account_id) {
    req.flash("notice", "Unauthorized.")
    return res.redirect("/reviews/my-reviews")
  }
  
  const result = await reviewModel.updateReview(review_id, review_text, review_rating)
  
  if (result) {
    req.flash("notice", "Review updated successfully!")
    res.redirect("/reviews/my-reviews")
  } else {
    req.flash("notice", "Sorry, update failed.")
    res.redirect(`/reviews/edit/${review_id}`)
  }
}

/* **********************
 * Delete review
 * ********************* */
  reviewCont.deleteReview = async function (req, res, next) {
  const review_id = parseInt(req.params.review_id)
  
  // Security check
  const reviewData = await reviewModel.getReviewById(review_id)
  if (reviewData.account_id !== res.locals.accountData.account_id) {
    req.flash("notice", "Unauthorized.")
    return res.redirect("/reviews/my-reviews")
  }
  
  const result = await reviewModel.deleteReview(review_id)
  
  if (result) {
    req.flash("notice", "Review deleted successfully!")
  } else {
    req.flash("notice", "Sorry, deletion failed.")
  }
  
  res.redirect("/reviews/my-reviews")
}

module.exports = reviewCont