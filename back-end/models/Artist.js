import { Schema, model } from 'mongoose';

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
  }
});

artistSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Artist = model('Artist', artistSchema);

export default Artist;
