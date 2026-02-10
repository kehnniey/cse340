// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities") 
const invValidate = require("../utilities/inventory-validation") 

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId))

// Route for vehicle detail page
router.get("/detail/:inv_id", utilities.handleErrors(invController.buildInventoryDetail))


//   *************week4**********************

// wk4: Route to display inventory management view
router.get("/", utilities.handleErrors(invController.buildManagement))

// wk4: Route to display add classification view
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification))


// Route to process new classification
router.post(
  "/add-classification", invValidate.classificationRules(), invValidate.checkClassificationData, utilities.handleErrors(invController.addClassification))


//   *************week4**********************
// Route to display add inventory view
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory))

// Route to process new inventory
router.post( "/add-inventory", invValidate.inventoryRules(), invValidate.checkInventoryData, utilities.handleErrors(invController.addInventory))


//   *************week5*********************
// Route to get inventory by classification for AJAX
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

// Route to build edit inventory view
router.get("/edit/:inv_id", utilities.handleErrors(invController.editInventoryView))

// Route to process inventory update
router.post("/update", invValidate.inventoryRules(), invValidate.checkUpdateData, utilities.handleErrors(invController.updateInventory))

// Week 5: Team Activity

// Route to build delete confirmation view
router.get("/delete/:inv_id", utilities.handleErrors(invController.deleteView))

// Route to process inventory deletion
router.post("/delete", utilities.handleErrors(invController.deleteItem))

// Week 5: Management view - requires Employee/Admin

// Add inventory - requires Employee/Admin
router.get("/add-inventory", utilities.checkAccountType, utilities.handleErrors(invController.buildAddInventory))
router.post("/add-inventory", utilities.checkAccountType, invValidate.inventoryRules(), invValidate.checkInventoryData, utilities.handleErrors(invController.addInventory))

// Edit - requires Employee/Admin
router.get("/edit/:inv_id", utilities.checkAccountType, utilities.handleErrors(invController.editInventoryView))
router.post("/update", utilities.checkAccountType, invValidate.inventoryRules(), invValidate.checkUpdateData, utilities.handleErrors(invController.updateInventory))

// Delete - requires Employee/Admin
router.get("/delete/:inv_id", utilities.checkAccountType, utilities.handleErrors(invController.deleteView))
router.post("/delete", utilities.checkAccountType, utilities.handleErrors(invController.deleteItem))

// AJAX route - requires Employee/Admin
router.get("/getInventory/:classification_id", utilities.checkAccountType, utilities.handleErrors(invController.getInventoryJSON))

// Note to SELF: Do not add checkAccountType to these routes (public):
// router.get("/type/:classificationId", ...)  ← Public
// router.get("/detail/:inv_id", ...)         ← Public

// Route to trigger intentional 500 error
router.get("/trigger-error", utilities.handleErrors(invController.triggerError))



module.exports = router