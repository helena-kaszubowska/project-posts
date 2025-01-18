const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

// Unikaj wielokrotnego kompilowania modelu
module.exports = mongoose.models.Comment || mongoose.model("Comment", commentSchema);
