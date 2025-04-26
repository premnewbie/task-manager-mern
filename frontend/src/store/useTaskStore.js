import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useTaskStore = create((set, get) => ({
  tasks: [],
  task: null,
  isLoading: false,
  
  createTask: async (formData) => {
    
    set({ isLoading: true });
    try {
      const {title,description,category,status,dueDate} = {...formData};
      
      const response = await axiosInstance.post(`/auth/task`, {
        title,
        description,
        category,
        status,
        dueDate
      });

      console.log("createTask execution reached here")

      const newTask = response.data.task;
      const currentTasks = get().tasks;

      set({
        task: newTask,
        tasks: [...currentTasks, newTask], // push new task to the array
      });
    } catch (error) {
      console.log("Error from create task function in taskStore",error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  searchTask: async (searchTerm) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(
        `/auth/task/search?searchTerm=${searchTerm}`
      );
      const { tasks, message } = await response.data;
      set({ tasks });
      toast.success(message);
    } catch (error) {
      console.log("Error from search task function in taskStore");
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  updateTask: async (taskData,taskId) => {
    set({ isLoading: true });

    try {
      const response = await axiosInstance.put(`/auth/task/${taskId}`, {
        taskData
      });
      const { task, message } = await response.data;
      const taskArr = get().tasks.filter((task) => task._id !== taskId);
      set({ task, tasks: [...taskArr, task] });
      toast.success(message);
    } catch (error) {
      console.log(
        "Error from update task function in task store",
        error.response.data.message
      );
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  getTasks: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/auth/tasks`);
      const { tasks, message } = await response.data;
      set({ tasks: tasks });
      toast.success(message);
    } catch (error) {
      console.log("Error from get tasks function in task store");
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  getTask: async (taskId) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/auth/task/${taskId}`);
      const { task } = await response.data;
      set({ task: task[0] });
    } catch (error) {
      console.log("Error from get task function in task store");
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteTask: async (taskId) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.delete(`/auth/task/${taskId}`);
      const { message } = await response.data;
      const taskArr = get().tasks.filter((task) => task._id !== taskId);
      set({ tasks: taskArr });
      toast.success(message);
    } catch (error) {
      console.log("Error from delete task function in task store");
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));
