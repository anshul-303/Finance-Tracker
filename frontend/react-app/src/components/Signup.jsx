import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { postSignUpData } from "../fetchApi";
import { postSignUpData } from "../fetchApi/SignupApi/SignupApi";

export default function Signup(props) {
  const [name, setName] = useState(""); //State for name bar
  const [email, setEmail] = useState(""); //State for name bar
  const [password, setPassword] = useState(""); //State for name bar

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
  });

  const navigate = useNavigate();

  return (
    <div className="bg-zinc-900 w-screen h-screen flex justify-center items-center text-white">
      <div
        className={`w-[75vw] min-h-[55vh] md:w-[62vw] md:min-h-[50vh] lg:w-[32vw] lg:min-h-[79vh]  bg-zinc-900 pt-[1rem] rounded-[10px] border-[5px] border border-zinc-700 flex flex-col gap-3.5 ${
          errors.name || errors.email || errors.password
            ? "lg:gap-[0.5rem]"
            : "lg:gap-1.6"
        } justify-top items-center text-white`}
      >
        <div className="text-[2rem]">Finance Tracker</div>
        <div className="text-gray-500 text-[0.74rem] lg:text-[0.78rem] text-center">
          Create an account and start tracking your finances!
        </div>

        <label className="text-[1rem]">First name</label>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors((prev) => ({
              ...prev,
              name: "",
            }));
          }}
          type="text"
          placeholder="Enter your name"
          className={`text-center text-[1.3rem] md:w-[40vw] lg:w-[50vh] border border-[2px] rounded-[4px] ${
            errors.name ? `border-rose-400` : ` border-zinc-700`
          }`}
        />
        {errors.name && (
          <p className="text-rose-400 text-[0.7em]  p-0 m-0">{errors.name}</p>
        )}
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
          className={`text-center text-[1.3rem]  md:w-[40vw] lg:w-[50vh] border border-[2px] rounded-[4px] ${
            errors.name ? `border-rose-400` : ` border-zinc-700`
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
          type="password"
          placeholder="Enter your password"
          className={`text-center text-[1.3rem] md:w-[40vw] lg:w-[50vh] border border-[2px] rounded-[4px] ${
            errors.name ? `border-rose-400` : ` border-zinc-700`
          }`}
        />
        {errors.password && (
          <p className="text-rose-400 text-[0.6em] lg:w-[70%] text-center  p-0 m-0">
            {errors.password}
          </p>
        )}

        <button
          onClick={
            () => postSignUpData(name, email, password, navigate, setErrors)
            //Above posts signup data to /signup route and navigates to login if successful
          }
          className="w-[20vh] bg-black text-white py-2 my-[0.5rem] rounded-md font-medium hover:bg-zinc-800 transition active:bg-zinc-900 border border-[2px] border-zinc-700"
        >
          Sign Up
        </button>
        <div className="text-[0.85rem] lg:text-[0.9rem] text-center mb-7 lg:mb-2 ">
          Already have an account? Click{" "}
          <span className="underline">
            <Link to="/login">here</Link>{" "}
            {/* Here used react router to go to login account already exists! */}
          </span>{" "}
          to login.
        </div>
      </div>
    </div>
  );
}
