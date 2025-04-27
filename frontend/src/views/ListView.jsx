import { useEffect } from "react";
import { useTaskStore } from "../store/useTaskStore";
import AccordianItem from "../components/AccordianItem";

const containerHeading = ["To-Do", "In-Progress", "Completed", "Pending"];

function ListView() {
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
    <div className="sm:w-[90%] w-full mx-auto">
      <div className="grid grid-cols-3 md:grid-cols-5 font-semibold text-gray-700 p-2 gap-2 md:gap-0">
        <h3 className="text-sm md:text-md">Task Name</h3>
        <h3 className="text-sm md:text-md">Due On</h3>
        <h3 className="text-sm md:text-md hidden md:block">Task Status</h3>
        <h3 className="text-sm md:text-md hidden md:block ">Task Category</h3>
        <h3 className="text-sm md:text-md">Options</h3>
      </div>
      {containerHeading.map((heading) => (
        <AccordianItem
          key={heading}
          title={heading}
          tasks={filterTasks(heading)}
        />
      ))}
    </div>
  );
}

export default ListView;
