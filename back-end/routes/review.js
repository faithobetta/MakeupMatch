import express from 'express';
import {  postReview, fetchReviews } from '../controllers/reviewController.js';
const router = express.Router();
router.post('/post-review', postReview); // Route to post a review
router.get('/reviews/:artistId', fetchReviews); // Route
export default router;
