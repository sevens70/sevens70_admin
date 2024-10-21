"use client";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import ProductTable from "./ProductTable";

const Products = () => {

  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb pageName="Products" />
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <ProductTable />
      </div>
    </div>
  );
};

export default Products;
