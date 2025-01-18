const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const Comment = require("../models/Comment");

// Dodawanie nowego postu
router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Pobieranie postów z komentarzami i autorem
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "name email")
      .populate({
        path: "comments",
        populate: { path: "userId", select: "name" },
      });
    res.json(posts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Wyszukiwanie postów po tytule
router.get("/search", async (req, res) => {
  try {
    const { title } = req.query;
    const posts = await Post.find({ title: new RegExp(title, "i") });
    res.json(posts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
