import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <main className="w-full min-h-[100vh] flex justify-center items-center bg-black">
      <form className="border-2 rounded flex flex-col border-amber-50 bg-white w-[30vw] p-4">
        <h1 className="m-2 font-bold text-2xl">Login Account</h1>
        <input
          type="email"
          placeholder="Email"
          className="p-2 outline-none m-2 border-1 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 outline-none m-2 border-1 rounded"
        />

        <div className="m-2 flex justify-between items-center">
          <span>
            Don't have an account?{" "}
            <Link className="text-blue-500 underline" href="/register">
              Sign up
            </Link>
          </span>
          <button className="bg-blue-300 p-2 px-4 rounded">Login</button>
        </div>
      </form>
    </main>
  );
};

export default Login;
