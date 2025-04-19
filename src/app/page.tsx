"use client";
import Image from "next/image";

export default function Home() {
  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      const response = await fetch("api/welcomeEmail", {
        method: "POST",
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={handleClick}>click</button>
    </main>
  );
}
