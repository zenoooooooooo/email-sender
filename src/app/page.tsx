"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "./components/Nav";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

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
        setName(data.user.name);
      } catch (err) {
        console.error("Token validation failed:", err);
        localStorage.removeItem("token");
        router.push("/login");
      }
    };

    validateToken();
  }, [router]);

  return (
    <>
      <Nav name={name} />
    </>
  );
}
