import React, { useEffect } from "react";
import { useTaskStore } from "../store/useTaskStore";
import TaskCard from "../components/TaskCard";

function GridView() {
  const { tasks, getTasks } = useTaskStore();

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <div className="grid grid-cols-2 max-sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4  gap-5">
        {tasks?.map(task => (
            <TaskCard task={task} key={task._id} showStatus={true} />
        ))}
    </div>
  );
}

export default GridView;
