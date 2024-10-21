
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Products from "@/components/Products";

export const metadata: Metadata = {
  title: "Products | Xartso - Next.js Dashboard Template",
  description:
    "This is Next.js products page for xartso  Tailwind CSS Admin Dashboard Template",
};

const page = () => {
  return (
    <DefaultLayout>
      <Products />
    </DefaultLayout>
  );
};

export default page;
