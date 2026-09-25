import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    faculty: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
