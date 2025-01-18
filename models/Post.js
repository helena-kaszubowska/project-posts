const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

// Unikaj wielokrotnego kompilowania modelu
module.exports = mongoose.models.Post || mongoose.model("Post", postSchema);
