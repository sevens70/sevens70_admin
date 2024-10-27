import OrdersPage from "../../components/orders/OrdersPage";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Orders | Xartso - Next.js Dashboard Template",
  description:
    "This is Next.js orders page for xartso  Tailwind CSS Admin Dashboard Template",
};

const page = () => {
  return (
    <DefaultLayout>
      <OrdersPage />
    </DefaultLayout>
  );
};

export default page;
