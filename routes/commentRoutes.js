const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth"); // Middleware JWT
const commentController = require("../controllers/comments");

router.post("/:postId", protect, commentController.addComment);
router.patch("/:id", protect, commentController.updateComment);
router.delete("/:id", protect, commentController.deleteComment);

module.exports = router;
