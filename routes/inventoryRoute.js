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

// Route to trigger intentional 500 error
router.get("/trigger-error", utilities.handleErrors(invController.triggerError))



module.exports = router