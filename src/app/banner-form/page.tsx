import Calendar from "@/components/Products";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Bannerform from "@/components/banners/BannerForm";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title: "Products | Xartso - Next.js Dashboard Template",
  description:
    "This is Next.js products page for xartso  Tailwind CSS Admin Dashboard Template",
};

const CreateProducts = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Banners" /> <Bannerform title={"Create Banner"} />
    </DefaultLayout>
  );
};

export default CreateProducts;
