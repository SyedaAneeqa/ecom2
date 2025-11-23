'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.replace("/login");
          return;
        }

        const res = await fetch("/api/admin/checkadmin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!data.isAdmin) {
          router.replace("/user-dashboard");
          return;
        }

        setLoading(false);
      } catch (err) {
        console.error("Error verifying admin:", err);
        router.replace("/user-dashboard");
      }
    };

    verifyAdmin();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Checking admin permissions...</p>
      </div>
    );
  }

  return <>{children}</>;
}
