"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";
import { welcomeEmailSchema } from "@/validations/welcomeEmail";
import WelcomeEmail from "../components/templates/WelcomeEmail";
import Nav from "../components/Nav";
import { useRouter } from "next/navigation";

async function sendWelcomeEmail(url: string, { arg }: { arg: IWelcomeEmail }) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Sending email failed");
  }

  return res.json();
}

const WelcomeEmailPage = () => {
  const router = useRouter();

  const [user, setUser] = useState("");

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("/api/protected-route", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Invalid or expired token");
        }

        const data = await response.json();
        setUser(data.user.email);
      } catch (err) {
        console.error("Token validation failed:", err);
        localStorage.removeItem("token");
        router.push("/login");
      }
    };

    validateToken();
  }, [router]);

  const [emailData, setEmailData] = useState({
    recipients: "",
    name: "",
    email: "",
    loginLink: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(welcomeEmailSchema),
    defaultValues: emailData,
  });

  const { trigger, isMutating } = useSWRMutation(
    "/api/welcomeEmail",
    sendWelcomeEmail
  );
  const onSubmit = async (data: typeof emailData) => {
    const recipientsArray = data.recipients
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email.length > 0);

    const payload = {
      ...data,
      recipients: recipientsArray,
      user: user,
    };

    try {
      const result = await trigger(payload);
      console.log("Email sent successfully: ", result);
    } catch (error) {
      console.error("Error sending email: ", error);
    }
  };

  function normalizeUrl(url: string): string {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEmailData((prevData) => ({
      ...prevData,
      [name]: name === "loginLink" ? normalizeUrl(value) : value,
    }));
  };

  return (
    <div className="min-h-screen h-full flex flex-col">
      <Nav />
      <main className="flex-grow w-full gap-2 flex flex-col md:flex-row justify-around bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 items-center p-4">
        <div className="bg-gray-400 p-6 rounded-md">
          <h2 className="text-2xl text-center font-semibold text-white mb-6">
            Template Review
          </h2>
          <WelcomeEmail
            name={emailData.name}
            email={emailData.email}
            loginLink={emailData.loginLink}
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:w-1/3 w-full border-2 rounded-lg border-amber-100 bg-white p-6 shadow-xl"
        >
          <h1 className="mb-4 font-bold text-2xl text-center text-gray-800">
            Send Welcome Email
          </h1>

          <input
            {...register("recipients")}
            type="text"
            name="recipients"
            placeholder="Recipients (comma-separated)"
            value={emailData.recipients}
            onChange={handleChange}
            className="p-3 border rounded w-full mb-2 outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errors.recipients && (
            <span className="text-red-500 text-sm mb-2 block">
              {errors.recipients.message}
            </span>
          )}

          <input
            {...register("name")}
            type="text"
            name="name"
            placeholder="Name"
            value={emailData.name}
            onChange={handleChange}
            className="p-3 border rounded w-full mb-2 outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errors.name && (
            <span className="text-red-500 text-sm mb-2 block">
              {errors.name.message}
            </span>
          )}

          <input
            {...register("email")}
            type="email"
            name="email"
            placeholder="Email"
            value={emailData.email}
            onChange={handleChange}
            className="p-3 border rounded w-full mb-2 outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errors.email && (
            <span className="text-red-500 text-sm mb-2 block">
              {errors.email.message}
            </span>
          )}

          <input
            {...register("loginLink")}
            type="text"
            name="loginLink"
            placeholder="Login Link"
            value={emailData.loginLink}
            onChange={handleChange}
            className="p-3 border rounded w-full mb-2 outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errors.loginLink && (
            <span className="text-red-500 text-sm mb-2 block">
              {errors.loginLink.message}
            </span>
          )}

          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded transition-all duration-200 mt-4"
            disabled={isMutating}
          >
            Send Email
          </button>
        </form>
      </main>
    </div>
  );
};

export default WelcomeEmailPage;
