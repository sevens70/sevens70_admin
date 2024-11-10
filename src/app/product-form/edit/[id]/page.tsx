// "use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProductForm from "@/components/Products/ProductForm/ProductForm";

export default function Page() {
  return (
    <div>
      <DefaultLayout>
        <ProductForm title={"Edit product"} />
      </DefaultLayout>
    </div>
  );
}
