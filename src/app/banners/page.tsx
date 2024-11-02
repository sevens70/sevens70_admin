import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BannerTable from "../../components/banners/bannerTable";
export const metadata: Metadata = {
  title: "Next.js Banners | Xartso - Next.js Dashboard Template",
  description:
    "This is Next.js Banners page for Xartso - Next.js Tailwind CSS Admin Dashboard Template",
};

const Banners = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Banners" />
        <BannerTable />
      </div>
    </DefaultLayout>
  );
};

export default Banners;
