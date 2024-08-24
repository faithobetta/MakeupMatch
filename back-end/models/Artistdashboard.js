import { Schema, model } from 'mongoose';

const artistdashboardSchema = new Schema({
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
    type: String,
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
  }
});

artistdashboardSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Artistdashboard = model('Artistdashboard', artistdashboardSchema);

export default Artistdashboard;
