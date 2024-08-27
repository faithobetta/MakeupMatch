import Review from '../models/Reviews.js';
import Artist from '../models/Artist.js';
import Client from '../models/Client.js';

// Post a review
export const postReview = async (req, res) => {
  const { artist, client, rating, comment } = req.body;  // Updated field names

  if (!artist || !client || !rating) {
    return res.status(400).json("Artist ID, Client ID, and Rating are required");
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json("Rating must be between 1 and 5");
  }

  try {
    const newReview = new Review({
      artist,
      client,
      rating,
      comment
    });

    const savedReview = await newReview.save();
    return res.status(201).json({ message: "Review posted successfully.", reviewId: savedReview._id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Fetch reviews for a specific artist
export const fetchReviews = async (req, res) => {
  const { artistId } = req.params;

  if (!artistId) {
    return res.status(400).json("Artist ID is required");
  }

  try {
    const reviews = await Review.find({ artist: artistId })  // Updated query field
      .populate('client', 'name email')  // Updated to match the fields
      .exec();

    if (!reviews || reviews.length === 0) {
      return res.status(404).json("No reviews found for this artist");
    }

    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
