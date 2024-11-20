"use client";
import React, { useState, ReactNode, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../redux/auth/authSlice";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useSelector(selectLoggedInUser);
  const authData = sessionStorage.getItem("authData");
  const router = useRouter();

  const pathname = usePathname();
  useEffect(() => {
    console.log("authData & user", authData, user);
    if (!user && !authData) {
      router.push("/auth/signin");
    }
  }, [user, router, authData]);

  return (
    <>
      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div
          className={`relative flex flex-1 flex-col ${pathname.includes("/orders") ? "lg:ml-55" : "lg:ml-72.5"}`}
        >
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
