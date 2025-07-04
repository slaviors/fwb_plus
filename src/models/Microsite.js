import mongoose from 'mongoose';
import connectToDatabase from '../lib/mongodb.js';

const linkSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  order: {
    type: Number,
    required: true,
    default: 0
  }
});

const socialMediaSchema = new mongoose.Schema({
  website: {
    type: String,
    trim: true,
    default: ''
  },
  whatsapp: {
    type: String,
    trim: true,
    default: ''
  },
  instagram: {
    type: String,
    trim: true,
    default: ''
  },
  facebook: {
    type: String,
    trim: true,
    default: ''
  },
  twitter: {
    type: String,
    trim: true,
    default: ''
  }
});

const micrositeSchema = new mongoose.Schema({
  links: [linkSchema],
  socialMedia: {
    type: socialMediaSchema,
    default: () => ({})
  },
  createdBy: {
    type: String,
    required: true
  },
  isPublished: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Microsite = mongoose.models.Microsite || mongoose.model('Microsite', micrositeSchema);

export class MicrositeClass {
  static async get() {
    await connectToDatabase();
    return await Microsite.findOne().sort({ createdAt: -1 });
  }

  static async create(micrositeData) {
    await connectToDatabase();
    const microsite = new Microsite(micrositeData);
    return await microsite.save();
  }

  static async update(id, micrositeData) {
    await connectToDatabase();
    return await Microsite.findByIdAndUpdate(id, micrositeData, { new: true });
  }

  static async publish(id) {
    await connectToDatabase();
    return await Microsite.findByIdAndUpdate(id, { isPublished: true }, { new: true });
  }

  static async getPublished() {
    await connectToDatabase();
    return await Microsite.findOne({ isPublished: true }).sort({ updatedAt: -1 });
  }
}

export { MicrositeClass as Microsite };