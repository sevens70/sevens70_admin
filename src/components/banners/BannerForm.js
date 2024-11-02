"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
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
  // const formValues = watch();
  const selectedBanner = useSelector(selectedBannerById);
  const [logoUrlValue, setLogoUrlValue] = useState("");
  const [showImgError, setShowImageError] = useState(false);
  const handleBannerImageUpload = async (e) => {
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
        toast.success("Logo successfully uploaded");
      }
    } catch (error) {
      toast.error("Error uploading image:", error);
    }
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
                  setShowImageError(true);
                  const banner = { ...data };
                  if (params.id) {
                    banner.id = params.id;
                    dispatch(updateBannerAsync(banner));
                    setLogoUrlValue("");

                    reset();
                  } else {
                    console.log("banner 03", banner);
                    dispatch(createBannerAsync(banner));

                    reset();
                    setLogoUrlValue("");
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
                    {" "}
                    <div className="mb-4 flex items-center gap-3">
                      <div className="max-h-[100px] max-w-[100px] overflow-hidden">
                        {logoUrlValue && (
                          <Image
                            src={`${logoUrlValue}`}
                            alt="logo"
                            layout="responsive"
                            width={100}
                            height={100}
                          />
                        )}
                      </div>
                    </div>
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
                        <p className="mt-1.5">PNG, JPG, SVG, </p>
                        <p>(size, 300 X 490px)</p>
                      </div>
                    </div>
                    {/* {errors.bannerImage && !logoUrlValue && (
                      <p className="text-red">{errors.bannerImage.message}</p>
                    )} */}
                    {showImgError && !logoUrlValue && (
                      <p className="text-red">Banner image is required</p>
                    )}
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
                    className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                    disabled={!logoUrlValue}
                  >
                    Save
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
