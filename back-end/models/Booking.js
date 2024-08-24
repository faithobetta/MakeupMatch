import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
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
  service: {
    type: Schema.Types.ObjectId,
    ref: 'Services',
    required: true
  },
  bookingDate: {
    type: Date,
    required: true
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

bookingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Booking = model('Booking', bookingSchema);

export default Booking;
