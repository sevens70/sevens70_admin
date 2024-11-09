import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BrandsPage from "../../components/Brands/Brands";
export const metadata: Metadata = {
  title: "Next.js Settings | Xartso - Next.js Dashboard Template",
  description:
    "This is Next.js Brands page for Xartso - Next.js Tailwind CSS Admin Dashboard Template",
};

const Brands = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Brands" />
        <BrandsPage />
      </div>
    </DefaultLayout>
  );
};

export default Brands;
