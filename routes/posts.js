const axios = require('axios');
const express = require('express');
const Posts = require('../models/posts');

const router = express.Router();

const getUserFromService = async (userId) => {
  try {
    const authorResponse = await axios.get(`${process.env.USERS_API}/api/users/${userId}`);
    if (authorResponse.status === 200) {
      const author = authorResponse?.data?.data?.user;
      return author;
    } else throw Error('User not found.');
  } catch (err) {
    console.log('User fetching failed.', err);
    return null;
  }
};

router.get('/feed', async function (req, res) {
  try {
    const posts = await Posts.find().sort('-createdAt').lean();

    if (req.isUserServiceEnabled === true) {
      for (const post of posts) {
        const author = await getUserFromService(post.authorId);
        post.author = author;
      }
    }

    return res.status(200).json({ success: true, message: 'Fetched post feed.', data: { posts } });
  } catch (error) {
    console.error('Error fetching posts feed:', error);

    return res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
});

router.get('/:id', async function (req, res) {
  try {
    const post = await Posts.findById(req.params.id).lean();
    if (!post) return res.status(404).json({ success: false, message: 'Post not found.', data: { post: null } });

    if (req.isUserServiceEnabled === true) {
      const author = await getUserFromService(post.authorId);
      if (!author) return res.status(404).json({ success: false, message: 'Author not found.', data: { post: null } });
      post.author = author;
    }

    return res.status(200).json({ success: true, message: 'Fetched single post.', data: { post } });
  } catch (error) {
    console.error('Error fetching single post:', error);

    return res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
});

router.post('/', async function (req, res) {
  try {
    const { authorId, title, body } = req.body;
    if (!authorId || !title || !body)
      return res.status(400).json({ success: false, message: 'Missing required fields.', data: null });

    const newPost = await Posts.create(req.body);

    return res.status(201).json({ success: true, message: 'Created new post.', data: { post: newPost } });
  } catch (error) {
    console.error('Error creating new post:', error);

    return res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
});

module.exports = router;
