import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Modal from "../common/ModalFile/Modal";
import SubcategoryModal from "../common/ModalFile/SubcategoryModal.js";
// import { useAlert } from "react-alert";
import {
  clearSelectedProduct,
  createProductAsync,
  fetchProductByIdAsync,
  selectBrands,
  selectCategories,
  selectProductById,
  updateProductAsync,
} from "../redux/product/productSlice";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
// import { useAlert } from "react-alert";

function ProductForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const params = useParams();
  const selectedProduct = useSelector(selectProductById);
  const [openModal, setOpenModal] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  // const alert = useAlert();

  const colors = [
    {
      name: "White",
      class: "bg-white",
      selectedClass: "ring-gray-400",
      id: "white",
    },
    {
      name: "Gray",
      class: "bg-gray-200",
      selectedClass: "ring-gray-400",
      id: "gray",
    },
    {
      name: "Black",
      class: "bg-gray-900",
      selectedClass: "ring-gray-900",
      id: "black",
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

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);
      setValue("price", selectedProduct.price);
      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("stock", selectedProduct.stock);
      setValue("image1", selectedProduct.images[0]);
      setValue("image2", selectedProduct.images[1]);
      setValue("image3", selectedProduct.images[2]);
      setValue("brand", selectedProduct.brand);
      setValue("category", selectedProduct.category);
      setValue("highlight1", selectedProduct.highlights[0]);
      setValue("highlight2", selectedProduct.highlights[1]);
      setValue("highlight3", selectedProduct.highlights[2]);
      setValue("highlight4", selectedProduct.highlights[3]);
      setValue(
        "sizes",
        selectedProduct.sizes.map((size) => size.id),
      );
      setValue(
        "colors",
        selectedProduct.colors.map((color) => color.id),
      );
    }
  }, [selectedProduct, params.id, setValue]);

  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.deleted = true;
    dispatch(updateProductAsync(product));
  };
  const handleSave = () => {
    // const product = { ...selectedProduct };
    // product.deleted = true;
    // dispatch(updateProductAsync(product));
  };
  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          console.log("data for product 1234 data", data);
          // const product =     {
          //   "title": "OPPOF19122337",
          //   "description": "OPPO F19 is officially announced on April 2021.",
          //   "price": 300,
          //   "discountPercentage": 17.91,
          //   "rating": 0,
          //   "stock": 123,
          //   "brand": "OPPO",
          //   "category": "smartphones",
          //   "thumbnail": "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
          //   "images": [
          //     "https://i.dummyjson.com/data/products/4/1.jpg",
          //     "https://i.dummyjson.com/data/products/4/2.jpg",
          //     "https://i.dummyjson.com/data/products/4/3.jpg",
          //     "https://i.dummyjson.com/data/products/4/thumbnail.jpg"
          //   ]
          // }
          const product = { ...data };
          product.images = [
            product.image1,
            product.image2,
            product.image3,
            product.thumbnail,
          ];
          product.highlights = [
            product.highlight1,
            product.highlight2,
            product.highlight3,
            product.highlight4,
          ];
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

          delete product["image1"];
          delete product["image2"];
          delete product["image3"];
          product.price = +product.price;
          product.stock = +product.stock;
          product.discountPercentage = +product.discountPercentage;
          console.log(product);
          if (params.id) {
            product.id = params.id;
            product.rating = selectedProduct.rating || 0;
            dispatch(updateProductAsync(product));
            // alert.success("Product Updated");

            reset();
          } else {
            dispatch(createProductAsync(product));
            // alert.success("Product Created");
            reset();
          }
        })}
      >
        <div className="space-y-12 bg-white p-12">
          <div className="border-gray-900/10 border-b pb-12">
            <h2 className="text-gray-900 text-base font-semibold leading-7">
              Add Product
            </h2>

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
                  Product Name
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
                  Description
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
                {errors.email && (
                  <p className="text-gray-600">{errors.description.message}</p>
                )}
              </div>

              {/* <div className="col-span-full">
                <label
                  htmlFor="brand"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Brand
                </label>
                <div className="mt-2">
                  <select
                    {...register("brand", {
                      required: "brand is required",
                    })}
                  >
                    <option value="">--choose brand--</option>
                    {brands?.map((brand) => (
                      <option key={brand.value} value={brand.value}>
                        {brand.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div> */}

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
                        type="checkbox"
                        {...register("colors", {})}
                        key={color.id}
                        value={color.id}
                      />{" "}
                      {color.name}
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
                        type="checkbox"
                        {...register("sizes", {})}
                        key={size.id}
                        value={size.id}
                      />{" "}
                      {size.name}
                    </>
                  ))}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="category"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Category
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      changeTextColor();
                    }}
                    {...register("category", {
                      required: "category is required",
                    })}
                    // className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                    //   isOptionSelected ? "text-black dark:text-white" : ""
                    // }`}
                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  >
                    <option
                      value=""
                      disabled
                      className="text-body dark:text-bodydark"
                    >
                      Select your subject
                    </option>
                    <option
                      value="USA"
                      className="text-body dark:text-bodydark"
                    >
                      USA
                    </option>
                    <option value="UK" className="text-body dark:text-bodydark">
                      UK
                    </option>
                    <option
                      value="Canada"
                      className="text-body dark:text-bodydark"
                    >
                      Canada
                    </option>
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
                {/* <div className="mt-2">
                  <select
                    {...register("category", {
                      required: "category is required",
                    })}
                  >
                    <option value="">--choose category--</option>
                    {colors?.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red">{errors.category.message}</p>
                  )}
                </div> */}
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="subcategory"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Create Sub Category
                </label>

                <button
                  disabled={selectedCategory?.length > 0 ? false : true}
                  onClick={(e) => {
                    // e.preventDefault();
                    setOpenModal(true);
                  }}
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Create Sub-category
                </button>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="subcategory"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Sub Category
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    // value={selectedOption}
                    // onChange={(e) => {
                    //   setSelectedOption(e.target.value);
                    //   changeTextColor();
                    // }}
                    {...register("category", {
                      required: "category is required",
                    })}
                    // className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                    //   isOptionSelected ? "text-black dark:text-white" : ""
                    // }`}
                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  >
                    <option
                      value=""
                      disabled
                      className="text-body dark:text-bodydark"
                    >
                      Select your subject
                    </option>
                    <option
                      value="USA"
                      className="text-body dark:text-bodydark"
                    >
                      USA
                    </option>
                    <option value="UK" className="text-body dark:text-bodydark">
                      UK
                    </option>
                    <option
                      value="Canada"
                      className="text-body dark:text-bodydark"
                    >
                      Canada
                    </option>
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
                {/* <div className="mt-2">
                  <select
                    {...register("category", {
                      required: "category is required",
                    })}
                  >
                    <option value="">--choose category--</option>
                    {colors?.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red">{errors.category.message}</p>
                  )}
                </div> */}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Price
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
                        required: "discountPercentage is required",
                        min: 0,
                        max: 100,
                      })}
                      id="discountPercentage"
                      className="w-full rounded-lg border-0 border-stroke bg-transparent py-2 pl-6 pr-2 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  {errors.discountPercentage && (
                    <p className="text-red">
                      {errors.discountPercentage.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Stock
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

              <div className="sm:col-span-6">
                <label
                  htmlFor="thumbnail"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Thumbnail
                </label>
                <div className="mt-2">
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
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="image1"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Image 1
                </label>
                <div className="mt-2">
                  <div className="ring-gray-300 flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("image1", {
                        required: "image1 is required",
                      })}
                      id="image1"
                      className="w-full rounded-lg border-0 border-stroke bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  {errors.image1 && (
                    <p className="text-red">{errors.image1.message}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="image2"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Image 2
                </label>
                <div className="mt-2">
                  <div className="ring-gray-300 flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("image2", {
                        required: "image is required",
                      })}
                      id="image2"
                      className="w-full rounded-lg border-0 border-stroke bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  {errors.image2 && (
                    <p className="text-red">{errors.image2.message}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="image2"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Image 3
                </label>
                <div className="mt-2">
                  <div className="ring-gray-300 flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("image3", {
                        required: "image is required",
                      })}
                      id="image3"
                      className="w-full rounded-lg border-0 border-stroke bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  {errors.image3 && (
                    <p className="text-red">{errors.image3.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* =================== deleted 01 */}

          {/* =================== deleted o1 */}
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-gray-900 text-sm font-semibold leading-6"
          >
            Cancel
          </button>

          {selectedProduct && !selectedProduct.deleted && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpenModal(true);
              }}
              className="bg-red-600 hover:bg-red-500 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Delete
            </button>
          )}

          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
      {selectedCategory && (
        <SubcategoryModal
          title={`Create sub category for ${category}`}
          message=""
          dangerOption=""
          saveOption="Save"
          cancelOption="Cancel"
          dangerAction={handleDelete}
          saveAction={handleSave}
          cancelAction={() => setOpenModal(null)}
          showModal={openModal}
        ></SubcategoryModal>
      )}
    </>
  );
}

export default ProductForm;
