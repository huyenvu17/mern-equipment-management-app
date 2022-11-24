const router = require("express").Router();
const Employee = require("../models/Employee");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newEmployee = new Employee({
    username: req.body.username,
    email: req.body.email,
    isAdmin: req.body.isAdmin,
    name: req.body.name,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });
  try {
    const employee = await newEmployee.save();
    return res.status(201).json(employee);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const employee = await Employee.findOne({ email: req.body.email });
    !employee && res.status(401).json("Wrong password or username!");

    const bytes = CryptoJS.AES.decrypt(
      employee.password,
      process.env.SECRET_KEY
    );
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if(originalPassword !== req.body.password){
      return res.status(401).json("Wrong password or username!");
    }

    const accessToken = jwt.sign(
      { id: employee._id, isAdmin: employee.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    const { password, ...info } = employee._doc;

    return res.status(200).json({ ...info, accessToken });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
