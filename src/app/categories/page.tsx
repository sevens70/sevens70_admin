import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CategoriesPage from "../../components/categories/categories";
export const metadata: Metadata = {
  title: "Next.js Categories | Xartso - Next.js Dashboard Template",
  description:
    "This is Next.js Categories page for Xartso - Next.js Tailwind CSS Admin Dashboard Template",
};

const Categories = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Brands" />
        <CategoriesPage />
      </div>
    </DefaultLayout>
  );
};

export default Categories;
