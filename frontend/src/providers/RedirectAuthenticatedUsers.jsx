import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useNavigate } from "react-router-dom";

const RedirectAuthenticatedUsers = ({ heading, children }) => {
  const { user, isLoading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      navigate("/");
    }
  }, [user, navigate, isLoading]);

  if (user) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center gap-5 items-center h-screen">
      <h1 className="text-gray-600 font-bold text-center text-2xl hidden md:block">
        {heading} to Task-Manager
      </h1>
      <div className="grid grid-cols-1 w-full md:grid-cols-5 lg:grid-cols-7">
        <div className="md:col-start-2 md:col-end-5 lg:col-start-3 lg:col-end-6">
          <div
            className={`bg-gray-300 h-screen ${
              heading === "Sign up" ? "md:h-[70vh]" : "md:h-[50vh]"
            } rounded-2xl shadow-md`}
          >
            <div className="flex flex-col justify-center h-full">
              <h1 className="text-gray-600 font-bold text-center text-2xl block md:hidden">
                {heading} to Task-Manager
              </h1>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedirectAuthenticatedUsers;
