"use client";
import Nav from "./components/Nav";
import Card from "./components/Card";

export default function Home() {
  return (
    <>
      <div className="bg-gradient-to-br min-h-screen h-full flex flex-col from-gray-900 via-gray-800 to-gray-700">
        <Nav />

        <div className="mt-6 flex-grow w-full max-w-7xl mx-auto p-4 flex flex-col items-center gap-4">
          <Card
            title="Welcome Email"
            description="Send a welcome email to new users with their login details."
            tags={["Recipients", "Name", "Email", "Login Link"]}
            link="/welcomeEmailPage"
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
              "Contact Phone",
              "Contact Email",
            ]}
            link="/interviewInvitationPage"
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
            link="/newsLetterPage"
          />

          <Card
            title="Password Reset"
            description="Send a password reset link to users who have forgotten their password."
            tags={["Recipients", "Name", "Reset Link"]}
            link="/passwordResetPage"
          />
        </div>
      </div>
    </>
  );
}
