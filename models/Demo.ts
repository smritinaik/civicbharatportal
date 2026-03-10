import mongoose from "mongoose";

const TestSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { timestamps: true }
);

export default mongoose.models.Demo ||
  mongoose.model("Demo", TestSchema);
