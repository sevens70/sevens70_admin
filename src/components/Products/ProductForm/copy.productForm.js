// "use client";
// import { useDispatch, useSelector } from "react-redux";
// import { useForm } from "react-hook-form";
// import SubcategoryModal from "../../common/ModalFile/SubcategoryModal.js";
// import {
//   clearSelectedProduct,
//   createProductAsync,
//   createSubCategoriesAsync,
//   fetchCategoriesAsync,
//   fetchProductByIdAsync,
//   selectProductById,
//   updateProductAsync,
// } from "../../redux/product/productSlice.js";
// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { fetchCategories } from "../../redux/product/productAPI.js";
// import toast from "react-hot-toast";

// function ProductForm({ title }) {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     reset,
//     formState: { errors, values },
//   } = useForm();
//   // const brands = useSelector(selectBrands);
//   const dispatch = useDispatch();
//   const params = useParams();
//   const selectedProduct = useSelector(selectProductById);
//   const productState = useSelector((state) => state.product);
//   // const allCategories = useSelector(selectAllCategories);
//   const router = useRouter();
//   const brands = [
//     "Abc Fashion",
//     "squire style",
//     "Nice fashion",
//     "xozo fashion",
//     "style zone",
//     "Cool style",
//     "Modern look",
//   ];

//   console.log("productState", productState);
//   const [openModal, setOpenModal] = useState(false);
//   // const [selectedCategory, setSelectedCategory] = useState("");
//   const [categoriesData, setCategoriesData] = useState([
//     "Home",
//     "Men",
//     "Women",
//     "Accessories",
//     "Shop",
//   ]);
//   const [createSubCategory, setCreateSubCategory] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedSubCategory, setSelectedSubCategory] = useState("");
//   const [subcategoriesData, setSubcategoriesData] = useState([]);
//   const [allCategoriesData, setAllcategoriesData] = useState([]);
//   const [productImages, setProductImages] = useState([]);
//   const [thumbnail, setThumbnail] = useState(null);
//   //colors should be edited only code wll be sent
//   const colors = [
//     {
//       name: "Gray",
//       class: "bg-priceColor",
//       selectedClass: "ring-gray-400",
//       id: "white",
//     },
//     {
//       name: "Red",
//       class: "bg-primaryRed",
//       selectedClass: "ring-gray-400",
//       id: "gray",
//     },
//     {
//       name: "Green",
//       class: "bg-successGreen",
//       selectedClass: "ring-gray-900",
//       id: "black",
//     },
//   ];

//   const sizes = [
//     { name: "XXS", inStock: true, id: "xxs" },
//     { name: "XS", inStock: true, id: "xs" },
//     { name: "S", inStock: true, id: "s" },
//     { name: "M", inStock: true, id: "m" },
//     { name: "L", inStock: true, id: "l" },
//     { name: "XL", inStock: true, id: "xl" },
//     { name: "2XL", inStock: true, id: "2xl" },
//     { name: "3XL", inStock: true, id: "3xl" },
//   ];
//   const tags = [
//     { name: "bags", inStock: true, id: "bags" },
//     { name: "ladies", inStock: true, id: "ladies bag" },
//     { name: "fashion", inStock: true, id: "fashion" },
//     { name: "shoes", inStock: true, id: "shoes" },
//     { name: "cosmetics", inStock: true, id: "cosmetics" },
//   ];

//   useEffect(() => {
//     if (params.id) {
//       dispatch(fetchProductByIdAsync(params.id));
//     } else {
//       dispatch(clearSelectedProduct());
//     }
//     dispatch(fetchCategoriesAsync());
//   }, [params.id, dispatch]);

//   useEffect(() => {
//     console.log(
//       "123444",
//       selectedProduct?.tags.map((tag) => tag.id),
//     );
//     if (selectedProduct && params.id) {
//       setSelectedCategory(selectedProduct.category);
//       setSelectedSubCategory(selectedProduct.subcategory);
//       setValue("title", selectedProduct.title);
//       setValue("description", selectedProduct.description);
//       setValue("price", selectedProduct.price);
//       setValue("discountPercentage", selectedProduct.discountPercentage);
//       setValue("thumbnail", selectedProduct.thumbnail);
//       setValue("model", selectedProduct.model);
//       setValue("stock", selectedProduct.stock);
//       // setValue("categor", selectedProduct.stock);
//       setValue("image1", selectedProduct.images[0]);
//       setValue("image2", selectedProduct.images[1]);
//       setValue("image3", selectedProduct.images[2]);
//       setValue("brand", selectedProduct.brand);
//       setValue("category", selectedProduct.category);
//       setValue("subcategory", selectedProduct.subcategory);
//       setValue("highlight1", selectedProduct.highlights[0]);
//       setValue("highlight2", selectedProduct.highlights[1]);
//       setValue("highlight3", selectedProduct.highlights[2]);
//       setValue("highlight4", selectedProduct.highlights[3]);
//       setValue(
//         "sizes",
//         selectedProduct.sizes.map((size) => size.id),
//       );
//       setValue(
//         "tags",
//         selectedProduct.tags.map((tag) => tag.id),
//       );
//       setValue(
//         "colors",
//         selectedProduct.colors.map((color) => color.id),
//       );
//     }
//   }, [selectedProduct, params.id, setValue]);

