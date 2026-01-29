const utilities = require("../utilities")
const { body, validationResult } = require("express-validator")
const accountModel = require("../models/account-model")

const validate = {}

/*  **********************************
 *  Registration Data Validation Rules
 * ********************************* */
validate.registrationRules = () => {
  return [
    // firstname is required and must be string
    body("account_firstname")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please provide a first name."),

    // lastname is required and must be string
    body("account_lastname")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please provide a last name."),

    // valid email is required and cannot already exist in the DB
    body("account_email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("A valid email is required.")
      .custom(async (account_email) => {
        console.log(">>> Custom validator running for:", account_email)
        const emailExists = await accountModel.checkExistingEmail(account_email)
        console.log(">>> Email exists result:", emailExists)
        if (emailExists){
          console.log(">>> Throwing error - email exists!")
          throw new Error("Email exists. Please log in or use different email")
        }
        console.log(">>> Email is available")
      }),

    // password is required and must be strong password
    body("account_password")
      .notEmpty()
      .isStrongPassword({
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage("Password does not meet requirements."),
  ]
}

/* **********************************
 * Check data and return errors or continue to registration
 * ********************************* */
validate.checkRegData = async (req, res, next) => {
  const { account_firstname, account_lastname, account_email } = req.body
  let errors = validationResult(req)

  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("account/register", {
      errors,
      title: "Register",
      nav,
      account_firstname,
      account_lastname,
      account_email,
    })
    return
  }
  next()
}

module.exports = validate