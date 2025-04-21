"use client";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { RegisterFormValues, registerSchema } from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";

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
      console.log("Registration Success: " + result);
      router.push("/login");
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
        <h1 className="m-2 font-bold text-2xl">Register Account</h1>
        <input
          {...register("name", {
            required: "Name is required",
          })}
          type="text"
          placeholder="Name"
          className="p-2 outline-none m-2 border-1 rounded"
        />
        {errors.name && (
          <span className="text-red-500 ml-2">{errors.name.message}</span>
        )}
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
        <input
          {...register("confirmPassword", {
            required: "Confirm Password is required",
          })}
          type="password"
          placeholder="Confirm Password"
          className="p-2 outline-none m-2 border-1 rounded"
        />
        {errors.confirmPassword && (
          <span className="text-red-500 ml-2">
            {errors.confirmPassword.message}
          </span>
        )}
        <div className="m-2 flex justify-between items-center">
          <span>
            Already have an account?{" "}
            <Link className="text-blue-500 underline" href="/login">
              Sign in
            </Link>
          </span>
          <button
            type="submit"
            disabled={isMutating}
            className="ml-auto mr-2 mt-2 bg-blue-300 hover:bg-blue-400 transition p-2 px-4 rounded disabled:opacity-50"
          >
            {isMutating ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default Register;