//   console.log("selectedProduct 123", selectedProduct);
//   const fetchSubCategoriesData = async () => {
//     try {
//       const response = await fetchCategories();
//       setAllcategoriesData(response.data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };
//   useEffect(() => {
//     fetchSubCategoriesData();
//   }, [openModal]);

//   useEffect(() => {
//     if (selectedCategory) {
//       const selectedCategoryData = allCategoriesData.find(
//         (category) =>
//           category.name.toLowerCase() === selectedCategory.toLowerCase(),
//       );

//       if (selectedCategoryData) {
//         const subcategoryNames = selectedCategoryData.subcategories.map(
//           (sub) => sub.name,
//         );
//         setSubcategoriesData(subcategoryNames);
//       } else {
//         setSubcategoriesData([]);
//       }
//     }
//   }, [selectedCategory, allCategoriesData]);

//   const handleDelete = () => {
//     const product = { ...selectedProduct };
//     product.deleted = true;
//     dispatch(updateProductAsync(product));
//   };
//   const handleSave = () => {
//     let payload = {};
//     if (selectedCategory && createSubCategory) {
//       payload = {
//         categoryName: selectedCategory.toLowerCase(),
//         subcategoryName: createSubCategory.toLowerCase(),
//       };
//     } else {
//       //show toaster message
//     }
//     setOpenModal(false);
//     dispatch(createSubCategoriesAsync(payload));
//     dispatch(fetchCategoriesAsync());
//   };
//   // ====================
//   // const handleProductImageUpload = (e) => {
//   //   const file = e.target.files[0];

//   //   TransformFileData(file);
//   // };
//   const handleProductImageUpload = async (e) => {
//     const files = Array.from(e.target.files);
//     console.log("files 123", files);
//     // Transform files to base64 for preview
//     const base64Files = await Promise.all(
//       files.map((file) => {
//         return new Promise((resolve, reject) => {
//           const reader = new FileReader();
//           reader.onloadend = () => resolve(reader.result);
//           reader.onerror = reject;
//           reader.readAsDataURL(file);
//         });
//       }),
//     );

//     // Set images and designate the first as the thumbnail
//     setProductImages(base64Files);
//     if (base64Files.length) setThumbnail(base64Files[0]);
//   };

//   // ====================
// //if i want to use this then api limit size should be increased by putting them in index.js
// // app.use(express.json({ limit: "10mb" })); // Adjust based on your needs
// // app.use(express.urlencoded({ limit: "10mb", extended: true }));

//   console.log("files 123 980", productImages, thumbnail);

//   return (
//     <>
//       <form
//         noValidate
//         onSubmit={handleSubmit((data) => {
//           console.log("data for product 1234 data", data);
//           const product = { ...data };
//           // product.images = [
//           //   product.image1,
//           //   product.image2,
//           //   product.image3,
//           //   product.thumbnail,
//           // ];
//           product.images = [...productImages];
//           product.images.push(product.thumbnail);
//           // product.thumbnail = thumbnail;
//           product.rating = 0;
//           if (product.colors) {
//             product.colors = product.colors.map((color) =>
//               colors.find((clr) => clr.id === color),
//             );
//           }
//           if (product.sizes) {
//             product.sizes = product.sizes.map((size) =>
//               sizes.find((sz) => sz.id === size),
//             );
//           }
//           if (product.tags) {
//             product.tags = product.tags.map((tag) =>
//               tags.find((sz) => sz.id === tag),
//             );
//           }

//           // delete product["image1"];
//           // delete product["image2"];
//           // delete product["image3"];
//           product.price = +product.price;
//           product.stock = +product.stock;
//           product.discountPercentage = +product.discountPercentage;
//           console.log(product);
//           if (params.id) {
//             product.id = params.id;
//             product.rating = selectedProduct.rating || 0;
//             dispatch(updateProductAsync(product));
//             toast.success("Product Updated");

