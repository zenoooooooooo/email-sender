"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LoginFormValues, loginSchema } from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";

async function loginUser(url: string, { arg }: { arg: Omit<IUser, "name"> }) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Registration failed");
  }

  return res.json();
}

const Login = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const { trigger, isMutating } = useSWRMutation("/api/login", loginUser);

  async function onSubmit(data: LoginFormValues) {
    try {
      const result = await trigger(data);
      console.log("Login Success: " + result);
      localStorage.setItem("token", result.token);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md border-2 rounded-lg border-amber-100 bg-white p-6 shadow-xl"
      >
        <h1 className="mb-4 font-bold text-2xl text-center text-gray-800">
          Login Account
        </h1>

        <input
          {...register("email", {
            required: "Email is required",
          })}
          type="email"
          placeholder="Email"
          className="p-3 border rounded w-full mb-2 outline-none focus:ring-2 focus:ring-amber-400"
        />
        {errors.email && (
          <span className="text-red-500 text-sm mb-2 block">
            {errors.email.message}
          </span>
        )}

        <input
          {...register("password", {
            required: "Password is required",
          })}
          type="password"
          placeholder="Password"
          className="p-3 border rounded w-full mb-2 outline-none focus:ring-2 focus:ring-amber-400"
        />
        {errors.password && (
          <span className="text-red-500 text-sm mb-2 block">
            {errors.password.message}
          </span>
        )}

        <div className="mt-4 flex justify-between items-center text-sm text-gray-700">
          <span>
            Don't have an account?{" "}
            <Link className="text-blue-500 underline" href="/register">
              Sign up
            </Link>
          </span>
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded transition-all duration-200"
          >
            {isMutating ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default Login;
