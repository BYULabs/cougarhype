import express from 'express';

import { getHomePage } from './controllers/index.js';

const router = express.Router();

// Home Page Route
router.get('/', getHomePage);

// (Optional) Future routes for Hype Feed API endpoints can go here:
// router.get('/api/posts', postsController.getPosts);
// router.post('/api/posts', postsController.createPost);

export default router;
