// "use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProductForm from "@/components/Products/ProductForm/ProductForm";

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Products" />
        <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <DefaultLayout>
            <ProductForm title={"Edit product"} />
          </DefaultLayout>
        </div>
      </div>
    </div>
  );
}
