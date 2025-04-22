"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";
import { interviewInvitationSchema } from "@/validations/interviewInvitation";
import InterviewInvitationTemplate from "../components/templates/InterviewInvitation";
import Nav from "../components/Nav";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { IInterviewInvitation } from "@/types/IInterviewInvitation";

async function sendInterviewInvitation(
  url: string,
  { arg }: { arg: IInterviewInvitation }
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
    throw new Error(errorData.message || "Sending email failed");
  }

  return res.json();
}

const InterviewInvitationPage = () => {
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

  const [emailData, setEmailData] = useState({
    recipients: "",
    name: "",
    position: "",
    company: "",
    companyDescription: "",
    interviewDate: "",
    interviewTime: "",
    interviewLocation: "",
    interviewNotes: "",
    contactMethod: "email",
    contactLink: "",
    departmentName: "",
    contactPhone: "",
    contactEmail: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(interviewInvitationSchema),
    defaultValues: emailData,
  });

  const { trigger, isMutating } = useSWRMutation(
    "/api/interviewInvitation",
    sendInterviewInvitation
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
      toast.success("Email sent successfully!");
      console.log("Interview email sent successfully:", result);
      reset();
    } catch (error) {
      console.error("Error sending interview email:", error);
      toast.error("Failed to send email.");
    }
  };
  const handleChange = () => {
    setEmailData((prevData) => ({
      ...prevData,
    }));
  };

  return (
    <div className="min-h-screen h-full flex flex-col">
      <Nav />
      <main className="flex-grow w-full gap-2 flex flex-col md:flex-row justify-around bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 items-center p-4">
        <div className="bg-gray-400 p-6 rounded-md max-w-lg w-full">
          <h2 className="text-2xl text-center font-semibold text-white mb-6">
            Template Preview
          </h2>
          <InterviewInvitationTemplate {...emailData} />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:w-2/3 w-full border-2 rounded-lg border-amber-100 bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto"
        >
          <h1 className="mb-6 font-bold text-3xl text-center text-gray-800">
            Send Interview Invitation
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <input
                {...register("recipients")}
                name="recipients"
                placeholder="Recipients (comma separated)"
                value={emailData.recipients}
                onChange={handleChange}
                className="p-3 border rounded w-full mb-2 outline-none focus:ring-2 focus:ring-amber-400"
              />
              {errors.recipients && (
                <span className="text-red-500 text-sm">
                  {errors.recipients.message}
                </span>
              )}

              <input
                {...register("name")}
                name="name"
                placeholder="Your Name"
                value={emailData.name}
                onChange={handleChange}
                className="p-3 border rounded w-full mb-2 outline-none focus:ring-2 focus:ring-amber-400"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}

              <input
                {...register("position")}
                name="position"
                placeholder="Position"
                value={emailData.position}
                onChange={handleChange}
                className="p-3 border rounded w-full mb-2 outline-none focus:ring-2 focus:ring-amber-400"
              />
              {errors.position && (
                <span className="text-red-500 text-sm">
                  {errors.position.message}
                </span>
              )}

              <input
                {...register("company")}
                name="company"
                placeholder="Company"
                value={emailData.company}
                onChange={handleChange}
                className="p-3 border rounded w-full mb-2 outline-none focus:ring-2 focus:ring-amber-400"
              />
              {errors.company && (
                <span className="text-red-500 text-sm">
                  {errors.company.message}
                </span>
              )}

              <input
                {...register("companyDescription")}
                name="companyDescription"
                placeholder="Company Description"
                value={emailData.companyDescription}
                onChange={handleChange}
                className="p-3 border rounded w-full mb-2 outline-none focus:ring-2 focus:ring-amber-400"
              />
              {errors.companyDescription && (
                <span className="text-red-500 text-sm">
                  {errors.companyDescription.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <input
                {...register("interviewDate")}
                name="interviewDate"
                type="date"
                value={emailData.interviewDate}
                onChange={handleChange}
                className="p-3 border rounded w-full mb-2 outline-none focus:ring-2 focus:ring-amber-400"
              />
              {errors.interviewDate && (
                <span className="text-red-500 text-sm">
                  {errors.interviewDate.message}
                </span>
              )}

              <input
                {...register("interviewTime")}
                name="interviewTime"
                type="time"
                value={emailData.interviewTime}
                onChange={handleChange}
                className="p-3 border rounded w-full mb-2 outline-none focus:ring-2 focus:ring-amber-400"
              />
              {errors.interviewTime && (
                <span className="text-red-500 text-sm">
                  {errors.interviewTime.message}
                </span>
              )}

              <input
                {...register("interviewLocation")}
                name="interviewLocation"
                placeholder="Interview Location"
                value={emailData.interviewLocation}
                onChange={handleChange}
                className="p-3 border rounded w-full mb-2 outline-none focus:ring-2 focus:ring-amber-400"
              />
              {errors.interviewLocation && (
                <span className="text-red-500 text-sm">
                  {errors.interviewLocation.message}
                </span>
              )}

              <input
                {...register("interviewNotes")}
                name="interviewNotes"
                placeholder="Interview Notes"
                value={emailData.interviewNotes}
                onChange={handleChange}
                className="p-3 border rounded w-full mb-2 outline-none focus:ring-2 focus:ring-amber-400"
              />
              {errors.interviewNotes && (
                <span className="text-red-500 text-sm">
                  {errors.interviewNotes.message}
                </span>
              )}

              <select
                {...register("contactMethod")}
                name="contactMethod"
                value={emailData.contactMethod}
                onChange={handleChange}
                className="p-3 border rounded w-full mb-2 outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>
              {errors.contactMethod && (
                <span className="text-red-500 text-sm">
                  {errors.contactMethod.message}
                </span>
              )}
            </div>

            <div className="col-span-full grid md:grid-cols-2 gap-4">
              <input
                {...register("contactLink")}
                name="contactLink"
                placeholder="Contact Link"
                value={emailData.contactLink}
                onChange={handleChange}
                className="p-3 border rounded w-full mb-2 outline-none focus:ring-2 focus:ring-amber-400"
              />
              {errors.contactLink && (
                <span className="text-red-500 text-sm">
                  {errors.contactLink.message}
                </span>
              )}

              <input
                {...register("departmentName")}
                name="departmentName"
                placeholder="Department Name"
                value={emailData.departmentName}
                onChange={handleChange}
                className="p-3 border rounded w-full mb-2 outline-none focus:ring-2 focus:ring-amber-400"
              />
              {errors.departmentName && (
                <span className="text-red-500 text-sm">
                  {errors.departmentName.message}
                </span>
              )}

              <input
                {...register("contactPhone")}
                name="contactPhone"
                placeholder="Contact Phone"
                type="tel"
                value={emailData.contactPhone}
                onChange={handleChange}
                className="p-3 border rounded w-full mb-2 outline-none focus:ring-2 focus:ring-amber-400"
              />
              {errors.contactPhone && (
                <span className="text-red-500 text-sm">
                  {errors.contactPhone.message}
                </span>
              )}

              <input
                {...register("contactEmail")}
                name="contactEmail"
                placeholder="Contact Email"
                type="email"
                value={emailData.contactEmail}
                onChange={handleChange}
                className="p-3 border rounded w-full mb-2 outline-none focus:ring-2 focus:ring-amber-400"
              />
              {errors.contactEmail && (
                <span className="text-red-500 text-sm">
                  {errors.contactEmail.message}
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded block mx-auto"
          >
            {isMutating ? "Sending..." : "Send Email"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default InterviewInvitationPage;
