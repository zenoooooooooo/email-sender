"use client";

import React from "react";
import useSWR from "swr";
import Nav from "../components/Nav";
import Image from "next/image";
import { IEmailHistory } from "@/types/IEmailHistory";

const fetcherWithToken = async (url: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to fetch");
  }

  return res.json();
};

const badgeColors: Record<string, string> = {
  welcomeEmail: "bg-green-600 text-white",
  interviewInvitation: "bg-blue-600 text-white",
  newsLetter: "bg-purple-600 text-white",
  passwordReset: "bg-red-600 text-white",
};

const EmailHistory = () => {
  const { data, error, isLoading } = useSWR(
    "/api/emailHistory",
    fetcherWithToken
  );
  const history = data?.emailHistory || [];

  const renderEmailContent = (
    type: string,
    payload: Record<string, string>
  ) => {
    switch (type) {
      case "welcomeEmail":
        return (
          <>
            <p>
              <strong>Email:</strong> {payload.email}
            </p>
            <p>
              <strong>Login Link:</strong>{" "}
              <a href={payload.loginLink} className="text-blue-400 underline">
                {payload.loginLink}
              </a>
            </p>
          </>
        );
      case "interviewInvitation":
        return (
          <div className="grid grid-cols-2 gap-2">
            <p>
              <strong>Position:</strong> {payload.position}
            </p>
            <p>
              <strong>Company:</strong> {payload.company}
            </p>
            <p>
              <strong>Date:</strong> {payload.interviewDate}
            </p>
            <p>
              <strong>Time:</strong> {payload.interviewTime}
            </p>
            <p>
              <strong>Location:</strong> {payload.interviewLocation}
            </p>
            <p>
              <strong>Department:</strong> {payload.departmentName}
            </p>
            <p>
              <strong>Phone:</strong> {payload.contactPhone}
            </p>
            <p>
              <strong>Email:</strong> {payload.contactEmail}
            </p>
            <p>
              <strong>Notes:</strong> {payload.interviewNotes}
            </p>
            <p>
              <strong>Contact Method:</strong> {payload.contactMethod}
            </p>
            <p>
              <strong>Contact Link:</strong>{" "}
              <a href={payload.contactLink} className="text-blue-400 underline">
                {payload.contactLink}
              </a>
            </p>
            {payload.logoLink && (
              <Image
                src={payload.logoLink}
                alt="Logo"
                className="col-span-2 max-w-[150px] mt-2"
              />
            )}
          </div>
        );
      case "newsLetter":
        return (
          <>
            <p>
              <strong>Month:</strong> {payload.month}
            </p>
            <p>
              <strong>Headline:</strong> {payload.headline}
            </p>
            <p>
              <strong>Author:</strong> {payload.author}
            </p>
            <p>
              <strong>Content:</strong>
            </p>
            <div className="bg-gray-800 p-3 rounded mb-2 text-sm leading-relaxed">
              {payload.content}
            </div>
            <p>
              <strong>Unsubscribe:</strong>{" "}
              <a
                href={payload.unsubscribeLink}
                className="text-blue-400 underline"
              >
                {payload.unsubscribeLink}
              </a>
            </p>
          </>
        );
      case "passwordReset":
        return (
          <>
            <p>
              <strong>Reset Link:</strong>{" "}
              <a href={payload.resetLink} className="text-blue-400 underline">
                {payload.resetLink}
              </a>
            </p>
          </>
        );
      default:
        return (
          <pre className="bg-gray-800 p-2 rounded text-sm overflow-x-auto">
            {JSON.stringify(payload, null, 2)}
          </pre>
        );
    }
  };

  return (
    <div className="min-h-screen h-full flex flex-col font-sans">
      <Nav />
      <main className="flex-grow w-full px-6 py-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-amber-400">
            📨 Email History
          </h2>

          {isLoading ? (
            <p className="text-lg">Loading email history...</p>
          ) : error ? (
            <p className="text-red-400 text-lg">Error: {error.message}</p>
          ) : history.length === 0 ? (
            <p className="text-lg">No email history found.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {history.map((email: IEmailHistory, index: number) => (
                <div
                  key={index}
                  className="bg-gray-800 p-5 rounded-2xl shadow-xl border border-gray-700 hover:border-amber-400 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium uppercase tracking-wider ${
                        badgeColors[email.type] || "bg-gray-600 text-white"
                      }`}
                    >
                      {email.type}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(email.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {email.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    To:{" "}
                    <span className="text-gray-200">
                      {email.recipients.join(", ")}
                    </span>
                  </p>
                  <div className="text-sm space-y-2 mt-2">
                    {renderEmailContent(email.type, email.payload)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EmailHistory;
