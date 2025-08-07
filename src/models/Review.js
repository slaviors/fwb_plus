import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    star: { type: Number, required: true, min: 1, max: 5 },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);