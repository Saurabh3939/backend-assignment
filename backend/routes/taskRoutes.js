const express = require("express");
const Task = require("../models/task.model");
const { protect, autorize } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/", protect, async (req, res) => {
  const task = await Task.create({ ...req.body, userId: req.user.id });
  res.json(task);
});

router.get("/", protect, async (req, res) => {
  const tasks =
    req.user.role === "admin"
      ? await Task.find()
      : await Task.find({ userId: req.user.id });
  res.json(tasks);
});

router.delete("/:id", protect, autorize("admin"), async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task Deleted By Admin" });
});

module.exports = router;
