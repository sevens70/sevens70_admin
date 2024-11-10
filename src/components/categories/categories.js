"use client";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchSubcategories,
} from "../redux/product/productAPI";
import SubCategoryModal from "../common/ModalFile/SubcategoryModal";
import {
  createSubCategoriesAsync,
  fetchCategoriesAsync,
  getAllSubcategories,
} from "../redux/product/productSlice";
export default function CategoriesPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [categoriesData, setCategoriesData] = useState([
    "Home",
    "Men",
    "Women",
    "Accessories",
    "Shop",
    "Boyes",
    "Girls",
    "Electronics",
    "Appliance",
    "Kids",
    "Home & lifestyle",
    "Health & beuty",
    "Jewellery",
    "Sunglass",
    "Puja sale",
    "Eid sale",
    "Become a seller",
  ]);
  const selectedSubCategoryData = useSelector(getAllSubcategories);
  const [createSubCategory, setCreateSubCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [subcategoriesData, setSubcategoriesData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const fetchSubCategoriesData = async () => {
    try {
      const response = await fetchSubcategories(selectedCategory);
      if (response.data?.subcategories?.length > 0) {
        const subcategoryNames = response.data?.subcategories?.map(
          (sub) => sub.name,
        );
        setSubcategoriesData(subcategoryNames);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    if (selectedCategory) {
      fetchSubCategoriesData();
    }
  }, [selectedCategory]);

  const handleDelete = () => {
  };
  useEffect(() => {
    if (selectedSubCategoryData?.subcategories?.length > 0) {
      const subcategoryNames = selectedSubCategoryData?.subcategories?.map(
        (sub) => sub.name,
      );
      setSubcategoriesData(subcategoryNames);
    }
  }, [selectedSubCategoryData]);

  const handleSave = () => {
    let payload = {};
    if (selectedCategory && createSubCategory) {
      payload = {
        categoryName: selectedCategory.toLowerCase(),
        subcategoryName: createSubCategory.toLowerCase(),
      };
    }
    setOpenModal(false);
    dispatch(createSubCategoriesAsync(payload));
    dispatch(fetchCategoriesAsync());
  };

  const onSubmit = async (formData) => {};

  return (
    <div>
      <div className="flex justify-between bg-white  px-4 py-6 dark:border-strokedark dark:bg-boxdark md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Add Sub-category
        </h4>
      </div>

      <div className="mb-6 grid grid-cols-5 gap-8">
        <div className="col-span-12 xl:col-span-6">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="p-7">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="">
                  <div className="col-span-full mb-5">
                    <label
                      htmlFor="category"
                      className="text-gray-900 text-md mb-1 block font-medium leading-6"
                    >
                      Category <span className="text-red">*</span>
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        value={selectedCategory}
                        {...register("category", {
                          required: "category is required",
                          onChange: (e) => {
                            console.log(
                              "Selected category event",
                              e.target.value,
                            );
                            setSelectedCategory(e.target.value);
                          },
                        })}
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                      >
                        <option
                          value=""
                          disabled
                          className="text-body dark:text-bodydark"
                        >
                          Select your category
                        </option>
                        {categoriesData.map((category, index) => (
                          <option
                            key={index}
                            value={`${category}`}
                            className="text-body dark:text-bodydark"
                          >
                            {category}
                          </option>
                        ))}
                      </select>

                      <span className="pointer-events-none absolute right-4 top-1/2 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                    {errors.category && (
                      <p className="text-red">{errors.category.message}</p>
                    )}
                  </div>
                  <div className="md: col-span-full gap-3 md:flex">
                    <div className="col-span-full mb-4 md:w-1/2">
                      <label
                        htmlFor="subcategory"
                        className="text-gray-900 text-md mb-1 block font-medium leading-6"
                      >
                        Sub Category
                      </label>
                      <div className="relative z-20 bg-transparent dark:bg-form-input">
                        <select
                          value={selectedSubCategory}
                          {...register("subcategory", {
                            onChange: (e) => {
                              console.log(
                                "Selected sub category event",
                                e.target.value,
                              );
                              setSelectedSubCategory(e.target.value); 
                            },
                          })}
                          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                        >
                          <option
                            value=""
                            disabled
                            className="text-body dark:text-bodydark"
                          >
                            Select your sub category
                          </option>
                          {subcategoriesData.map((category, index) => (
                            <option
                              key={index}
                              value={`${category}`}
                              className="text-body dark:text-bodydark capitalize"
                            >
                              {category}
                            </option>
                          ))}
                        </select>

                        <span className="pointer-events-none absolute right-4 top-1/2 z-30 -translate-y-1/2">
                          <svg
                            className="fill-current"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                fill=""
                              ></path>
                            </g>
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="col-span-full md:w-1/2">
                      <label
                        htmlFor="subcategory"
                        className="text-gray-900 text-md mb-1 block font-medium leading-6"
                      >
                        {" "}
                        {selectedCategory
                          ? `Create Sub Category for ${selectedCategory}`
                          : "Info: Subcategory will be created based on category"}
                      </label>

                      <div
                        disabled={selectedCategory?.length > 0 ? false : true}
                        onClick={(e) => {
                    
                          if (selectedCategory) {
                            setOpenModal(true);
                          } else {
                            toast.error("Choose category first.");
                          }
                        }}
                        className="text-grey flex w-full cursor-pointer justify-center rounded bg-whiter p-3 font-medium hover:bg-opacity-90"
                      >
                        Create Sub-category
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex justify-end gap-4.5">
                  {/* <button
                    className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    onClick={() => {
                      reset();
                    }}
                  >
                    Cancel
                  </button> */}
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

      {selectedCategory && (
        <SubCategoryModal
          title={`Create sub category for ${selectedCategory}`}
          message=""
          dangerOption=""
          saveOption="Save"
          cancelOption="Cancel"
          dangerAction={handleDelete}
          saveAction={handleSave}
          cancelAction={() => setOpenModal(false)}
          showModal={openModal}
          setCreateSubCategory={setCreateSubCategory}
        ></SubCategoryModal>
      )}
    </div>
  );
}
