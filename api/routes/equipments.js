const router = require("express").Router();
const Equipment = require("../models/Equipment");

// GET ALL
router.get("/", async (req, res) => {
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
router.post("/", async (req, res) => {
  const newEquipment = new Equipment(req.body);
  try {
    const savedEquipmentItem = await newEquipment.save();
    res.status(201).json(savedEquipmentItem);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
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
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deletedEquipment = await Equipment.findByIdAndDelete(
      req.params.id
    );
    res.status(201).json("Equipment deleted!");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
