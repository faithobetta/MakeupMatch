import { Schema, model } from 'mongoose';

const servicesSchema = new Schema({
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true
  },
  serviceName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: Number, // duration in minutes
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

servicesSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Services = model('Services', servicesSchema);

export default Services;