//             // reset();
//           } else {
//             dispatch(createProductAsync(product));
//             setSelectedCategory("");
//             setSelectedSubCategory("");
//             toast.success("Product Created");
//             // reset();
//           }
//         })}
//       >
//         <div className="space-y-12 bg-white p-12">
//           <div className="border-gray-900/10 border-b pb-12">
//             <h4 className="text-xl font-semibold text-black dark:text-white">
//               {title}
//             </h4>

//             <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//               {selectedProduct && selectedProduct.deleted && (
//                 <h2 className="text-red-500 sm:col-span-6">
//                   This product is deleted
//                 </h2>
//               )}

//               <div className="sm:col-span-6">
//                 <label
//                   htmlFor="title"
//                   className="text-gray-900 block text-sm font-medium leading-6"
//                 >
//                   Product Name <span className="text-red">*</span>
//                 </label>
//                 <div className="mt-2">
//                   <div className="ring-gray-300 flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
//                     <input
//                       type="text"
//                       {...register("title", {
//                         required: "name is required",
//                       })}
//                       id="title"
//                       // className="text-gray-900 placeholder:text-gray-400 block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
//                       className="w-full rounded-lg border-0 border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                     />
//                   </div>
//                   {errors.title && (
//                     <p className="text-red">{errors.title.message}</p>
//                   )}
//                 </div>
//               </div>

//               <div className="col-span-full">
//                 <label
//                   htmlFor="description"
//                   className="text-gray-900 block text-sm font-medium leading-6"
//                 >
//                   Description <span className="text-red">*</span>
//                 </label>
//                 <div className="mt-2">
//                   <textarea
//                     id="description"
//                     {...register("description", {
//                       required: "description is required",
//                     })}
//                     rows={3}
//                     className="ing-gray-300 w-full rounded-lg bg-transparent py-4 pl-6 pr-10 text-black outline-none ring-1 ring-inset focus:border-primary focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                     defaultValue={""}
//                   />
//                 </div>
//                 <p className="text-gray-600 mt-3 text-sm leading-6">
//                   Write a few sentences about product.
//                 </p>
//                 {errors.description && (
//                   <p className="text-red">{errors.description.message}</p>
//                 )}
//               </div>

//               <div className="col-span-full">
//                 <label
//                   htmlFor="brand"
//                   className="text-gray-900 block text-sm font-medium leading-6"
//                 >
//                   Brand <span className="text-red">*</span>
//                 </label>
//                 <div className="mt-2">
//                   <select
//                     {...register("brand", {
//                       required: "brand is required",
//                     })}
//                     className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
//                   >
//                     <option value="">--choose brand--</option>
//                     {brands?.map((brand) => (
//                       <option key={brand} value={brand}>
//                         {brand}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 {errors.brand && (
//                   <p className="text-red">{errors.brand.message}</p>
//                 )}
//               </div>
//               <div className="col-span-full">
//                 <label
//                   htmlFor="colors"
//                   className="text-gray-900 block text-sm font-medium leading-6"
//                 >
//                   Colors
//                 </label>
//                 <div className="mt-2">
//                   {colors.map((color) => (
//                     <>
//                       <input
//                         type="checkbox"
//                         {...register("colors", {})}
//                         key={color.id}
//                         value={color.id}
//                       />{" "}
//                       <span className="mr-3">{color.name}</span>
//                     </>
//                   ))}
//                 </div>
//               </div>

//               <div className="col-span-full">
//                 <label
//                   htmlFor="sizes"
//                   className="text-gray-900 block text-sm font-medium leading-6"
//                 >
//                   Sizes
//                 </label>
//                 <div className="mt-2">
//                   {sizes.map((size) => (
//                     <>
//                       <input
//                         type="checkbox"
//                         {...register("sizes", {})}
//                         key={size.id}
//                         value={size.id}
//                       />{" "}
//                       <span className="mr-3">{size.name}</span>
//                     </>
//                   ))}
//                 </div>
//               </div>
//               <div className="col-span-full">
//                 <label
//                   htmlFor="tags"
//                   className="text-gray-900 block text-sm font-medium leading-6"
//                 >
//                   Tags
//                 </label>
//                 <div className="mt-2">
//                   {tags.map((tag) => (
//                     <>
//                       <input
//                         type="checkbox"
//                         {...register("tags", {})}
//                         key={tag.id}
//                         value={tag.id}
//                       />{" "}
//                       <span className="mr-3">{tag.name}</span>
//                     </>
//                   ))}
//                 </div>
//               </div>

