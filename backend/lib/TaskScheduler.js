import cron from 'node-cron';
import Task from "../models/tasks.models.js";

const updateTaskStatuses = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const result = await Task.updateMany(
      { 
        dueDate: { $lt: today },
        status: { $ne: "Completed" }
      },
      { 
        $set: { status: "Pending" } 
      }
    );
    
    console.log(`Updated ${result.modifiedCount} tasks to Pending status`);
  } catch (error) {
    console.error("Error updating task statuses:", error);
  }
};

cron.schedule('0 0 * * *', updateTaskStatuses);

updateTaskStatuses();

export default { updateTaskStatuses };