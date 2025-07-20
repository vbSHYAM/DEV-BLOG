const express = require('express');
const {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createPost);        // Create
router.get('/', getAllPosts);                 // All posts
router.get('/:id', getPost);                  // Single post
router.put('/:id', protect, updatePost);      // Update
router.delete('/:id', protect, deletePost);   // Delete

module.exports = router;