//               <div className="col-span-full">
//                 <label
//                   htmlFor="category"
//                   className="text-gray-900 block text-sm font-medium leading-6"
//                 >
//                   Category <span className="text-red">*</span>
//                 </label>
//                 <div className="relative z-20 bg-transparent dark:bg-form-input">
//                   <select
//                     value={selectedCategory}
//                     {...register("category", {
//                       required: "category is required",
//                       onChange: (e) => {
//                         console.log("Selected category event", e.target.value);
//                         setSelectedCategory(e.target.value);
//                       },
//                     })}
//                     className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
//                   >
//                     <option
//                       value=""
//                       disabled
//                       className="text-body dark:text-bodydark"
//                     >
//                       Select your category
//                     </option>
//                     {categoriesData.map((category, index) => (
//                       <option
//                         key={index}
//                         value={`${category}`}
//                         className="text-body dark:text-bodydark"
//                       >
//                         {category}
//                       </option>
//                     ))}
//                   </select>

//                   <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
//                     <svg
//                       className="fill-current"
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <g opacity="0.8">
//                         <path
//                           fillRule="evenodd"
//                           clipRule="evenodd"
//                           d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
//                           fill=""
//                         ></path>
//                       </g>
//                     </svg>
//                   </span>
//                 </div>
//                 {errors.category && (
//                   <p className="text-red">{errors.category.message}</p>
//                 )}
//               </div>
//               <div className="col-span-full">
//                 <label
//                   htmlFor="subcategory"
//                   className="text-gray-900 block text-sm font-medium leading-6"
//                 >
//                   Create Sub Category{" "}
//                   {selectedCategory && `for ${selectedCategory}`}
//                 </label>

//                 <div
//                   disabled={selectedCategory?.length > 0 ? false : true}
//                   onClick={(e) => {
//                     // e.preventDefault();
//                     setOpenModal(true);
//                   }}
//                   className="text-grey flex w-full cursor-pointer justify-center rounded bg-whiter p-3 font-medium hover:bg-opacity-90"
//                 >
//                   Create Sub-category
//                 </div>
//               </div>
//               <div className="col-span-full">
//                 <label
//                   htmlFor="subcategory"
//                   className="text-gray-900 block text-sm font-medium leading-6"
//                 >
//                   Sub Category
//                 </label>
//                 <div className="relative z-20 bg-transparent dark:bg-form-input">
//                   <select
//                     value={selectedSubCategory}
//                     {...register("subcategory", {
//                       onChange: (e) => {
//                         console.log(
//                           "Selected sub category event",
//                           e.target.value,
//                         ); // Logs the selected value
//                         setSelectedSubCategory(e.target.value); // Update the selected category state
//                       },
//                     })}
//                     className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
//                   >
//                     <option
//                       value=""
//                       disabled
//                       className="text-body dark:text-bodydark"
//                     >
//                       Select your category
//                     </option>
//                     {subcategoriesData.map((category, index) => (
//                       <option
//                         key={index}
//                         value={`${category}`}
//                         className="text-body dark:text-bodydark"
//                       >
//                         {category}
//                       </option>
//                     ))}
//                   </select>

//                   <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
//                     <svg
//                       className="fill-current"
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <g opacity="0.8">
//                         <path
//                           fillRule="evenodd"
//                           clipRule="evenodd"
//                           d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
//                           fill=""
//                         ></path>
//                       </g>
//                     </svg>
//                   </span>
//                 </div>
//               </div>

//               <div className="sm:col-span-2">
//                 <label
//                   htmlFor="price"
//                   className="text-gray-900 block text-sm font-medium leading-6"
//                 >
//                   Price <span className="text-red">*</span>
//                 </label>
//                 <div className="mt-2">
//                   <div className="ring-gray-300 flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
//                     <input
//                       type="number"
//                       {...register("price", {
//                         required: "price is required",
//                         min: 1,
//                         max: 10000,
//                       })}
//                       id="price"
//                       // className="text-gray-900 placeholder:text-gray-400 block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
//                       className="w-full rounded-lg border-0 border-stroke bg-transparent py-2 pl-6 pr-2 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                     />
//                   </div>
//                   {errors.price && (
//                     <p className="text-red">{errors.price.message}</p>
//                   )}
//                 </div>
//               </div>

