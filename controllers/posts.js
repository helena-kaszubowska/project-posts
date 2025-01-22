const Post = require("../models/post");

exports.getAllPosts = (req, res) => {
    Post.find()
        .populate({
            path: "userId", 
            select: "name email -_id"  
        })
        .populate({
            path: 'comments', 
            select: 'content -_id'  
        })
        .then(posts => {
            const simplifiedPosts = posts.map(post => {
                const { _id, ...rest } = post.toObject(); 
                return rest;
            });

            res.status(200).json({
                message: "Lista wszystkich postów",
                posts: simplifiedPosts,
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Błąd serwera",
                error: err.message,
            });
        });
};

exports.getPostById = (req, res) => {
    const postId = req.params.id;

    Post.findById(postId)
        .populate({
            path: "userId", 
            select: "name email -_id"  
        })
        .populate({
            path: "comments", 
            populate: {
                path: "userId", 
                select: "name email -_id"
            },
            select: "content -_id" 
        })
        .then(post => {
            if (!post) {
                return res.status(404).json({ message: "Post nie znaleziony" });
            }

            res.status(200).json({
                message: "Pobrano post",
                post,
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Błąd serwera podczas pobierania posta",
                error: err.message,
            });
        });
};

exports.createPost = (req, res) => {
    console.log("Req.user:", req.user); 
    const { title, content } = req.body;

    const newPost = new Post({
        title,
        content,
        userId: req.user.id, 
    });

    newPost
        .save()
        .then(post => {
            console.log("Post utworzony:", post); 
            res.status(201).json({
                message: "Post utworzony",
                post,
            });
        })
        .catch(err => {
            console.error("Błąd przy tworzeniu posta:", err.message); 
            res.status(500).json({
                message: "Nie udało się utworzyć posta",
                error: err.message,
            });
        });
};

exports.updatePost = (req, res) => {
    const postId = req.params.id;

    Post.findById(postId)
        .then(post => {
            if (!post || post.userId.toString() !== req.user.id) {
                return res.status(403).json({ message: "Brak uprawnień do edycji tego posta" });
            }

            Object.assign(post, req.body);
            return post.save();
        })
        .then(updatedPost => {
            res.status(200).json({
                message: "Post zaktualizowany",
                updatedPost,
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Błąd podczas aktualizacji posta",
                error: err.message,
            });
        });
};

exports.deletePost = (req, res) => {
    const postId = req.params.id;

    Post.findById(postId)
        .then(post => {
            if (!post || post.userId.toString() !== req.user.id) {
                return res.status(403).json({ message: "Brak uprawnień do usunięcia tego posta" });
            }

            return post.deleteOne({ _id: postId });

        })
        .then(() => {
            res.status(200).json({ message: "Post usunięty" });
        })
        .catch(err => {
            res.status(500).json({
                message: "Błąd podczas usuwania posta",
                error: err.message,
            });
        });
};
