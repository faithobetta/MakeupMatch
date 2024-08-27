import { Schema, model } from 'mongoose';

// Define the ArtistDashboard schema
const artistDashboardSchema = new Schema({
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true
  },
  brandName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  fileUrl: {
    type: [String], 
    required: true
  },
  contactNumber: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  // Array of references to Services
  services: [{
    type: Schema.Types.ObjectId,
    ref: 'Services'
  }]
});

// Update the updatedAt field before saving
artistDashboardSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// After saving the dashboard, update the corresponding artist's dashboard reference
artistDashboardSchema.post('save', async function(doc, next) {
  try {
    await model('Artist').findByIdAndUpdate(doc.artist, { dashboard: doc._id });
    next();
  } catch (err) {
    next(err);
  }
});

// Export the ArtistDashboard model
const ArtistDashboard = model('ArtistDashboard', artistDashboardSchema);

export default ArtistDashboard;