//               <div className="sm:col-span-2">
//                 <label
//                   htmlFor="discountPercentage"
//                   className="text-gray-900 block text-sm font-medium leading-6"
//                 >
//                   Discount Percentage <span className="text-red">*</span>
//                 </label>
//                 <div className="mt-2">
//                   <div className="ring-gray-300 flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
//                     <input
//                       type="number"
//                       {...register("discountPercentage", {
//                         required: "discountPercentage is required",
//                         min: 0,
//                         max: 100,
//                       })}
//                       id="discountPercentage"
//                       className="w-full rounded-lg border-0 border-stroke bg-transparent py-2 pl-6 pr-2 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                     />
//                   </div>
//                   -
//                   {errors.discountPercentage && (
//                     <p className="text-red">
//                       {errors.discountPercentage.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="sm:col-span-2">
//                 <label
//                   htmlFor="stock"
//                   className="text-gray-900 block text-sm font-medium leading-6"
//                 >
//                   Stock <span className="text-red">*</span>
//                 </label>
//                 <div className="mt-2">
//                   <div className="ring-gray-300 flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
//                     <input
//                       type="number"
//                       {...register("stock", {
//                         required: "stock is required",
//                         min: 0,
//                       })}
//                       id="stock"
//                       className="w-full rounded-lg border-0 border-stroke bg-transparent py-2 pl-6 pr-2 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                     />
//                   </div>
//                   {errors.stock && (
//                     <p className="text-red">{errors.stock.message}</p>
//                   )}
//                 </div>
//               </div>
//               <div className="col-span-full">
//                 <label
//                   htmlFor="model"
//                   className="text-gray-900 block text-sm font-medium leading-6"
//                 >
//                   Model <span className="text-red">*</span>
//                 </label>
//                 <div className="mt-2">
//                   <div className="ring-gray-300 flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
//                     <input
//                       type="string"
//                       {...register("model", {
//                         required: "model is required",
//                         min: 0,
//                       })}
//                       id="model"
//                       className="w-full rounded-lg border-0 border-stroke bg-transparent py-2 pl-6 pr-2 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                     />
//                   </div>
//                   {errors.model && (
//                     <p className="text-red">{errors.model.message}</p>
//                   )}
//                 </div>
//               </div>

//               <div className="sm:col-span-6">
//                 <label
//                   htmlFor="thumbnail"
//                   className="text-gray-900 block text-sm font-medium leading-6"
//                 >
//                   Thumbnail <span className="text-red">*</span>
//                 </label>
//                 <div className="mt-2">
//                   <div className="ring-gray-300 flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
//                     <input
//                       type="text"
//                       {...register("thumbnail", {
//                         required: "thumbnail is required",
//                       })}
//                       id="thumbnail"
//                       className="w-full rounded-lg border-0 border-stroke bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                     />
//                   </div>
//                   {errors.thumbnail && (
//                     <p className="text-red">{errors.thumbnail.message}</p>
//                   )}
//                 </div>
//               </div>
//               {/* =================== */}
//               <div className="sm:col-span-6">
//                 {" "}
//                 <h2 className="mb-3 text-2xl font-semibold">
//                   Upload Product Images
//                 </h2>
//                 <div className="mb-4 ">
//                   <div className="w-full">
//                     <input
//                       className="form-control text-gray-700 border-gray-300 focus:text-gray-700 m-0 mt-8 block w-full rounded border border-solid bg-white bg-clip-padding px-2 py-1.5 text-base font-normal transition ease-in-out focus:border-blue-600 focus:bg-white focus:outline-none"
//                       type="file"
//                       id="formFile"
//                       multiple
//                       onChange={handleProductImageUpload}
//                     />
//                   </div>
//                 </div>

//             </div>
//           </div>
//         </div>

//         <div className="mt-6 flex items-center justify-end gap-x-6">
//           <button
//             onClick={() => router.push("/products")}
//             type="button"
//             className="text-gray-900 text-sm font-semibold leading-6"
//           >
//             Cancel
//           </button>

//           {selectedProduct && !selectedProduct.deleted && (
//             <button
//               onClick={(e) => {
//                 e.preventDefault();
//                 setOpenModal(true);
//               }}
//               className="bg-red-600 hover:bg-red-500 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//             >
//               Delete
//             </button>
//           )}

//           <button
//             type="submit"
//             className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//           >
//             Save
//           </button>
//         </div>
//       </form>
//       {selectedCategory && (
//         <SubcategoryModal
//           title={`Create sub category for ${selectedCategory}`}
//           message=""
//           dangerOption=""
//           saveOption="Save"
//           cancelOption="Cancel"
//           dangerAction={handleDelete}
//           saveAction={handleSave}
//           cancelAction={() => setOpenModal(false)}
//           showModal={openModal}
//           setCreateSubCategory={setCreateSubCategory}
//         ></SubcategoryModal>
//       )}
//     </>
//   );
// }

// export default ProductForm;

