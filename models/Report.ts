import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String },
  department: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String }, // Base64 or URL
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Report || mongoose.model('Report', ReportSchema);