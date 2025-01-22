const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth"); 
const postController = require("../controllers/posts");

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.post("/", protect, postController.createPost);
router.patch("/:id", protect, postController.updatePost);
router.delete("/:id", protect, postController.deletePost);

module.exports = router;
