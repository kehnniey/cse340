// Week 6: Final Project - Review Routes

/* ******************************************
 * Review Routes
 *******************************************/
const express = require("express")
const router = new express.Router()
const reviewCont = require("../controllers/reviewController")  
const utilities = require("../utilities")  
const validate = require("../utilities/review-validation")  

// Review Routes
router.get("/add/:inv_id", utilities.checkLogin, utilities.handleErrors(reviewCont.buildAddReview))
router.post("/add", utilities.checkLogin, validate.reviewRules(), validate.checkReviewData, utilities.handleErrors(reviewCont.addReview))
router.get("/my-reviews", utilities.checkLogin, utilities.handleErrors(reviewCont.buildMyReviews))
router.get("/edit/:review_id", utilities.checkLogin, utilities.handleErrors(reviewCont.buildEditReview))
router.post("/update", utilities.checkLogin, validate.reviewRules(), validate.checkReviewData, utilities.handleErrors(reviewCont.updateReview))
router.get("/delete/:review_id", utilities.checkLogin, utilities.handleErrors(reviewCont.deleteReview))

module.exports = router  