import React, { useEffect } from "react";
import { useTaskStore } from "../store/useTaskStore";
import TaskCard from "../components/TaskCard";

function GridView() {
  const { tasks, getTasks } = useTaskStore();

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  if(tasks && tasks.length===0){
    return (
      <div className="h-[60vh] flex justify-center items-center text-2xl text-red-600 font-extrabold"><h1>No Task has been created yet</h1></div>
    )
  }

  return (
    <div className="grid grid-cols-2 max-sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4  gap-5">
        {tasks?.map(task => (
            <TaskCard task={task} key={task._id} showStatus={true} />
        ))}
    </div>
  );
}

export default GridView;
