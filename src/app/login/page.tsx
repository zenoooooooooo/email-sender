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
    <main className="w-full min-h-[100vh] flex justify-center items-center bg-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-2 rounded flex flex-col border-amber-50 bg-white w-[30vw] p-4"
      >
        <h1 className="m-2 font-bold text-2xl">Login Account</h1>
        <input
          {...register("email", {
            required: "Email is required",
          })}
          type="email"
          placeholder="Email"
          className="p-2 outline-none m-2 border-1 rounded"
        />
        {errors.email && (
          <span className="text-red-500 ml-2">{errors.email.message}</span>
        )}
        <input
          {...register("password", {
            required: "Password is required",
          })}
          type="password"
          placeholder="Password"
          className="p-2 outline-none m-2 border-1 rounded"
        />
        {errors.password && (
          <span className="text-red-500 ml-2">{errors.password.message}</span>
        )}
        <div className="m-2 flex justify-between items-center">
          <span>
            Don't have an account?{" "}
            <Link className="text-blue-500 underline" href="/register">
              Sign up
            </Link>
          </span>
          <button type="submit" className="bg-blue-300 p-2 px-4 rounded">
            Login
          </button>
        </div>
      </form>
    </main>
  );
};

export default Login;
