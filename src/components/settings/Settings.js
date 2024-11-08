"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createWebsiteInfo } from "./settingsAPI";
import { fetchWebsiteInfoAsync, selectWebsiteInfo } from "./settingsSlice";
import { useDispatch, useSelector } from "react-redux";
import ShowWarningToast from "../utils";
export default function Settings() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const websiteInfo = useSelector(selectWebsiteInfo);
  const formValues = watch();
  const [logoUrlValue, setLogoUrlValue] = useState(
    "https://iili.io/2B8RIyP.png",
  );
  const handleProductImageUpload = async (e) => {
    ShowWarningToast("Please wait for uploading...");
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "online-shop");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();
      console.log("data for", data);

      if (data?.secure_url) {
        setLogoUrlValue(data.secure_url);
        setValue("logoUrl", data?.secure_url);
        toast.success("Logo successfully uploaded");
      }
    } catch (error) {
      toast.error("Error uploading image:", error);
    }
  };
  useEffect(() => {
    dispatch(fetchWebsiteInfoAsync());
  }, []);
  useEffect(() => {
    if (websiteInfo?.length > 0) {
      setValue("emailAddress", websiteInfo[0]?.email);
      setValue("phoneNumber", websiteInfo[0]?.phoneNumber);
      setValue("logoUrl", websiteInfo[0]?.logoUrl);
      if (websiteInfo[0]?.logoUrl) {
        setLogoUrlValue(websiteInfo[0]?.logoUrl);
      }
    }
  }, [websiteInfo]);

  const onSubmit = async (formData) => {
    console.log("submit data", formData);

    try {
      // Map form data to match the schema
      const payload = {
        email: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        logoUrl: formData.logoUrl,
      };

      const result = await createWebsiteInfo(payload);
      console.log("API response:", result);
      toast.success("Data saved successfully");
      dispatch(fetchWebsiteInfoAsync);
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Failed to save data");
    }
  };

  return (
    <div>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-12 xl:col-span-6">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Website Information
              </h3>
            </div>
            <div className="p-7">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-5">
                  {" "}
                  <div className="w-1/2">
                    {" "}
                    <div className="mb-5.5 ">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Phone Number
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        {...register("phoneNumber", {
                          required: "Phone number is required",
                        })}
                        placeholder="++880 1827969106"
                      />
                      {errors.phoneNumber && (
                        <p className="text-red">{errors.phoneNumber.message}</p>
                      )}
                    </div>
                    <div className="mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="emailAddress"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                                fill=""
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                                fill=""
                              />
                            </g>
                          </svg>
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="email"
                          name="emailAddress"
                          id="emailAddress"
                          {...register("emailAddress", {
                            required: "Email address is required",
                          })}
                          placeholder="sevens@admin.com"
                        />
                        {errors.emailAddress && (
                          <p className="text-red">
                            {errors.emailAddress.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2">
                    {" "}
                    <div className="mb-4 flex items-center gap-3">
                      <div className="max-h-[100px] max-w-[100px]">
                        {logoUrlValue && (
                          <Image
                            src={`${logoUrlValue}`}
                            // src={"https://iili.io/2B8RIyP.png"}
                            alt="logo"
                            layout="responsive"
                            width={100}
                            height={100}
                          />
                        )}
                      </div>

                      {/* <div>
                        <span className="mb-1.5 text-black dark:text-white">
                          Preview
                        </span>
                      </div> */}
                    </div>
                    <div
                      id="FileUpload"
                      className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                        // {...register("logoUrl", {
                        //   required: "Logo Url is required",
                        // })}
                        id="logoUrl"
                        onChange={handleProductImageUpload}
                      />
                      {/* {!logoUrlState && (
                        <p className="text-red">Logo is required</p>
                      )} */}

                      <div className="flex flex-col items-center justify-center space-y-3">
                        {/* {logo} */}
                        <p>
                          <span className="text-primary">Click to upload</span>{" "}
                        </p>
                        <p className="mt-1.5">PNG, JPG, SVG, </p>
                        <p>(max, 135px X 30px)</p>
                      </div>
                    </div>
                    {!logoUrlValue && (
                      <p className="text-red">Logo is required</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    // type="submit"
                    onClick={() => reset()}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* <div className="col-span-5 xl:col-span-6">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Your Logo
              </h3>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
