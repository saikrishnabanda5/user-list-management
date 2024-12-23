import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiOutlineUser } from "react-icons/ai";
import { TbLockPassword } from "react-icons/tb";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("authToken", token);
      navigate("/user");
    } catch (err) {}
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <div className="mb-4">
          <div className="flex items-center pb-4">
            <AiOutlineUser size={30} />
            <input
              id="email"
              type="text"
              {...register("email", {
                required: "Email is required",
                minLength: {
                  value: 3,
                  message: "Email must be at least 3 characters",
                },
              })}
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
              placeholder="Enter your email"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-6">
          <div className="flex items-center pb-4">
            <TbLockPassword size={30} />
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
              placeholder="Enter your password"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
