"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import { createBrand } from "./brandAPI";

import { useDispatch, useSelector } from "react-redux";
import ShowWarningToast from "../utils";
import Link from "next/link";
import {
  fetchBrandsAsync,
  selectBrandById,
  allBrands,
  createBrandAsync,
  brandsStatus,
  deleteBrandByIdAsync,
} from "./brandsSlice";
import Modal from "../common/ModalFile/Modal";
import Loader from "../common/Loader";
export default function BrandsPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const brands = useSelector(allBrands);
  const status = useSelector(brandsStatus);
  const formValues = watch();
  const [logoUrlValue, setLogoUrlValue] = useState("");
  const [allowForm, setAllowform] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [allowSubmit, setAllowSubmit] = useState(false);
  const handleDeleteThumbnail = () => {
    setValue("image", "");
    setLogoUrlValue("");
  };
  const handleProductImageUpload = async (e) => {
    console.log("ogoUrl Value 000 product 2222", logoUrlValue);
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
        setValue("image", data?.secure_url);
        setLoader(false);
        toast.success("Brand image successfully uploaded");
      }
    } catch (error) {
      setLoader(false);
      toast.error("Error uploading image:", error);
    }
  };
  useEffect(() => {
    dispatch(fetchBrandsAsync());
  }, []);
  const handleDelete = () => {
    setOpenModal(false);
    dispatch(fetchBrandsAsync());
  };

  const onSubmit = async (formData) => {
    setAllowSubmit(true);
    console.log("submit data", formData);
    if (logoUrlValue) {
      const payload = {
        name: formData.name,
        image: formData.image,
      };
      dispatch(createBrandAsync(payload));
    }
  };
  useEffect(() => {
    if (status === "success") {
      reset();
      setLogoUrlValue("");
      setAllowform(false);
      setAllowSubmit(false);
    }
  }, [status]);
  if (status === "loading") {
    return <Loader />;
  }
  console.log("logoUrl Value 000 123", logoUrlValue);
  return (
    <div>
      <div className="flex justify-between bg-white  px-4 py-6 dark:border-strokedark dark:bg-boxdark md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Brands
        </h4>
        <button
          onClick={() => setAllowform(!allowForm)}
          className="border-stroke font-bold"
        >
          Add new Brand
        </button>
      </div>
      {allowForm && (
        <div className="mb-6 grid grid-cols-5 gap-8">
          <div className="col-span-12 xl:col-span-6">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              {/* <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Create Brand
                </h3>
              </div> */}
              <div className="p-7">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex gap-5">
                    {" "}
                    <div className="w-1/2">
                      {" "}
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="logoUrl"
                      >
                        Brand Image <span className="text-red">*</span>
                      </label>
                      <div
                        id="logoUrl"
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
                            <span className="text-primary">
                              Click to upload
                            </span>{" "}
                          </p>
                          <p className="mt-1.5">PNG, JPG, SVG, </p>
                          <p>(max, 135px X 30px)</p>
                        </div>
                      </div>
                      {!logoUrlValue && allowSubmit && (
                        <p className="text-red">Banner image is required</p>
                      )}
                    </div>
                    <div className="w-1/2">
                      {" "}
                      <div className="mb-5.5 ">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="name"
                        >
                          Name <span className="text-red">*</span>
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="name"
                          id="name"
                          {...register("name", {
                            required: "brand name is required",
                          })}
                          placeholder="Enter the brand name"
                        />
                        {errors.name && (
                          <p className="text-red">{errors.name.message}</p>
                        )}
                      </div>
                      {/* ============== */}
                      {/* ============== */}
                      <div className="mb-4 flex items-center gap-3">
                        <div className="mb-4 flex items-center gap-3">
                          <div className="relative max-h-[100px] max-w-[150px]">
                            {logoUrlValue && (
                              <>
                                {" "}
                                <Image
                                  // src={`${logoUrlValue}`}
                                  src={logoUrlValue}
                                  alt="logo"
                                  layout="responsive"
                                  width={150}
                                  height={100}
                                />
                                {formValues?.image && (
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

                          {/* <div>
                        <span className="mb-1.5 text-black dark:text-white">
                          Preview
                        </span>
                      </div> */}
                        </div>

                        {/* <div>
                        <span className="mb-1.5 text-black dark:text-white">
                          Preview
                        </span>
                      </div> */}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      // type="submit"
                      onClick={() => {
                        reset();
                        setAllowform(false);
                        setAllowSubmit(false);
                      }}
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
        </div>
      )}

      <div className="grid grid-cols-6 border-t border-stroke bg-white px-4 py-4.5 dark:border-strokedark dark:bg-boxdark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Brand Name</p>
        </div>
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Brand Image</p>
        </div>

        <div className="col-span-1 flex items-center">
          <p className="font-medium">Actions</p>
        </div>
      </div>
      {brands?.length > 0 ? (
        <>
          {" "}
          {brands?.map((brand, key) => (
            <div
              className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
              key={key}
            >
              <div className="col-span-3 items-center sm:flex">
                <p className="text-sm capitalize text-black dark:text-white">
                  {brand?.name}
                </p>
              </div>
              <div className="col-span-3 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="overflow-hidden rounded-md">
                    <Image
                      src={brand.image}
                      width={60}
                      height={60}
                      alt="Product"
                    />
                  </div>
                  {/* <p className="text-sm text-black dark:text-white">
                    {product.title}
                  </p> */}
                </div>
              </div>

              <div className="col-span-1 flex items-center space-x-3.5">
                {/* <button className="hover:text-primary">
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                      fill=""
                    />
                    <path
                      d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                      fill=""
                    />
                  </svg>
                </button> */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    // dispatch(fetchProductByIdAsync(product.id));
                    dispatch(deleteBrandByIdAsync(brand.id));
                    setOpenModal(true);
                  }}
                  className="hover:text-primary"
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                      fill=""
                    />
                    <path
                      d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                      fill=""
                    />
                    <path
                      d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                      fill=""
                    />
                    <path
                      d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                      fill=""
                    />
                  </svg>
                </button>
                {/* <Link
                  href={`/brands/${brand.id}`}
                  className="hover:text-primary"
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                      fill=""
                    />
                    <path
                      d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                      fill=""
                    />
                  </svg>
                </Link> */}
              </div>
            </div>
          ))}
        </>
      ) : (
        <p className="min-h-[320px] py-6 text-center">
          There is no data to display
        </p>
      )}
      {openModal && (
        <Modal
          title={`Delete Brand`}
          message="Are you sure you want to delete this brand ?"
          dangerOption="Delete"
          cancelOption="Cancel"
          dangerAction={handleDelete}
          cancelAction={() => setOpenModal(false)}
          showModal={openModal}
        ></Modal>
      )}
    </div>
  );
}
