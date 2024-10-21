"use client";
// import { selectLoggedInUser } from "@/components/auth/authSlice";
import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { selectLoggedInUser } from "@/components/redux/auth/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const user = useSelector(selectLoggedInUser);

  console.log("user1234", user);
  // let user = false;

  useEffect(() => {
    if (!user) {
      router.push("/auth/signin");
    }
  }, [user, router]);

  return (
    <>
      {user ? (
        <DefaultLayout>
          <ECommerce />
        </DefaultLayout>
      ) : null}
    </>
  );
}
