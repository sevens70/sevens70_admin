"use client";
// import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import Cart from "./Cart";
const CartPage = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb pageName="Cart" />
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <Cart />
      </div>
    </div>
  );
};

export default CartPage;
