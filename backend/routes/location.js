const express = require("express");
const {getAllLocations,addLocation,getLocationById,updateLocation,deleteLocation} = require("../controllers/locationcon");

const router = express.Router();

router.get("/", getAllLocations);
router.post("/", addLocation);
router.get("/:id", getLocationById);
router.put("/:id", updateLocation);
router.delete("/:id", deleteLocation);

module.exports = router;
