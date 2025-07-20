const Post = require('../models/post');

// Create post
exports.createPost = async(req,res) => {
    try {
        const post = await Post.create({
            title: req.body.title,
            content: req.body.content,
            author: req.user._id,
        });
        res.status(201).json({post})
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Get All posts
exports.getAllPosts = async (req,res) => {
    try {
        const posts = await Post.find().populate('author', 'username email');
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single post
exports.getPost = async (req,res) => {
    try{
        const post = await Post.findById(req.params.id).populate('author', 'username email');
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update Posts
exports.updatePost = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // check if user is owner
        if (post.author.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: 'Not Allowed'});
        }

        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;
        const updatedPost = await post.save();

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete Post
exports.deletePost = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not allowed' });
        }

        await post.deleteOne();
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};