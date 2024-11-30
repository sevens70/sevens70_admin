"use client";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
// import SubcategoryModal from "../../common/ModalFile/SubcategoryModal.js";
import {
  clearSelectedProduct,
  createProductAsync,
  // createSubCategoriesAsync,
  // fetchCategoriesAsync,
  fetchProductByIdAsync,
  selectProductById,
  selectProductListStatus,
  selectProductStatus,
  updateProductAsync,
} from "../../redux/product/productSlice.js";
import ShowWarningToast from "../../utils.js";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchSubcategories } from "../../redux/product/productAPI.js";
import toast from "react-hot-toast";
// import { selectProductListStatus } from "@/components/banners/bannersSlice.js";
import {
  allBrands,
  fetchBrandsAsync,
} from "@/components/brands/brandsSlice.js";
import Loader from "../../common/Loader";

function ProductForm({ title }) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, values },
  } = useForm();
  const dispatch = useDispatch();
  const params = useParams();
  const selectedProduct = useSelector(selectProductById);
  const selectedProductStatus = useSelector(selectProductStatus);
  const status = useSelector(selectProductListStatus);
  const brandList = useSelector(allBrands);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imgLoader, setImgLoader] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [subcategoriesData, setSubcategoriesData] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const router = useRouter();
  // const brands = [
  //   "Abc Fashion",
  //   "squire style",
  //   "Nice fashion",
  //   "xozo fashion",
  //   "style zone",
  //   "Cool style",
  //   "Modern look",
  // ];
  const prdType = ["Product", "Trending product", "Top product", "New arrival"];

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

  const colors = [
    {
      name: "Light Brown",
      class: "bg-priceColor",
      selectedClass: "#B5651D",
      id: "light_brown",
    },
    {
      name: "Red",
      class: "bg-primaryRed",
      selectedClass: "red",
      id: "red",
    },
    {
      name: "Green",
      class: "bg-successGreen",
      selectedClass: "green",
      id: "green",
    },
    {
      name: "Blue",
      class: "blue",
      selectedClass: "blue",
      id: "blue",
    },
    {
      name: "Light Purple",
      class: "light_purple",
      selectedClass: "purple",
      id: "light_purple",
    },
    {
      name: "Jean Blue",
      class: "jean blue",
      selectedClass: "#B5651D",
      id: "jean_blue",
    },
    {
      name: "Yellow",
      class: "yellow",
      selectedClass: "yellow",
      id: "yellow",
    },
  ];

  const sizes = [
    { name: "XXS", inStock: true, id: "xxs" },
    { name: "XS", inStock: true, id: "xs" },
    { name: "S", inStock: true, id: "s" },
    { name: "M", inStock: true, id: "m" },
    { name: "L", inStock: true, id: "l" },
    { name: "XL", inStock: true, id: "xl" },
    { name: "2XL", inStock: true, id: "2xl" },
    { name: "3XL", inStock: true, id: "3xl" },
  ];
  const tags = [
    { name: "bags", inStock: true, id: "bags" },
    { name: "ladies", inStock: true, id: "ladies bag" },
    { name: "fashion", inStock: true, id: "fashion" },
    { name: "shoes", inStock: true, id: "shoes" },
    { name: "cosmetics", inStock: true, id: "cosmetics" },
  ];

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    } else {
      dispatch(clearSelectedProduct());
    }
    dispatch(fetchBrandsAsync());
  }, [params.id, dispatch]);

  useEffect(() => {
    if (selectedProduct && params.id) {
      setSelectedCategory(selectedProduct.category);
      setSelectedSubCategory(selectedProduct.subcategory);
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);
      setValue("price", selectedProduct.price);
      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("model", selectedProduct.model);
      setValue("stock", selectedProduct.stock);
      setValue("image1", selectedProduct.images[0]);
      setValue("image2", selectedProduct.images[1]);
      setValue("image3", selectedProduct.images[2]);
      setValue("brand", selectedProduct.brand ?? "");
      setValue("sku", selectedProduct.sku);
      setValue("type", selectedProduct.type);
      setValue("category", selectedProduct.category);
      setValue("subcategory", selectedProduct.subcategory);
      setValue(
        "sizes",
        selectedProduct.sizes.map((size) => size?.id),
      );
      setValue(
        "tags",
        selectedProduct.tags.map((tag) => tag?.id),
      );
      setValue(
        "colors",
        selectedProduct.colors.map((color) => color?.id),
      );
      setProductImages(selectedProduct?.images || []);
    }
  }, [selectedProduct, params.id, setValue]);

  const fetchSubCategoriesData = async () => {
    try {
      const response = await fetchSubcategories(selectedCategory);
      if (response.data?.subcategories?.length > 0) {
        const subcategoryNames = response.data?.subcategories?.map(
          (sub) => sub.name,
        );
        setSubcategoriesData(subcategoryNames);
      } else {
        setSubcategoriesData([]);
      }
    } catch (error) {
      toast.error("Error fetching categories.");
    }
  };
  useEffect(() => {
    if (selectedCategory) {
      fetchSubCategoriesData();
    }
  }, [selectedCategory]);

  const handleProductImageUpload = async (e) => {
    setImgLoader(true);
    const files = e.target.files;
    const formData = new FormData();
    const uploadedImages = [];
    if (files.length > 0) {
      ShowWarningToast("Please wait for uploading...");
    }
    for (let file of files) {
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
        uploadedImages.push(data.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
        setImgLoader(false);
        toast.error(`${error.message}`);
      }
    }
    if (selectedProduct && params.id) {
      setProductImages((prevImages) => [...prevImages, ...uploadedImages]);
    } else {
      setProductImages(uploadedImages);
    }
    setImgLoader(false);
    toast.success("Successfully upload images.");
    // if (uploadedImages?.length) setThumbnail(uploadedImages[0]);
  };
  const handleThumbnailImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      ShowWarningToast("Please wait for uploading...");
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
        if (data.secure_url) {
          setValue("thumbnail", data.secure_url);
          toast.success("Successfully uploaded image.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error(`${error.message}`);
      }
    }
  };
  const formValues = watch();

  const isThumbnailUploaded = () => {
    return (
      typeof formValues.thumbnail === "string" &&
      formValues.thumbnail.length > 0
    );
  };
  const handleDeleteThumbnail = () => {
    setValue("thumbnail", "");
  };
  const handleDeleteImages = (idx) => {
    setProductImages((prevImages) =>
      prevImages.filter((_, index) => index !== idx),
    );
  };

  useEffect(() => {
    if (selectedProductStatus === "success") {
      setSelectedCategory("");
      setSelectedSubCategory("");
      setProductImages([]);
      reset();
    }
  }, [selectedProductStatus]);

  // console.log("brandslist 000", brandList);
  const brands = brandList?.map((sub) => sub.name);
  if (status === "loading") {
    return <Loader />;
  }

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          const product = { ...data };
          product.images = [...productImages];
          // product.images.push(product.thumbnail);
          // product.thumbnail = thumbnail;
          product.rating = 0;
          if (product.colors) {
            product.colors = product.colors.map((color) =>
              colors.find((clr) => clr.id === color),
            );
          }
          if (product.sizes) {
            product.sizes = product.sizes.map((size) =>
              sizes.find((sz) => sz.id === size),
            );
          }
          if (product.tags) {
            product.tags = product.tags.map((tag) =>
              tags.find((sz) => sz.id === tag),
            );
          }

          product.price = +product.price;
          product.stock = +product.stock;
          product.discountPercentage = +product.discountPercentage || 0;
          console.log(product);
          if (params.id) {
            product.id = params.id;
            product.rating = selectedProduct.rating || 0;
            dispatch(updateProductAsync(product));
            router.push("/products");
          } else {
            dispatch(createProductAsync(product));
          }
        })}
      >
        <div className="space-y-12 bg-white p-12 dark:border-strokedark dark:bg-boxdark">
          <div className="border-gray-900/10 border-b pb-12">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              {title}
            </h4>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {selectedProduct && selectedProduct.deleted && (
                <h2 className="text-red-500 sm:col-span-6">
                  This product is deleted
                </h2>
              )}

              <div className="sm:col-span-6">
                <label
                  htmlFor="title"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Product Name <span className="text-red">*</span>
                </label>
                <div className="mt-2">
                  <div className="ring-gray-300 flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("title", {
                        required: "name is required",
                      })}
                      id="title"
                      // className="text-gray-900 placeholder:text-gray-400 block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                      className="w-full rounded-lg border-0 border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  {errors.title && (
                    <p className="text-red">{errors.title.message}</p>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Description <span className="text-red">*</span>
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "description is required",
                    })}
                    rows={3}
                    className="ing-gray-300 w-full rounded-lg bg-transparent py-4 pl-6 pr-10 text-black outline-none ring-1 ring-inset focus:border-primary focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    defaultValue={""}
                  />
                </div>
                <p className="text-gray-600 mt-3 text-sm leading-6">
                  Write a few sentences about product.
                </p>
                {errors.description && (
                  <p className="text-red">{errors.description.message}</p>
                )}
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="brand"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Brand
                  {/* <span className="text-red">*</span> */}
                </label>
                <div className="mt-2">
                  <select
                    {...register("brand", {
                      // required: "brand is required",
                    })}
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 capitalize outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option value="">--choose brand--</option>
                    {brands?.map((brand) => (
                      <option className="capitalize" key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>
                {/* {errors.brand && (
                  <p className="text-red">{errors.brand.message}</p>
                )} */}
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="title"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  SKU
                </label>
                <div className="mt-2">
                  <div className="ring-gray-300 flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("sku", {
                        // required: "name is required",
                      })}
                      id="sku"
                      // className="text-gray-900 placeholder:text-gray-400 block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                      className="w-full rounded-lg border-0 border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="sku"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Type
                </label>
                <div className="mt-2">
                  <select
                    {...register("type", {
                      // required: "brand is required",
                    })}
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option value="">--choose tyoe--</option>
                    {prdType?.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>
                {/* {errors.type && (
                  <p className="text-red">{errors.type.message}</p>
                )} */}
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="colors"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Colors
                </label>
                <div className="mt-2">
                  {colors.map((color) => (
                    <>
                      <input
                        className="cursor-pointer"
                        type="checkbox"
                        {...register("colors", {})}
                        key={color.id}
                        value={color.id}
                      />{" "}
                      <span className="mr-3">{color.name}</span>
                    </>
                  ))}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="sizes"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Sizes
                </label>
                <div className="mt-2">
                  {sizes.map((size) => (
                    <>
                      <input
                        className="cursor-pointer"
                        type="checkbox"
                        {...register("sizes", {})}
                        key={size.id}
                        value={size.id}
                      />{" "}
                      <span className="mr-3">{size.name}</span>
                    </>
                  ))}
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="tags"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Tags
                </label>
                <div className="mt-2">
                  {tags.map((tag) => (
                    <>
                      <input
                        className="cursor-pointer"
                        type="checkbox"
                        {...register("tags", {})}
                        key={tag.id}
                        value={tag.id}
                      />{" "}
                      <span className="mr-3">{tag.name}</span>
                    </>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="category"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Category <span className="text-red">*</span>
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    id="category"
                    value={selectedCategory}
                    {...register("category", {
                      required: "category is required",
                      onChange: (e) => {
                        console.log("Selected category event", e.target.value);
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
                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 capitalize outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  >
                    <option
                      value=""
                      disabled
                      className="text-body dark:text-bodydark "
                    >
                      Select your sub category
                    </option>
                    {subcategoriesData.map((category, index) => (
                      <option
                        key={index}
                        value={`${category}`}
                        className="!capitalize text-body dark:text-bodydark"
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

              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Price <span className="text-red">*</span>
                </label>
                <div className="mt-2">
                  <div className="ring-gray-300 flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="number"
                      {...register("price", {
                        required: "price is required",
                        min: 1,
                        max: 10000,
                      })}
                      id="price"
                      // className="text-gray-900 placeholder:text-gray-400 block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                      className="w-full rounded-lg border-0 border-stroke bg-transparent py-2 pl-6 pr-2 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  {errors.price && (
                    <p className="text-red">{errors.price.message}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="discountPercentage"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Discount Percentage
                </label>
                <div className="mt-2">
                  <div className="ring-gray-300 flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="number"
                      {...register("discountPercentage", {
                        // required: "discountPercentage is required",
                        // min: 0,
                        // max: 100,
                      })}
                      id="discountPercentage"
                      className="w-full rounded-lg border-0 border-stroke bg-transparent py-2 pl-6 pr-2 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  {/*                   
                  {errors.discountPercentage && (
                    <p className="text-red">
                      {errors.discountPercentage.message}
                    </p>
                  )} */}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Stock <span className="text-red">*</span>
                </label>
                <div className="mt-2">
                  <div className="ring-gray-300 flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="number"
                      {...register("stock", {
                        required: "stock is required",
                        min: 0,
                      })}
                      id="stock"
                      className="w-full rounded-lg border-0 border-stroke bg-transparent py-2 pl-6 pr-2 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  {errors.stock && (
                    <p className="text-red">{errors.stock.message}</p>
                  )}
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="model"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Model <span className="text-red">*</span>
                </label>
                <div className="mt-2">
                  <div className="ring-gray-300 flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="string"
                      {...register("model", {
                        required: "model is required",
                        min: 0,
                      })}
                      id="model"
                      className="w-full rounded-lg border-0 border-stroke bg-transparent py-2 pl-6 pr-2 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  {errors.model && (
                    <p className="text-red">{errors.model.message}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-6">
                <div>
                  {" "}
                  <label
                    htmlFor="thumbnail"
                    className="text-gray-900 block text-sm font-medium leading-6"
                  >
                    Thumbnail<span className="text-red">*</span>
                  </label>
                </div>
                {/* <div className="mt-2">
                  <div className="ring-gray-300 flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("thumbnail", {
                        required: "thumbnail is required",
                      })}
                      id="thumbnail"
                      className="w-full rounded-lg border-0 border-stroke bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  {errors.thumbnail && (
                    <p className="text-red">{errors.thumbnail.message}</p>
                  )}
                </div> */}
                <div className="">
                  <div className="mb-2 ">
                    <div className="w-full">
                      {isThumbnailUploaded() ? (
                        <div className="thumbnail__area relative">
                          <img
                            src={formValues?.thumbnail}
                            className="h-[150px] w-[150px] object-cover" // Ensure correct class syntax for width and height
                            alt="thumbnail"
                          />
                          {formValues?.thumbnail && (
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
                        </div>
                      ) : (
                        <input
                          className="form-control text-gray-700 border-gray-300 focus:text-gray-700 m-0 mt-8 block w-full rounded border border-solid bg-white bg-clip-padding px-2 py-1.5 text-base font-normal transition ease-in-out focus:border-blue-600 focus:bg-white focus:outline-none"
                          type="file"
                          {...register("thumbnail", {
                            required: "thumbnail is required",
                          })}
                          id="thumbnailFile"
                          onChange={handleThumbnailImageUpload}
                        />
                      )}
                    </div>
                  </div>
                  {errors.thumbnail && (
                    <p className="text-red">{errors.thumbnail.message}</p>
                  )}
                </div>
              </div>
              {/* =================== */}
              <div className="sm:col-span-6">
                {" "}
                <h2 className="mb-3 text-lg font-medium">
                  Upload Product Images
                </h2>
                <div className="mt-[-20px]">
                  {imgLoader ? (
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
                  ) : (
                    <div className="w-full">
                      <input
                        className="form-control text-gray-700 border-gray-300 focus:text-gray-700 m-0 mt-8 block w-full rounded border border-solid bg-white bg-clip-padding px-2 py-1.5 text-base font-normal transition ease-in-out focus:border-blue-600 focus:bg-white focus:outline-none"
                        type="file"
                        id="formFile"
                        multiple
                        onChange={handleProductImageUpload}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <div className="mt-5 flex gap-3">
                    {productImages?.map((item, idx) => (
                      <div className="prd_images__area relative">
                        <img
                          src={item}
                          className="h-[150px] w-[150px] object-cover" // Ensure correct class syntax for width and height
                          alt="thumbnail"
                        />
                        {item && (
                          <p
                            onClick={() => handleDeleteImages(idx)}
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
                      </div>

                      // </div>
                    ))}
                  </div>
                </div>
                {/* <div className="my-5">
                  <img
                    src={""}
                    alt="Preview"
                    className="col-span-1 h-full w-full rounded border-2 border-gray object-contain p-2 shadow"
                    width="50"
                    height="50"
                  />
                </div> */}
              </div>
              {/* =================== */}
            </div>
          </div>
        </div>

        <div className="mb-6 mt-3 flex items-center justify-end gap-x-6 pr-12">
          <button
            onClick={() => router.push("/products")}
            type="button"
            className="text-gray-900 rounded border border-red px-2 py-1 text-sm font-semibold leading-6 text-red"
          >
            Cancel
          </button>

          {/* {selectedProduct && !selectedProduct.deleted && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpenModal(true);
              }}
              className="bg-red-600 hover:bg-red-500 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Delete
            </button>
          )} */}

          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
      {/* {selectedCategory && (
        <SubcategoryModal
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
        ></SubcategoryModal>
      )} */}
    </>
  );
}

export default ProductForm;
