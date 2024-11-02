// "use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BannerForm from "@/components/banners/BannerForm";

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Banner" />
        <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <DefaultLayout>
            <BannerForm title={"Edit Banner"} />
          </DefaultLayout>
        </div>
      </div>
    </div>
  );
}
