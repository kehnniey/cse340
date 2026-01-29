/* ******************************************
 * Account Controller
 * ******************************************/
const utilities = require("../utilities/")

/* ****************************************
 * Deliver login view
 * *************************************** */
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/login", {
    title: "Login",
    nav,
    errors: null,
  })
}

/* ****************************************
 * Deliver registration view
 * *************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null,
  })
}

/* ****************************************
 * Process Registration
 * *************************************** */
async function registerAccount(req, res, next) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_password } = req.body

  // Here you would call your model to save the user
  // For example:
  // await accountModel.registerNewUser({account_firstname, account_lastname, account_email, account_password})

  res.redirect("/account/login")
}


module.exports = {
  buildLogin,
  buildRegister,
  registerAccount,
}