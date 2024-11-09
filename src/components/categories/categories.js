"use client";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/product/productAPI";
import SubCategoryModal from "../common/ModalFile/SubcategoryModal";
import {
  createSubCategoriesAsync,
  fetchCategoriesAsync,
} from "../redux/product/productSlice";
export default function CategoriesPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const formValues = watch();
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
  const [createSubCategory, setCreateSubCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [subcategoriesData, setSubcategoriesData] = useState([]);
  const [allCategoriesData, setAllcategoriesData] = useState([]);
  const [allowForm, setAllowform] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const fetchSubCategoriesData = async () => {
    try {
      const response = await fetchCategories();
      setAllcategoriesData(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  console.log("response data 1234 selectedCategory", selectedCategory);
  // const fetchSubCategoriesData = async () => {
  //   try {
  //     const response = await fetchSubcategories(selectedCategory);
  //     console.log("response data 1234", response.data, selectedCategory);
  //     // setAllcategoriesData(response.data);
  //     if (response.data?.subcategories?.length > 0) {
  //       const subcategoryNames = response.data?.subcategories?.map(
  //         (sub) => sub.name,
  //       );
  //       setSubcategoriesData(subcategoryNames);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //   }
  // };
  useEffect(() => {
    if (selectedCategory) {
      fetchSubCategoriesData();
    }
  }, [openModal]);
  useEffect(() => {
    if (selectedCategory) {
      const selectedCategoryData = allCategoriesData.find(
        (category) =>
          category.name.toLowerCase() === selectedCategory.toLowerCase(),
      );

      if (selectedCategoryData) {
        const subcategoryNames = selectedCategoryData.subcategories.map(
          (sub) => sub.name,
        );
        setSubcategoriesData(subcategoryNames);
      } else {
        setSubcategoriesData([]);
      }
    }
  }, [selectedCategory, allCategoriesData]);
  const handleDelete = () => {
    // setOpenModal(false);
    // dispatch(fetchBrandsAsync());
  };
  const handleSave = () => {
    let payload = {};
    if (selectedCategory && createSubCategory) {
      payload = {
        categoryName: selectedCategory.toLowerCase(),
        subcategoryName: createSubCategory.toLowerCase(),
      };
    } else {
      //show toaster message
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
          Categories
        </h4>
        <button
          onClick={() => setAllowform(!allowForm)}
          className="border-stroke"
        >
          Add new Brand
        </button>
      </div>

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
                  {/* <div className="w-1/2">
            
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="logoUrl"
                    >
                      Brand Image
                    </label>
                    <div
                      id="logoUrl"
                      className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                 
                        id="logoUrl"
                        onChange={handleProductImageUpload}
                      />
                 

                      <div className="flex flex-col items-center justify-center space-y-3">
                  
                        <p>
                          <span className="text-primary">Click to upload</span>
                        </p>
                        <p className="mt-1.5">PNG, JPG, SVG, </p>
                        <p>(max, 135px X 30px)</p>
                      </div>
                    </div>
               
                  </div> */}
                  <div className="col-span-full">
                    <label
                      htmlFor="category"
                      className="text-gray-900 block text-sm font-medium leading-6"
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

                      <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
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
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="subcategory"
                      className="text-gray-900 block text-sm font-medium leading-6"
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
                            ); // Logs the selected value
                            setSelectedSubCategory(e.target.value); // Update the selected category state
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
                            className="text-body dark:text-bodydark"
                          >
                            {category}
                          </option>
                        ))}
                      </select>

                      <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
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
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="subcategory"
                      className="text-gray-900 block text-sm font-medium leading-6"
                    >
                      {" "}
                      {selectedCategory
                        ? `Create Sub Category for ${selectedCategory}`
                        : "Info: Subcategory create based on category"}
                    </label>

                    <div
                      disabled={selectedCategory?.length > 0 ? false : true}
                      onClick={(e) => {
                        // e.preventDefault();
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

                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    // type="submit"
                    onClick={() => {
                      reset();
                      setAllowform(false);
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
