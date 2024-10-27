"use client";
// import { selectLoggedInUser } from "@/components/auth/authSlice";
import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import {
  checkAuthAsync,
  selectLoggedInUser,
  selectUserChecked,
} from "@/components/redux/auth/authSlice";
import { fetchLoggedInUserAsync } from "@/components/user/userSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  // const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      // dispatch(fetchItemsByUserIdAsync());
      // we can get req.user by token on backend so no need to give in front-end
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]);
  console.log("user1234", user);
  // let user = false;

  useEffect(() => {
    if (!user) {
      router.push("/auth/signin");
    }
  }, [user, router]);

  return (
    <>
      {userChecked ? (
        <DefaultLayout>
          <ECommerce />
        </DefaultLayout>
      ) : null}
    </>
  );
}
