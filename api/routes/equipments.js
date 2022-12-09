const router = require("express").Router();
const Equipment = require("../models/Equipment");
const verify = require("../utils/verifyToken");

// GET ALL
router.get("/", verify, async (req, res) => {
  Equipment.find()
    .then((equipments) => {
      return res.json(equipments);
    })
    .catch((error) => {
      return res.status(400).json("Error:" + error);
    });
});

// GET ONE
router.get("/:id", async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
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
    try {
      const updatedEquipment = await Equipment.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      return res.status(200).json(updatedEquipment);
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You are not allowed!");
  }
});

// DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const deletedEquipment = await Equipment.findByIdAndDelete(req.params.id);
      return res.status(201).json(deletedEquipment);
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You are not allowed!");
  }
});

module.exports = router;
