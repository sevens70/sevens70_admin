"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  bannerStatus,
  clearSelectedBanner,
  createBannerAsync,
  fetchBannerByIdAsync,
  selectedBannerById,
  updateBannerAsync,
} from "./bannersSlice";
import { useDispatch, useSelector } from "react-redux";
import ShowWarningToast from "../utils";
import { useParams } from "next/navigation";
export default function BannerForm({ title }) {
  const {
    register,
    handleSubmit,
    setValue,
    // trigger,
    // clearErrors,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const dispatch = useDispatch();
  const params = useParams();
  const formValues = watch();
  const [loader, setLoader] = useState(false);
  const [allowDisable, setAllowDisable] = useState(false);
  // const formValues = watch();
  const selectedBanner = useSelector(selectedBannerById);
  const status = useSelector(bannerStatus);
  const [logoUrlValue, setLogoUrlValue] = useState("");
  const [showImgError, setShowImageError] = useState(false);
  const handleBannerImageUpload = async (e) => {
    setLoader(true);
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
        setValue("bannerImage", data?.secure_url);
        // clearErrors("bannerImage");
        // trigger("bannerImage");
        setLoader(false);
        toast.success("Logo successfully uploaded");
      }
    } catch (error) {
      setLoader(false);
      toast.error("Error uploading image:", error);
    }
  };
  const handleDeleteThumbnail = () => {
    setValue("bannerImage", "");
    setLogoUrlValue("");
  };
  useEffect(() => {
    if (params.id) {
      dispatch(fetchBannerByIdAsync(params.id));
    } else {
      dispatch(clearSelectedBanner());
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    if (selectedBanner && params.id) {
      setValue("title", selectedBanner.title);
      setValue("subtitle", selectedBanner.subtitle);
      setValue("tag", selectedBanner.tag);
      setValue("offer", selectedBanner.offer ?? "");
      setValue("bannerImage", selectedBanner.bannerImage);
      setLogoUrlValue(selectedBanner.bannerImage);
    }
  }, [selectedBanner, params.id, setValue]);
  useEffect(() => {
    if (status === "success") {
      reset();
      setLogoUrlValue("");
      setAllowDisable(false);
    }
    if (status === "failed") {
      setAllowDisable(false);
    }
  }, [status]);

  return (
    <div>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-12 xl:col-span-6">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                {title}
              </h3>
            </div>
            <div className="p-7">
              <form
                onSubmit={handleSubmit((data) => {
                  setAllowDisable(true);
                  if (!logoUrlValue) {
                    // toast.error("Choose your banner image.");
                    setShowImageError(true);
                    setAllowDisable(false);
                    return null;
                  }
                  setShowImageError(false);
                  const banner = { ...data };
                  if (params.id) {
                    banner.id = params.id;
                    dispatch(updateBannerAsync(banner));
                    setLogoUrlValue("");

                    reset();
                  } else {
                    dispatch(createBannerAsync(banner));

                    // reset();
                    // setLogoUrlValue("");
                  }
                })}
              >
                <div className="flex gap-5">
                  {" "}
                  <div className="w-1/2">
                    <div className="col-span-full">
                      <label
                        htmlFor="title"
                        className="text-gray-900 block text-sm font-medium leading-6"
                      >
                        Title <span className="text-red">*</span>
                      </label>
                      <div className="mt-2">
                        <div className="ring-gray-300 flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                          <input
                            type="text"
                            {...register("title", {
                              required: "title is required",
                            })}
                            id="title"
                            className="w-full rounded-lg border-0 border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        {errors.title && (
                          <p className="text-red">{errors.title.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-full mt-4">
                      <label
                        htmlFor="subtitle"
                        className="text-gray-900 block text-sm font-medium leading-6"
                      >
                        Subtitle <span className="text-red">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          id="subtitle"
                          {...register("subtitle", {
                            required: "subtitle is required",
                          })}
                          // rows={3}
                          className="ing-gray-300 w-full rounded-lg bg-transparent py-4 pl-6 pr-10 text-black outline-none ring-1 ring-inset focus:border-primary focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          defaultValue={""}
                        />
                      </div>
                      {errors.subtitle && (
                        <p className="text-red">{errors.subtitle.message}</p>
                      )}
                    </div>
                    <div className="col-span-full mt-4">
                      <label
                        htmlFor="tag"
                        className="text-gray-900 block text-sm font-medium leading-6"
                      >
                        Tag <span className="text-red">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          id="tag"
                          {...register("tag", {
                            required: "tag is required",
                          })}
                          // rows={3}
                          className="ing-gray-300 w-full rounded-lg bg-transparent py-4 pl-6 pr-10 text-black outline-none ring-1 ring-inset focus:border-primary focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          defaultValue={""}
                        />
                      </div>
                      {errors.tag && (
                        <p className="text-red">{errors.tag.message}</p>
                      )}
                    </div>
                    <div className="col-span-full mt-4">
                      <label
                        htmlFor="description"
                        className="text-gray-900 block text-sm font-medium leading-6"
                      >
                        Offer
                      </label>
                      <div className="mt-2">
                        <input
                          id="offer"
                          {...register("offer", {})}
                          className="ing-gray-300 w-full rounded-lg bg-transparent py-4 pl-6 pr-10 text-black outline-none ring-1 ring-inset focus:border-primary focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2">
                    <label
                      htmlFor="description"
                      className="text-gray-900 mb-2 block text-sm font-medium leading-6"
                    >
                      Banner image upload <span className="text-red">*</span>
                    </label>
                    <div
                      id="bannerImage"
                      className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                        // {...register("bannerImage", {
                        //   required: "banner mage Url is required",
                        //   value: logoUrlValue,
                        // })}
                        id="bannerImage"
                        onChange={handleBannerImageUpload}
                      />

                      <div className="flex flex-col items-center justify-center space-y-3">
                        <p>
                          <span className="text-primary">Click to upload</span>{" "}
                        </p>
                        <p className="mt-1.5">PNG, JPG </p>
                        <p>(size, 300 X 485px)</p>
                      </div>
                    </div>
                    {/* {errors.bannerImage && !logoUrlValue && (
                      <p className="text-red">{errors.bannerImage.message}</p>
                    )} */}
                    {showImgError && !logoUrlValue && (
                      <p className="text-red">Banner image is required</p>
                    )}
                    <div className="relative max-h-[100px] max-w-[100px]">
                      {logoUrlValue && (
                        <>
                          {" "}
                          <Image
                            // src={`${logoUrlValue}`}
                            src={logoUrlValue}
                            alt="logo"
                            layout="responsive"
                            width={100}
                            height={100}
                          />
                          {formValues?.bannerImage && (
                            <p
                              onClick={handleDeleteThumbnail}
                              className="bg-red-600 absolute left-30 top-1 cursor-pointer rounded-full bg-red px-1 py-1 text-white"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-4"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M6 18 18 6M6 6l12 12"
                                />
                              </svg>
                            </p>
                          )}
                        </>
                      )}
                      {loader && (
                        <div className="my-5 flex w-full justify-center">
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              class="text-gray-200 dark:text-gray-600 h-10 w-10 animate-spin fill-blue-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span class="sr-only">Loading...</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    onClick={() => {
                      setLogoUrlValue("");
                      reset();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={allowDisable}
                    className={`flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90 ${
                      allowDisable
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer"
                    }`}
                  >
                    {allowDisable ? "Saving.." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
