const router = require("express").Router();
const IssueAndReturn = require("../models/IssueAndReturn");
const verify = require("../utils/verifyToken");

// GET ALL
router.get("/", verify, async (req, res) => {
  IssueAndReturn.find()
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
    const equipment = await IssueAndReturn.findById(req.params.id);
    return res.status(200).json(equipment);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// CREATE
router.post("/", verify, async (req, res) => {
  console.log("req.user", req.user);
  if (req?.user?.isAdmin) {
    const newIssueEvent = new IssueAndReturn(req.body);
    try {
      const savedIssueEvent = await newIssueEvent.save();
      return res.status(201).json(savedIssueEvent);
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You are not allowed!");
  }
});

// UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req?.user?.isAdmin) {
    try {
      const updatedIssueEvent = await IssueAndReturn.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      return res.status(200).json(updatedIssueEvent);
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
      const deletedIssueEvent = await IssueAndReturn.findByIdAndDelete(
        req.params.id
      );
      return res.status(201).json(deletedIssueEvent);
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You are not allowed!");
  }
});

module.exports = router;
