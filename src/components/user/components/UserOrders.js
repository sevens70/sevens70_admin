import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLoggedInUserOrderAsync,
  selectUserInfo,
  selectUserInfoStatus,
  selectUserOrders,
} from "../userSlice";
import { Grid } from "react-loader-spinner";

export default function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  const status = useSelector(selectUserInfoStatus);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync());
  }, [dispatch]);

  return (
    <div>
      {orders &&
        orders.map((order) => (
          <div key={order.id}>
            <div>
              <div className="mx-auto mt-12 max-w-7xl bg-white px-4 sm:px-6 lg:px-8">
                <div className="border-gray-200 border-t px-4 py-6 sm:px-6">
                  <h1 className="text-gray-900 my-5 text-4xl font-bold tracking-tight">
                    Order # {order.id}
                  </h1>
                  <h3 className="text-red-900 my-5 text-xl font-bold tracking-tight">
                    Order Status : {order.status}
                  </h3>
                  <div className="flow-root">
                    <ul className="divide-gray-200 -my-6 divide-y">
                      {order.items.map((item) => (
                        <li key={item.id} className="flex py-6">
                          <div className="border-gray-200 h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                            <img
                              src={item.product.thumbnail}
                              alt={item.product.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="text-gray-900 flex justify-between text-base font-medium">
                                <h3>
                                  <a href={item.product.id}>
                                    {item.product.title}
                                  </a>
                                </h3>
                                <p className="ml-4">
                                  ৳ {item.product.discountPrice}
                                </p>
                              </div>
                              <p className="text-gray-500 mt-1 text-sm">
                                {item.product.brand}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                <label
                                  htmlFor="quantity"
                                  className="text-gray-900 mr-5 inline text-sm font-medium leading-6"
                                >
                                  Qty :{item.quantity}
                                </label>
                              </div>

                              <div className="flex"></div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-gray-200 border-t px-4 py-6 sm:px-6">
                  <div className="text-gray-900 my-2 flex justify-between text-base font-medium">
                    <p>Subtotal</p>
                    <p>৳ {order.totalAmount}</p>
                  </div>
                  <div className="text-gray-900 my-2 flex justify-between text-base font-medium">
                    <p>Total Items in Cart</p>
                    <p>{order.totalItems} items</p>
                  </div>
                  <p className="text-gray-500 mt-0.5 text-sm">
                    Shipping Address :
                  </p>
                  <div className="border-gray-200 flex justify-between gap-x-6 border-2 border-solid px-5 py-5">
                    <div className="flex gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-gray-900 text-sm font-semibold leading-6">
                          {order.selectedAddress.name}
                        </p>
                        <p className="text-gray-500 mt-1 truncate text-xs leading-5">
                          {order.selectedAddress.street}
                        </p>
                        <p className="text-gray-500 mt-1 truncate text-xs leading-5">
                          {order.selectedAddress.pinCode}
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className="text-gray-900 text-sm leading-6">
                        Phone: {order.selectedAddress.phone}
                      </p>
                      <p className="text-gray-500 text-sm leading-6">
                        {order.selectedAddress.city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      {status === "loading" ? (
        <Grid
          height="80"
          width="80"
          color="rgb(79, 70, 229) "
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : null}
    </div>
  );
}
