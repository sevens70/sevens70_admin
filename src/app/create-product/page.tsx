import Calendar from "@/components/Products";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CreateProduct from "@/components/CreateProducts";

export const metadata: Metadata = {
  title: "Products | Xartso - Next.js Dashboard Template",
  description:
    "This is Next.js products page for xartso  Tailwind CSS Admin Dashboard Template",
};

const CreateProducts = () => {
  return (
    <DefaultLayout>
      <CreateProduct />
    </DefaultLayout>
  );
};

export default CreateProducts;
