import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    category: { type: String, required: true },
    dueDate: { type: Date, required: true },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Task = mongoose.model.Task || mongoose.model("Task", taskSchema);

export default Task;
