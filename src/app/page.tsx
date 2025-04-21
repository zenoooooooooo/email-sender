"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "./components/Nav";
import Link from "next/link";
import Card from "./components/Card";

export default function Home() {
  return (
    <>
      <Nav />

      {/* Container for email form cards */}
      <div className="max-w-7xl mx-auto p-4 flex flex-col items-center gap-4">
        <Card
          title="Welcome Email"
          description="Send a welcome email to new users with their login details."
          tags={["Recipients", "Name", "Email", "Login Link"]}
          link="/welcome-email-form"
        />
        <Card
          title="Interview Invitation"
          description="Send interview invitations to candidates for job interviews."
          tags={[
            "Recipients",
            "Name",
            "Position",
            "Company",
            "Company Description",
            "Interview Date",
            "Interview Time",
            "Interview Location",
            "Interview Notes",
            "Contact Method",
            "Contact Link",
            "Department Name",
            "Logo Link",
            "Contact Phone",
            "Contact Email",
          ]}
          link="/interview-invitation-form"
        />

        <Card
          title="Newsletter"
          description="Send newsletters with updates, news, and articles to your subscribers."
          tags={[
            "Recipients",
            "Name",
            "Month",
            "Headline",
            "Content",
            "Unsubscribe Link",
            "Author",
          ]}
          link="/newsletter-form"
        />

        <Card
          title="Password Reset"
          description="Send a password reset link to users who have forgotten their password."
          tags={["Recipients", "Name", "Reset Link"]}
          link="/password-reset-form"
        />
      </div>
    </>
  );
}
