import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Order = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      name: "001",
      date: "2023-12-04",
      status: "Đang xử lý",
      total: "100.000 vnđ",
    },
    {
      id: 2,
      name: "002",
      date: "2023-12-03",
      status: "Đã giao",
      total: "150.000 vnđ",
    },

    {
      id: 3,
      name: "03",
      date: "2023-12-06",
      status: "Đã giao",
      total: "200.000 vnđ",
    },
    
    {
      id: 4,
      name: "004",
      date: "2023-12-05",
      status: "Đã giao",
      total: "450.000 vnđ",
    },
  ]);
  console.log(setOrders);
  return (
    <>
      {/* <div className="container">
        <table className="table-checkOrder">
          <thead>
            <tr>
              <th>Đặt hàng</th>
              <th>Ngày</th>
              <th>Trạng thái</th>
              <th>Tổng cộng</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className={index % 2 === 0 ? "even-row" : "odd-row"}
              >
                <td>#{order.name}</td>
                <td>{order.date}</td>
                <td>{order.status}</td>
                <td>{order.total}</td>
                <td>
                  <Link to="#">Xem</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </>
  );
};

export default Order;
