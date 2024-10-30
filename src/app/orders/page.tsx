import OrdersPage from "../../components/orders/OrdersPage";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title: "Orders | Xartso - Next.js Dashboard Template",
  description:
    "This is Next.js orders page for xartso  Tailwind CSS Admin Dashboard Template",
};

const page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Orders" />
      <OrdersPage />
    </DefaultLayout>
  );
};

export default page;
