// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities") 
const regValidate = require('../utilities/account-validation')

/* ***************************
 * Account Routes
 * ************************** */
// Route to display account management view (default for /account/)
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildAccountManagement))

// Route to display login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Route to display registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// Process the registration data
router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

// Process the login request
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

// Week 5: Assignment

// Route to build account update view
router.get("/update/:account_id", utilities.handleErrors(accountController.buildAccountUpdate))

// Route to process account update
router.post(
  "/update",
  regValidate.updateAccountRules(),
  regValidate.checkAccountUpdateData,
  utilities.handleErrors(accountController.updateAccount)
)

// Route to process password change
router.post(
  "/change-password",
  regValidate.passwordRules(),
  regValidate.checkPasswordData,
  utilities.handleErrors(accountController.changePassword)
)


// Route for logout
router.get("/logout", utilities.handleErrors(accountController.accountLogout))

module.exports = router