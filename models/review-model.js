/*week 6: Final Project - Review Controller */

const pool = require("../database/")

/* **********************
 * Add new review
 * ********************* */
async function addReview(inv_id, account_id, review_text, review_rating) {
  try {
    const sql = "INSERT INTO reviews (inv_id, account_id, review_text, review_rating) VALUES ($1, $2, $3, $4) RETURNING *"
    const data = await pool.query(sql, [inv_id, account_id, review_text, review_rating])
    return data.rows[0]
  } catch (error) {
    console.error("addReview error: " + error)
  }
}

/* **********************
 * Get all reviews for a vehicle
 * ********************* */
async function getReviewsByVehicle(inv_id) {
  try {
    const sql = `
      SELECT r.*, a.account_firstname, a.account_lastname 
      FROM reviews r 
      JOIN account a ON r.account_id = a.account_id 
      WHERE r.inv_id = $1 
      ORDER BY r.review_date DESC
    `
    const data = await pool.query(sql, [inv_id])
    return data.rows
  } catch (error) {
    console.error("getReviewsByVehicle error: " + error)
  }
}

/* **********************
 * Get reviews by user
 * ********************* */
async function getReviewsByUser(account_id) {
  try {
    const sql = `
      SELECT r.*, i.inv_make, i.inv_model, i.inv_year 
      FROM reviews r 
      JOIN inventory i ON r.inv_id = i.inv_id 
      WHERE r.account_id = $1 
      ORDER BY r.review_date DESC
    `
    const data = await pool.query(sql, [account_id])
    return data.rows
  } catch (error) {
    console.error("getReviewsByUser error: " + error)
  }
}

/* **********************
 * Get review by ID
 * ********************* */
async function getReviewById(review_id) {
  try {
    const sql = "SELECT * FROM reviews WHERE review_id = $1"
    const data = await pool.query(sql, [review_id])
    return data.rows[0]
  } catch (error) {
    console.error("getReviewById error: " + error)
  }
}

/* **********************
 * Update review
 * ********************* */
async function updateReview(review_id, review_text, review_rating) {
  try {
    const sql = "UPDATE reviews SET review_text = $1, review_rating = $2 WHERE review_id = $3 RETURNING *"
    const data = await pool.query(sql, [review_text, review_rating, review_id])
    return data.rows[0]
  } catch (error) {
    console.error("updateReview error: " + error)
  }
}

/* **********************
 * Delete review
 * ********************* */
async function deleteReview(review_id) {
  try {
    const sql = "DELETE FROM reviews WHERE review_id = $1"
    const data = await pool.query(sql, [review_id])
    return data
  } catch (error) {
    console.error("deleteReview error: " + error)
  }
}

/* **********************
 * Calculate average rating for vehicle
 * ********************* */
async function getAverageRating(inv_id) {
  try {
    const sql = "SELECT AVG(review_rating) as avg_rating, COUNT(*) as review_count FROM reviews WHERE inv_id = $1"
    const data = await pool.query(sql, [inv_id])
    return data.rows[0]
  } catch (error) {
    console.error("getAverageRating error: " + error)
  }
}

/* **********************
 * Check if user already reviewed this vehicle
 * ********************* */
async function checkExistingReview(inv_id, account_id) {
  try {
    const sql = "SELECT * FROM reviews WHERE inv_id = $1 AND account_id = $2"
    const data = await pool.query(sql, [inv_id, account_id])
    return data.rowCount > 0
  } catch (error) {
    console.error("checkExistingReview error: " + error)
    return false
  }
}

module.exports = {
  addReview,
  getReviewsByVehicle,
  getReviewsByUser,
  getReviewById,
  updateReview,
  deleteReview,
  getAverageRating,
  checkExistingReview
}