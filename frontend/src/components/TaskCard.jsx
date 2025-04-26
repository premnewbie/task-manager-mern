import { useState, useEffect, useRef } from "react";
import formatTime from "../Helper/FormatDate";
import { useDNDStore } from "../store/useDNDStore";
import { useTaskStore } from "../store/useTaskStore";
import { Link } from "react-router-dom";
import { TbDotsCircleHorizontal } from "react-icons/tb";

function TaskCard({ task, showStatus }) {
  const { handleSetDragItem } = useDNDStore();
  const [open, setOpen] = useState(false);
  const popupRef = useRef(null);
  const isDraggable = task.status.toLowerCase !== "pending";
  const { deleteTask } = useTaskStore();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        open &&
        popupRef.current &&
        !popupRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleDragStart = (e) => {
    if (!isDraggable) return;
    e.target.style.opacity = "0.5";
    handleSetDragItem(task);
  };

  const handleDragEnd = (e) => {
    if (!isDraggable) return;
    e.target.style.opacity = "1";
  };

  const handleDelete = () => {
    deleteTask(task._id);
  };

  return (
    <div
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`m-4 border-2 flex flex-col p-2 select-none gap-2 rounded-lg ${
        isDraggable ? "cursor-move" : "cursor-not-allowed"
      }`}
    >
      <div className="flex justify-between items-center">
        <h4 className="truncate font-semibold text-xl">{task.title}</h4>
        <div className="text-2xl font-bold -mt-2 relative">
          {showStatus && (
            <h5 className="font-semibold text-sm text-blue-600">
              {task.status}
            </h5>
          )}
          {!showStatus && (
            <span
              onClick={() => setOpen(!open)}
              className="cursor-pointer tracking-widest"
            >
              <TbDotsCircleHorizontal className="hover:bg-black hover:text-white hover:rounded-full" />
            </span>
          )}
          {!showStatus && open && (
            <div
              ref={popupRef}
              className="absolute bg-[#f5f5f5] shadow-md pb-2 px-5 text-base font-normal right-0 top-0"
            >
              <Link to={`/updatetask/${task._id}`}>
                <p className="mb-2 pb-2 border-b border-gray-300">Edit</p>
              </Link>
              <p className="text-red-500 cursor-pointer" onClick={handleDelete}>
                Delete
              </p>
            </div>
          )}
        </div>
      </div>
      <p>{task.description}</p>
      <div className="flex justify-between">
        <p className="text-gray-500 text-sm">{task.category}</p>
        <p className="text-red-500 text-sm font-semibold">
          {formatTime(task.dueDate)}
        </p>
      </div>
      {showStatus && (
        <div className="flex justify-between">
          <button className="bg-black text-white text-sm cursor-pointer p-2 rounded">
            <Link to={`/updatetask/${task._id}`}>Edit</Link>
          </button>
          <button className="bg-red-500 text-white text-sm cursor-pointer p-2 rounded" onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default TaskCard;
