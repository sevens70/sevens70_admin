"use client";
import { fetchItemsByUserIdAsync } from "@/components/cart/cartSlice";
// import { selectLoggedInUser } from "@/components/auth/authSlice";
import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { fetchAllOrdersAsync } from "@/components/orders/orderSlice";
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
    if (user === null) {
      router.push("/auth/signin");
    } else if (user) {
      dispatch(fetchItemsByUserIdAsync());
      dispatch(fetchLoggedInUserAsync());
      dispatch(fetchAllOrdersAsync({}));
    }
  }, [dispatch, user, router]);
  console.log("user 1234", user);

  return (
    <>
      {userChecked && user ? (
        <DefaultLayout>
          <ECommerce />
        </DefaultLayout>
      ) : null}
    </>
  );
}
