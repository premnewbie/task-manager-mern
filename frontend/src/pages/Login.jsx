import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const { login, isLoading } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(formData.email,formData.password);
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-700 animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col h-[40%] md:h-[80%] lg:h-[90%] p-10 md:p-8 items-center justify-between gap-2"
    >
      <input
        type="email"
        className="w-full h-10 border-gray-500 border-2 rounded text-lg p-2"
        placeholder="Email"
        value={formData.email}
        required
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        className="w-full h-10 border-gray-500 border-2 rounded text-lg p-2"
        placeholder="Password"
        value={formData.password}
        required
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button
        type="submit"
        className="bg-red-400 active:bg-red-300 text-white text-lg font-bold border-black w-full md:w-[250px] h-10 rounded-lg"
      >
        Log in
      </button>
      <p className="text-xl">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-700 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}

export default Login;
