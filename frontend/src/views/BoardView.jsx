import { useEffect } from "react";
import TasksContainer from "../components/TasksContainer";
import { useTaskStore } from "../store/useTaskStore";

const containerHeading = ["To-Do", "In-Progress", "Completed", "Pending"];

function BoardView() {
  const { tasks, getTasks } = useTaskStore();

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const filterTasks = (status) => {
    const dataToReturn = tasks.filter(
      (task) => task.status.toLowerCase() === status.toLowerCase()
    );
    return dataToReturn;
  };

  return (
    <div className="grid grid-cols-2 max-sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4  gap-5">
      {containerHeading.map((heading) => (
          <TasksContainer
            key={heading}
            heading={heading}
            tasks={filterTasks(heading)}
          />
        ))}
    </div>
  );
}

export default BoardView;
