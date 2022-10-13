const router = require("express").Router();
const Equipment = require("../models/Equipment");
const verify = require("../verifyToken");

// GET ALL
router.get("/", verify, async (req, res) => {
  Equipment.find()
    .then((equipments) => res.json(equipments))
    .catch((error) => res.status(400).json("Error:" + error));
});

// GET ONE
router.get("/:id", async (req, res) => {
  try {
    const equipment = Equipment.findById(req.params.id);
    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json(error);
  }
});

// CREATE
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newEquipment = new Equipment(req.body);
    try {
      const savedEquipmentItem = await newEquipment.save();
      res.status(201).json(savedEquipmentItem);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

// UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newEquipment = new Equipment(req.body);
    try {
      const updatedEquipment = await Equipment.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedEquipment);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

// DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newEquipment = new Equipment(req.body);
    try {
      const deletedEquipment = await Equipment.findByIdAndDelete(req.params.id);
      res.status(201).json("Equipment deleted!");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

module.exports = router;
