import toast from "react-hot-toast";
import { useDNDStore } from "../store/useDNDStore";
import { useTaskStore } from "../store/useTaskStore";
import TaskCard from "./TaskCard";
import PastDate from "../Helper/PastDate";

function TasksContainer({ heading, tasks }) {
  const { dragItem } = useDNDStore();
  const { updateTask } = useTaskStore();

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    e.preventDefault();

    if (PastDate(dragItem.dueDate) && heading.toLowerCase() !== "completed") {
      toast.error("Due date has been crossed for the task to move");
      return;
    }
    if (heading.toLowerCase() === "pending") return;

    if (heading.toLowerCase() === dragItem.status.toLowerCase()) return;

    dragItem.status = heading;
    await updateTask(dragItem, dragItem._id);
  };

  return (
    <div
      className="bg-[#e7e7e7] min-h-[60vh] border-2 rounded-xl"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h3 className="p-2 text-xl text-center font-bold">{heading}</h3>
      {tasks && tasks.length > 0 && (
        <div className="p-2">
          {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}
      {tasks && tasks.length === 0 && (
        <div className="h-[80%] flex justify-center items-center font-semibold text-red-500">
          <h5>No task</h5>
        </div>
      )}
    </div>
  );
}

export default TasksContainer;
