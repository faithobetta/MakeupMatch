import { Schema, model } from 'mongoose';

// Define the Artist schema
const artistSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  // Reference to ArtistDashboard
  dashboard: {
    type: Schema.Types.ObjectId,
    ref: 'ArtistDashboard'
  }
});

// Update the updatedAt field before saving
artistSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Export the Artist model
const Artist = model('Artist', artistSchema);

export default Artist;
