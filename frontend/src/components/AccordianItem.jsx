import { useState } from "react";
import { Link } from "react-router-dom";
import { useTaskStore } from "../store/useTaskStore";
import formatDate from "../Helper/FormatDate";
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

const AccordianItem = ({ title, color = "bg-blue-300", tasks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteTask } = useTaskStore();

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = (taskId) => {
    deleteTask(taskId);
  };

  return (
    <div className="mb-4">
      <button
        onClick={toggleAccordion}
        className={`w-[90%] md:w-full font-bold text-left ${color} py-2 px-2 md:px-4 rounded-lg focus:outline-none flex justify-between`}
      >
        <p>{title}</p>
        <span>
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          )}
        </span>
      </button>
      {isOpen &&
        (tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task._id}
              className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-0 bg-gray-100 p-4 rounded-lg mt-2 relative"
            >
              <p
                className={`col-span-1 max-sm:truncate text-sm md:text-md font-semibold ${
                  title == "Completed" ? "line-through" : ""
                }`}
              >
                {task.title}
              </p>

              <p className="text-sm md:text-md max-sm:truncate font-semibold">
                {formatDate(task.dueDate)}
              </p>
              <p className="text-sm md:text-md hidden md:block font-semibold">{task.status}</p>
              <p className="text-sm md:text-md hidden md:block font-semibold">{task.category}</p>
              <div className="text-sm md:text-md flex justify-start gap-1 md:gap-5">
                <button className="text-white bg-black p-2 text-sm font-semibold cursor-pointer">
                  <Link to={`/updatetask/${task._id}`} className="flex gap-1">
                    <MdEdit size={20} />
                    <span className="hidden md:block">Edit</span>
                  </Link>
                </button>
                <button
                  className="flex gap-1 text-white bg-red-500 p-2 text-sm font-semibold cursor-pointer"
                  onClick={() => handleDelete(task._id)}
                >
                  <FaRegTrashAlt size={20} />
                  <span className="hidden md:block">Delete</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-30 flex justify-center items-center font-bold">
            No Tasks {title != "In-Progress" && "in"} {title}
          </div>
        ))}
    </div>
  );
};

export default AccordianItem;
