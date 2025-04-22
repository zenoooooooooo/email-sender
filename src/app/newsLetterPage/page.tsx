"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";
import { newsletterSchema } from "@/validations/newsLetter";
import NewsLetter from "../components/templates/NewsLetter";
import Nav from "../components/Nav";
import { useRouter } from "next/navigation";
import { months } from "@/enums/months";
import { INewsLetter } from "@/types/INewsLetter";
import { Slide, toast, ToastContainer } from "react-toastify";

async function sendNewsLetter(
  url: string,
  { arg }: { arg: INewsLetter & { user: string } }
) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Sending newsletter failed");
  }

  return res.json();
}

const NewsLetterPage = () => {
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

        if (!response.ok) throw new Error("Invalid or expired token");

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

  const [newsletterData, setNewsletterData] = useState({
    recipients: "",
    name: "",
    month: months.JANUARY,
    headline: "",
    content: "",
    unsubscribeLink: "",
    author: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newsletterSchema),
    defaultValues: newsletterData,
  });

  const { trigger, isMutating } = useSWRMutation(
    "/api/newsLetter",
    sendNewsLetter
  );

  const onSubmit = async (data: typeof newsletterData) => {
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
      toast.success("Email sent successfully!");
      console.log("Newsletter sent successfully:", result);
      reset();
    } catch (error: any) {
      console.error("Error sending newsletter:", error);
      toast.error(error.message || "Failed to send email.");
    }
  };

  const normalizeUrl = (url: string) => {
    if (!/^https?:\/\//i.test(url)) return `https://${url}`;
    return url;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setNewsletterData((prevData) => ({
      ...prevData,
      [name]: name === "unsubscribeLink" ? normalizeUrl(value) : value,
    }));
  };

  return (
    <div className="min-h-screen h-full flex flex-col">
      <Nav />
      <main className="flex-grow w-full gap-2 flex flex-col md:flex-row justify-around bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 items-center p-4">
        <div className="bg-gray-400 p-6 rounded-md">
          <h2 className="text-2xl text-center font-semibold text-white mb-6">
            Newsletter Preview
          </h2>
          <NewsLetter {...newsletterData} />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:w-1/3 w-full border-2 rounded-lg border-amber-100 bg-white p-6 shadow-xl"
        >
          <h1 className="mb-4 font-bold text-2xl text-center text-gray-800">
            Send Newsletter
          </h1>

          <input
            {...register("recipients")}
            name="recipients"
            placeholder="Recipients (comma-separated)"
            value={newsletterData.recipients}
            onChange={handleChange}
            className="p-3 border rounded w-full mb-2"
          />
          {errors.recipients && (
            <span className="text-red-500 text-sm mb-2">
              {errors.recipients.message}
            </span>
          )}

          <input
            {...register("name")}
            name="name"
            placeholder="Name"
            value={newsletterData.name}
            onChange={handleChange}
            className="p-3 border rounded w-full mb-2"
          />
          {errors.name && (
            <span className="text-red-500 text-sm mb-2">
              {errors.name.message}
            </span>
          )}

          <select
            {...register("month")}
            name="month"
            value={newsletterData.month}
            onChange={handleChange}
            className="p-3 border rounded w-full mb-2"
          >
            {Object.keys(months).map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          {errors.month && (
            <span className="text-red-500 text-sm mb-2">
              {errors.month.message}
            </span>
          )}

          <input
            {...register("headline")}
            name="headline"
            placeholder="Headline"
            value={newsletterData.headline}
            onChange={handleChange}
            className="p-3 border rounded w-full mb-2"
          />
          {errors.headline && (
            <span className="text-red-500 text-sm mb-2">
              {errors.headline.message}
            </span>
          )}

          <textarea
            {...register("content")}
            name="content"
            placeholder="Content"
            value={newsletterData.content}
            onChange={handleChange}
            className="p-3 border rounded w-full mb-2"
          />
          {errors.content && (
            <span className="text-red-500 text-sm mb-2">
              {errors.content.message}
            </span>
          )}

          <input
            {...register("unsubscribeLink")}
            name="unsubscribeLink"
            placeholder="Unsubscribe Link"
            value={newsletterData.unsubscribeLink}
            onChange={handleChange}
            className="p-3 border rounded w-full mb-2"
          />
          {errors.unsubscribeLink && (
            <span className="text-red-500 text-sm mb-2">
              {errors.unsubscribeLink.message}
            </span>
          )}

          <input
            {...register("author")}
            name="author"
            placeholder="Author"
            value={newsletterData.author}
            onChange={handleChange}
            className="p-3 border rounded w-full mb-2"
          />
          {errors.author && (
            <span className="text-red-500 text-sm mb-2">
              {errors.author.message}
            </span>
          )}

          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded mt-4"
            disabled={isMutating}
          >
            {isMutating ? "Sending..." : "Send Email"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default NewsLetterPage;
