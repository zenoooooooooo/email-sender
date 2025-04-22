"use client";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { RegisterFormValues, registerSchema } from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { Slide, toast, ToastContainer } from "react-toastify";

async function registerUser(url: string, { arg }: { arg: IUser }) {
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

const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const { trigger, isMutating } = useSWRMutation("api/register", registerUser);

  async function onSubmit(data: RegisterFormValues) {
    try {
      const result = await trigger(data);
      toast.success("Registered account successfully!");
      console.log("Registration Success: " + result);
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.success("Error registering account!");
    }
  }

  return (
    <main className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md border-2 rounded-lg border-amber-100 bg-white p-6 shadow-xl"
      >
        <h1 className="mb-4 font-bold text-2xl text-center text-gray-800">
          Register Account
        </h1>
        <input
          {...register("name", {
            required: "Name is required",
          })}
          type="text"
          placeholder="Name"
          className="p-3 border rounded w-full mb-2 outline-none focus:ring-2 focus:ring-amber-400"
        />
        {errors.name && (
          <span className="text-red-500 text-sm mb-2 block">
            {errors.name.message}
          </span>
        )}
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
        <input
          {...register("confirmPassword", {
            required: "Confirm Password is required",
          })}
          type="password"
          placeholder="Confirm Password"
          className="p-3 border rounded w-full mb-2 outline-none focus:ring-2 focus:ring-amber-400"
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm mb-2 block">
            {errors.confirmPassword.message}
          </span>
        )}
        <div className="mt-4 flex justify-between items-center text-sm text-gray-700">
          <span>
            Already have an account?{" "}
            <Link className="text-blue-500 underline" href="/login">
              Sign in
            </Link>
          </span>
          <button
            type="submit"
            disabled={isMutating}
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded transition-all duration-200"
          >
            {isMutating ? "Registering..." : "Register"}
          </button>
        </div>
      </form>

    </main>
  );
};

export default Register;
