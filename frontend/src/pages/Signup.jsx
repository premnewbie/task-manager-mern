import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [confPass, setConfPass] = useState("");

  const navigate = useNavigate();

  const { isLoading, signup } = useAuthStore();

  const validatePassword = () => {
    if (formData.password !== confPass) {
      toast.error("Passwords must match");
      return;
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    validatePassword();
    await signup(formData.username,formData.email,formData.password);
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
      onSubmit={handleSignup}
      className="flex flex-col h-[50%] md:h-[80%] lg:h-[90%] p-10 md:p-8 items-center justify-between gap-2"
    >
      <input
        type="text"
        className="w-full h-10 border-gray-500 border-2 rounded-lg text-lg p-2"
        placeholder="Username"
        value={formData.username}
        required
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="email"
        className="w-full h-10 border-gray-500 border-2 rounded-lg text-lg p-2"
        placeholder="Email"
        value={formData.email}
        required
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        className="w-full h-10 border-gray-500 border-2 rounded-lg text-lg p-2"
        placeholder="Password"
        value={formData.password}
        required
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <input
        type="password"
        className="w-full h-10 border-gray-500 border-2 rounded-lg text-lg p-2"
        placeholder="Confirm Password"
        value={confPass}
        required
        onChange={(e) => setConfPass(e.target.value)}
      />
      <button
        type="submit"
        className="bg-red-400 active:bg-red-300 text-white text-lg font-bold border-black w-full md:w-[250px] h-10 rounded-lg"
      >
        Sign up
      </button>
      <p className="text-xl">
        Already having an account?{" "}
        <Link to="/login" className="text-blue-700 hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}

export default Signup;
