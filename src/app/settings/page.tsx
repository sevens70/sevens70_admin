import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SettingsPage from "../../components/settings/Settings";
export const metadata: Metadata = {
  title: "Next.js Settings | Xartso - Next.js Dashboard Template",
  description:
    "This is Next.js Settings page for Xartso - Next.js Tailwind CSS Admin Dashboard Template",
};

const Settings = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Settings" />

        <SettingsPage />
      </div>
    </DefaultLayout>
  );
};

export default Settings;
