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

const Reviews = model('Reviews', reviewsSchema);

export default Reviews;
