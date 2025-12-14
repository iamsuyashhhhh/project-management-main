const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const project = { ...req.body, user: req.user._id };
    return res.status(201).json({ message: "Project created", project });
  } catch (err) {
    console.error("CREATE PROJECT ERROR:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/", auth, async (req, res) => {
  return res.json([{ name: "Test project", user: req.user._id }]);
});

module.exports = router;
