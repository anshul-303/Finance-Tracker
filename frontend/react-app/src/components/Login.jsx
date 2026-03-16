import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postLoginData } from "../fetchApi/LoginApi/loginApi";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  return (
    <div className="bg-zinc-900 w-screen h-screen flex justify-center items-center text-white">
      <div
        className={`bg-zinc-900 w-[75vw] min-h-[50vh] md:w-[60vw] md:min-h-[50vh] lg:w-[32vw] lg:min-h-[83vh] flex flex-col pt-[1rem] justify-top gap-4.5 md:gap-6 ${
          errors.name || errors.email || errors.password
            ? "lg:gap-[0.8rem]"
            : "lg:gap-1.6"
        } rounded-[10px] border-[5px] border border-zinc-700 items-center text-white`}
      >
        <div className="text-[2rem]">Finance Tracker</div>
        <div className="text-gray-500 text-[0.78rem]">
          Welcome back! please login into your account.
        </div>
        <label className="text-[1rem]">Email ID</label>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({
              ...prev,
              email: "",
            }));
          }}
          type="text"
          placeholder="Enter your email ID"
          className={`text-center text-[1.3rem] w-[80%] border border-[2px] rounded-[4px] ${
            errors.email ? `border-rose-400` : ` border-zinc-700`
          }`}
        />
        {errors.email && (
          <p className="text-rose-400 text-[0.7em] p-0 m-0">{errors.email}</p>
        )}
        <label className="text-[1rem]">Password</label>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({
              ...prev,
              password: "",
            }));
          }}
          type="text"
          placeholder="Enter your password"
          className={`text-center text-[1.3rem] w-[80%] border border-[2px] rounded-[4px] ${
            errors.password ? `border-rose-400` : ` border-zinc-700`
          }`}
        />
        {errors.password && (
          <p className="text-rose-400 text-[0.7em] p-0 m-0">
            {errors.password}
          </p>
        )}
        <button
          onClick={() => {
            postLoginData(
              email,
              password,
              navigate,
              props.setIsLoggedIn,
              setErrors
            );
          }}
          className="w-[60%] bg-black text-white py-2 my-[0.5rem] rounded-md font-medium hover:bg-zinc-800 transition active:bg-zinc-900 border border-[2px] border-zinc-700"
        >
          Login
        </button>
        <div className="text-[0.85rem] lg:text-[0.9rem]">
          Don't have an account? Click{" "}
          <span className="underline">
            <Link to="/">here</Link>
          </span>{" "}
          to sign up.
        </div>
      </div>
    </div>
  );
}
