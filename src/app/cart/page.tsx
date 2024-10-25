import CartPage from "../../components/cart/index";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Cart | Xartso - Next.js Dashboard Template",
  description:
    "This is Next.js products page for xartso  Tailwind CSS Admin Dashboard Template",
};

const page = () => {
  return (
    <DefaultLayout>
      <CartPage />
    </DefaultLayout>
  );
};

export default page;
