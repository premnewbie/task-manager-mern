import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import RedirectAuthenticatedUsers from "./providers/RedirectAuthenticatedUsers";
import RedirectUnAuthenticatedUsers from "./providers/RedirectUnAuthenticatedUsers";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import AddTaskPage from "./pages/AddTaskPage";
import UpdateTaskPage from "./pages/UpdateTaskPage";

function App() {
  const { getUser } = useAuthStore();

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <div className="p-2 bg-gray-200 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center">Task Manager</h1>
      <Toaster />
      <Routes>
        <Route
          path={"/"}
          element={
            <RedirectUnAuthenticatedUsers>
              <Home />
            </RedirectUnAuthenticatedUsers>
          }
        />
        <Route
          path={"/addtask"}
          element={
            <RedirectUnAuthenticatedUsers>
              <AddTaskPage />
            </RedirectUnAuthenticatedUsers>
          }
        />
        <Route
          path={"/updatetask/:taskId"}
          element={
            <RedirectUnAuthenticatedUsers>
              <UpdateTaskPage />
            </RedirectUnAuthenticatedUsers>
          }
        />
        <Route
          path={"/login"}
          element={
            <RedirectAuthenticatedUsers heading="Log in">
              <Login />
            </RedirectAuthenticatedUsers>
          }
        />
        <Route
          path={"/signup"}
          element={
            <RedirectAuthenticatedUsers heading="Sign up">
              <Signup />
            </RedirectAuthenticatedUsers>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
