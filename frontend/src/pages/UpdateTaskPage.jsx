import React, { useEffect, useState } from "react";
import { useTaskStore } from "../store/useTaskStore";
import { useNavigate, useParams } from "react-router-dom";
import PastDate from "../Helper/PastDate";
import toast from "react-hot-toast";

const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // Gets YYYY-MM-DD part only
};

function UpdateTaskPage() {
  const params = useParams();
  const { updateTask, getTask, task } = useTaskStore();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Work",
    status: "To-Do",
    dueDate: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    getTask(params.taskId);
  }, [getTask, params.taskId]);

  useEffect(() => {
    if (task) {
      setFormData({
        ...task,
        dueDate: formatDateForInput(task.dueDate),
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (PastDate(formData.dueDate)) {
      toast.error("Due Date must be future date");
      return;
    }
    console.log("Form submitted",task._id);
    updateTask(formData,task._id);
    navigate("/");
  };

  if (!formData) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10 text-center">
        <p>Loading task data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData?.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <input
            type="text"
            name="description"
            value={formData?.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData?.category}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData?.status}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="To-Do">To-Do</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData?.dueDate}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Update Task
        </button>
      </form>
    </div>
  );
}

export default UpdateTaskPage;
