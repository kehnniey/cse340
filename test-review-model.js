const reviewModel = require('./models/review-model')

async function testReviewModel() {
  console.log('Testing Review Model Functions...\n')
  
  // Test 1: Add review
  console.log('1. Adding a test review:')
  const newReview = await reviewModel.addReview(1, 1, 'Test review from test file', 5)
  console.log(newReview)
  
  // Test 2: Get reviews by vehicle
  console.log('\n2. Getting reviews for vehicle 1:')
  const vehicleReviews = await reviewModel.getReviewsByVehicle(1)
  console.log(vehicleReviews)
  
  // Test 3: Get average rating
  console.log('\n3. Getting average rating for vehicle 1:')
  const avgRating = await reviewModel.getAverageRating(1)
  console.log(avgRating)
  
  console.log('\n✅ All tests complete!')
  process.exit() // Exit after tests
}

testReviewModel()