"use client";
import { useEffect, useState } from "react";
// import { ITEMS_PER_PAGE } from "../../../app/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectStatus,
  selectTotalOrders,
  updateOrderAsync,
} from "../../components/orders/orderSlice";
import {
  PencilIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import Pagination from "../../components/common/Pagination";
import { ITEMS_PER_PAGE } from "../common/constants";
import Loader from "../common/Loader";

function OrdersPage() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const ordersStatus = useSelector(selectStatus);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };
  const handleShow = () => {
    console.log("handleShow");
  };

  const handleOrderStatus = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const handleOrderPaymentStatus = (e, order) => {
    const updatedOrder = { ...order, paymentStatus: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    console.log({ sort });
    setSort(sort);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "received":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };
  // useEffect(() => {
  //   const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
  //   dispatch(fetchAllOrdersAsync({ sort, pagination }));
  // }, []);
  // console.log("ordersStatus 123", ordersStatus);
  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);
  // ordersStatus;
  if (ordersStatus === "loading") {
    return <Loader />;
  }
  return (
    <div className="overflow-x-auto">
      <div className="bg-gray-100 font-sans flex items-center justify-center overflow-hidden">
        <div className="w-full">
          <div className="my-0 rounded bg-white shadow-md">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 text-xs uppercase leading-normal">
                  {/* <th
                    className="maxHeight-35 cursor-pointer px-0 py-3 text-left"
                    onClick={(e) =>
                      handleSort({
                        sort: "id",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Order#{" "}
                    {sort._sort === "id" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="inline h-4 w-4"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="inline h-4 w-4"></ArrowDownIcon>
                      ))}
                  </th> */}
                  <th className="py-3 pl-3 text-left">Items</th>
                  <th
                    className="cursor-pointer px-0 py-3 text-left"
                    onClick={(e) =>
                      handleSort({
                        sort: "totalAmount",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Total Amount{" "}
                    {sort._sort === "totalAmount" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="inline h-4 w-4"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="inline h-4 w-4"></ArrowDownIcon>
                      ))}
                  </th>
                  <th className="px-0 py-3 text-center">Shipping Address</th>
                  <th className="px-0 py-3 text-center">Order Status</th>
                  <th className="px-0 py-3 text-center">Payment Method</th>
                  <th className="px-0 py-3 text-center">Payment Status</th>
                  <th
                    className="cursor-pointer px-0 py-3 text-left"
                    onClick={(e) =>
                      handleSort({
                        sort: "createdAt",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Order Time{" "}
                    {sort._sort === "createdAt" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="inline h-4 w-4"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="inline h-4 w-4"></ArrowDownIcon>
                      ))}
                  </th>
                  <th
                    className="cursor-pointer px-0 py-3 text-left"
                    onClick={(e) =>
                      handleSort({
                        sort: "updatedAt",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Last Updated{" "}
                    {sort._sort === "updatedAt" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="inline h-4 w-4"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="inline h-4 w-4"></ArrowDownIcon>
                      ))}
                  </th>
                  <th className="py-3 pr-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-gray-200 hover:bg-gray-100 border-b"
                  >
                    {/* <td className="whitespace-nowrap px-0 py-3 text-left">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span className="font-medium">{order.id}</span>
                      </div>
                    </td> */}
                    <td className="py-3 pl-3 text-left">
                      {order.items.map((item, index) => (
                        <div key={index} className="mb-2 flex items-center">
                          <div className="mr-2">
                            <img
                              className="h-[50px] w-[50px] rounded-full"
                              src={item.product.thumbnail}
                              alt={item.product.title}
                            />
                          </div>
                          <div>
                            {" "}
                            <p className="whitespace-nowrap">
                              {item.product.title}
                            </p>
                            <p className="whitespace-nowrap">
                              Qty: {item.quantity} - $
                              {item.product.discountPrice}
                            </p>
                          </div>
                        </div>
                      ))}
                      <p className="mt-3 text-center font-medium">
                        Id: {order.id}
                      </p>
                    </td>
                    <td className="py-3 pr-3 text-center">
                      <div className="flex items-center justify-center">
                        ${order.totalAmount}
                      </div>
                    </td>
                    <td className="px-2 py-3 text-center">
                      <div className="">
                        <div>
                          <strong>{order.selectedAddress.name}</strong>,
                        </div>
                        <div>{order.selectedAddress.street},</div>
                        <div>{order.selectedAddress.city}, </div>
                        {/* <div>{order.selectedAddress.state}, </div> */}
                        <div>{order.selectedAddress.pinCode}, </div>
                        <div>{order.selectedAddress.phone}, </div>
                      </div>
                    </td>
                    <td className="px-0 py-3 text-center">
                      {order.id === editableOrderId ? (
                        <select onChange={(e) => handleOrderStatus(e, order)}>
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.status,
                          )} rounded-full px-3 py-1 text-xs`}
                        >
                          {order.status}
                        </span>
                      )}
                    </td>

                    <td className="px-0 py-3 text-center">
                      <div className="flex items-center justify-center">
                        {order.paymentMethod}
                      </div>
                    </td>

                    <td className="px-0 py-3 text-center">
                      {order.id === editableOrderId ? (
                        <select
                          onChange={(e) => handleOrderPaymentStatus(e, order)}
                        >
                          <option value="pending">Pending</option>
                          <option value="received">Received</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.paymentStatus,
                          )} rounded-full px-3 py-1 text-xs`}
                        >
                          {order.paymentStatus}
                        </span>
                      )}
                    </td>

                    <td className="px-0 py-3 text-center">
                      <div className="flex items-center justify-center">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleString()
                          : null}
                      </div>
                    </td>

                    <td className="px-0 py-3 text-center">
                      <div className="flex items-center justify-center">
                        {order.updatedAt
                          ? new Date(order.updatedAt).toLocaleString()
                          : null}
                      </div>
                    </td>

                    <td className="px-0 py-3 text-center">
                      <div className="item-center flex justify-center">
                        {/* <div className="hover:scale-120 mr-4 w-6 transform hover:text-purple-500">
                          <EyeIcon
                            className="h-8 w-8"
                            onClick={(e) => handleShow(order)}
                          ></EyeIcon>
                        </div> */}
                        <div className="hover:scale-120 mr-2 w-6 transform hover:text-purple-500">
                          <PencilIcon
                            className="h-5 w-5"
                            onClick={(e) => handleEdit(order)}
                          ></PencilIcon>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        totalItems={totalOrders}
      ></Pagination>
    </div>
  );
}

export default OrdersPage;
