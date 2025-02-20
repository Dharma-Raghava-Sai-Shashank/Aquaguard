import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isload, setIsload] = useState(false);
  const navigate = useNavigate();
  const handlelogin = async (e) => {
    try {
      e.preventDefault();
      setIsload(true);
      console.log("handling login");
      const response = await axios.post(
        "http://localhost:1000/agglomeration/user/Login",
        {
          email,
          password,
        }
      );
      console.log(response);
      console.log("main caallla");
      localStorage.setItem("itemhai", response.data.user._id);
      localStorage.setItem("token", response.data.jwttoken);
      localStorage.setItem("username", response.data.user.username);
      localStorage.setItem("email", response.data.user.email);
      toast.success(response.data.message);
      navigate("/random");
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      }
      setIsload(false);
    }
  };
  return (
    <>
      <div
        className="flex items-center justify-center h-screen"
        style={{ backgroundColor: "#72A0C1" }}
      >
        <div
          className="w-full max-w-md p-8 shadow-md"
          style={{
            backgroundColor: "#F0F8FF",
            borderRadius: "50px",
            borderColor: "black",
          }}
        >
          <div className="flex flex-col items-center mb-6">
            <div className="text-blue-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m2 8H7a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Sign in</h2>
            <p className="text-gray-500">to continue to Docs</p>
          </div>
          <form onSubmit={handlelogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                required
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  // console.log(email);
                }}
                className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  // console.log(password);
                }}
                className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <details class="p-1 border rounded-md bg-gray-50">
              <summary class="font-semibold text-lg cursor-pointer text-black">
                Signup with Admin ID
              </summary>
              <p class="mt-2 text-gray-700">
                If you are an admin, use your admin ID and password to register.
                Ensure your credentials match the required admin format before
                proceeding.
              </p>
            </details>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign In
            </button>
            {isload ? (
              <>
                {" "}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div class="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
                </div>
              </>
            ) : (
              <></>
            )}
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default SignInPage;
