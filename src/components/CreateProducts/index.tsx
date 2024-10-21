"use client";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import ProductForm from "./ProductForm";

const CreateProduct = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb pageName="Products" />
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <ProductForm />
      </div>
    </div>
  );
};

export default CreateProduct;
