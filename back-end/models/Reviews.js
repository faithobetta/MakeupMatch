import { Schema, model } from 'mongoose';

const reviewsSchema = new Schema({
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

reviewsSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Review = model('Review', reviewsSchema);  // Updated model name to singular 'Review'

export default Review;
