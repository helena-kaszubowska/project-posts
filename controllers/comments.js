const Comment = require("../models/comment");
const Post = require("../models/post");

exports.addComment = (req, res) => {
    const { content } = req.body;
    const { postId } = req.params;

    const newComment = new Comment({
        content,
        userId: req.user.id, 
        postId,
    });

    newComment
        .save()
        .then(comment => {
            return Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } })
                .then(() => {
                    res.status(201).json({
                        message: "Komentarz dodany",
                        comment,
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                message: "Błąd podczas dodawania komentarza",
                error: err.message,
            });
        });
};

exports.updateComment = (req, res) => {
    const commentId = req.params.id;

    Comment.findById(commentId)
        .then(comment => {
            if (!comment || comment.userId.toString() !== req.user.id) {
                return res.status(403).json({ message: "Brak uprawnień do edycji tego komentarza" });
            }

            Object.assign(comment, req.body);
            return comment.save();
        })
        .then(updatedComment => {
            res.status(200).json({
                message: "Komentarz zaktualizowany",
                updatedComment,
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Błąd podczas aktualizacji komentarza",
                error: err.message,
            });
        });
};

exports.deleteComment = (req, res) => {
    const commentId = req.params.id;

    Comment.findById(commentId)
        .then(comment => {
            if (!comment || comment.userId.toString() !== req.user.id) {
                return res.status(403).json({ message: "Brak uprawnień do usunięcia tego komentarza" });
            }

            return Comment.deleteOne({ _id: commentId });  
        })
        .then(() => {
            res.status(200).json({ message: "Komentarz usunięty" });
        })
        .catch(err => {
            res.status(500).json({
                message: "Błąd podczas usuwania komentarza",
                error: err.message,
            });
        });
};

