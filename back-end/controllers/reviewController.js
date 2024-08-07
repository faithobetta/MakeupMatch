import { db } from '../db.js';
// Post a review
export const postReview = (req, res) => {
  const { Artist_id, Client_id, Rating, Comment } = req.body;

  if (!Artist_id || !Client_id || !Rating) {
    return res.status(400).json("Artist ID, Client ID, and Rating are required");
  }

  if (Rating < 1 || Rating > 5) {
    return res.status(400).json("Rating must be between 1 and 5");
  }

  const insertQuery = "INSERT INTO Reviews (Artist_id, Client_id, Rating, Comment) VALUES (?, ?, ?, ?)";
  const insertValues = [Artist_id, Client_id, Rating, Comment];

  db.query(insertQuery, insertValues, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(201).json({ message: "Review posted successfully.", reviewId: result.insertId });
  });
};

// Fetch reviews for a specific artist
export const fetchReviews = (req, res) => {
  const { artistId } = req.params;

  const query = "SELECT * FROM Reviews WHERE Artist_id = ?";
  db.query(query, artistId, (err, reviews) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(reviews);
  });
};