import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assetss/style/Addmin.css";
import { Table } from "react-bootstrap";
import EditProductAddmin from "../pages/EditProductAddmin";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Pagination from "react-js-pagination";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore/lite";
import { db } from "../component/firebase/FirebaseConfig";
import WaitLoad from "../component/WaitLoad";
import { ToastContainer, toast } from "react-toastify";

const Addmin = () => {
  const navigator = useNavigate();
  const [users, setUsers] = useState([]);
  // const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Số mục muốn hiển thị trên mỗi trang
  const [searchTerm, setSearchTerm] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Nhận danh sách từ cơ sở dữ liệu
  async function getCities(db) {
    const citiesCol = collection(db, "products");
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setUsers(cityList);
  }

  console.log(users);
  useEffect(() => {
    getCities(db);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getCities(db);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //Format giá
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Xóa sản phẩm
  const handleDeleteClick = async (itemId) => {
    try {
      // Xóa tài liệu từ bộ sưu tập Firestore
      await deleteDoc(doc(db, "products", itemId));
      // Loại bỏ mục đã xóa từ trạng thái local (users)
      setUsers((prevProduct) =>
        prevProduct.filter((user) => user.id !== itemId)
      );
      toast.success("Đã xóa sản phẩm!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Tính toán các giá trị liên quan đến phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const trimmedSearchTerm = searchTerm.trim().toLowerCase();
      const filteredData = users.filter((item) =>
        item.title.toLowerCase().includes(trimmedSearchTerm)
      );
      setFilteredData(filteredData);
      setSearchActive(!!trimmedSearchTerm);
    }
  };

  const renderTableData = () => {
    let itemsToRender = searchActive ? filteredData : users;
    if (sortBy === "1") {
      itemsToRender = itemsToRender.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else if (sortBy === "2") {
      itemsToRender = itemsToRender.sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    }
    console.log("itemsToRender", itemsToRender);
    if (loading) {
      return <WaitLoad />; // You can replace this with a spinner or any loading indicator
    }

    if (searchActive) {
      const itemsPerPage = 6; // Set itemsPerPage to 6 when searching

      const renderItems = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
      return (
        <>
          {renderItems.length > 0 &&
            renderItems.map((item) => (
              <tr className="table-row table-row--chris" key={item.id}>
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="img-text-main"
                      style={{
                        width: "50px",
                        height: "50px",
                      }}
                    >
                      <Link to="#">
                        <span className="symbol-img">
                          <img
                            className="table-row__img"
                            src={item.image}
                            alt=""
                          />
                        </span>
                      </Link>
                    </div>

                    <div
                      className="text-main-pr"
                      style={{ marginLeft: "10px" }}
                    >
                      <Link
                        to="#"
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        {item.title}
                      </Link>
                    </div>
                  </div>
                </td>

                <td
                  data-column="Destination"
                  className="table-row__td"
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {item.source}
                </td>
                <td
                  data-column="Policy"
                  className="table-row__td"
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  <div className="policy">
                    <p className="table-row__policy">
                      {formatCurrency(item.price)}
                    </p>
                    <span
                      className="table-row__small"
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Sale
                    </span>
                  </div>
                </td>

                <td
                  data-column="Status"
                  className="table-row__td"
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  <p class="table-row__status status--green status">
                    {item.quantity}
                    {/* {console.log("Quantity:", item.quantity)} */}
                  </p>
                </td>
                <td
                  data-column="Status"
                  className="table-row__td"
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {item.quantity > 10 ? (
                    <p className="table-row__status status--green status">
                      <div className="badge badge-light-primary">còn hàng</div>
                    </p>
                  ) : (
                    <p className="table-row__status status--red status">
                      <div className="badge badge-light-primary">hết hàng</div>
                    </p>
                  )}
                </td>
                <td
                  className="edit-data-table"
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  <Link to={`/editadmin/${item.id}`}>
                    <i className="bx bxs-pencil"></i>
                  </Link>
                  <i
                    class="bx bxs-trash"
                    onClick={() => handleDeleteClick(item.id)}
                  ></i>
                </td>
              </tr>
            ))}
        </>
      );
    } else {
      return (
        <>
          {currentItems.map((item) => (
            <tr className="table-row table-row--chris" key={item.id}>
              <td>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="img-text-main"
                    style={{
                      width: "50px",
                      height: "50px",
                    }}
                  >
                    <Link to="#">
                      <span className="symbol-img">
                        <img
                          className="table-row__img"
                          src={item.image}
                          alt=""
                        />
                      </span>
                    </Link>
                  </div>

                  <div className="text-main-pr" style={{ marginLeft: "10px" }}>
                    <Link
                      to="#"
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      {item.title}
                    </Link>
                  </div>
                </div>
              </td>

              <td
                data-column="Destination"
                className="table-row__td"
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {item.source}
              </td>
              <td
                data-column="Policy"
                className="table-row__td"
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                <div className="policy">
                  <p className="table-row__policy">
                    {formatCurrency(item.price)}
                  </p>
                  <span
                    className="table-row__small"
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    Sale
                  </span>
                </div>
              </td>

              <td
                data-column="Status"
                className="table-row__td"
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                <p class="table-row__status status--green status">
                  {item.quantity}
                </p>
              </td>
              <td
                data-column="Status"
                className="table-row__td"
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                {/* {console.log("Quantity:", `item.quantity`)} */}

                {item.quantity > 10 ? (
                  <p className="table-row__status status--green status">
                    <div className="badge badge-light-primary">còn hàng</div>
                  </p>
                ) : (
                  <p className="table-row__status status--red status">
                    <div className="badge badge-light-primary end">
                      sắp hết hàng
                    </div>
                  </p>
                )}
              </td>
              <td
                className="edit-data-table"
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                <Link to={`/editadmin/${item.id}`}>
                  <i className="bx bxs-pencil"></i>
                </Link>
                <i
                  class="bx bxs-trash"
                  onClick={() => handleDeleteClick(item.id)}
                ></i>
              </td>
            </tr>
          ))}
        </>
      );
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const AddProductAdmin = () => {
    navigator("/add-product-ddmin");
  };

  return (
    <>
      <div className="addmin-edit-main-products">
        <div className="addmin-edit">
          <div
            className="page-wrapper"
            id="main-wrapper"
            data-layout="vertical"
            data-navbarbg="skin6"
            data-sidebartype="full"
            data-sidebar-position="fixed"
            data-header-position="fixed"
          >
            <div className="body-wrapper">
              <div className="list-main-product">
                <div className="header-liproduct">
                  <div className="cart-title-header">
                    <i class="bx bx-search"></i>
                    <input
                      type="text"
                      placeholder="Tên sản phẩm...."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setSearchActive(!!e.target.value.trim());
                      }}
                      onKeyDown={handleKeyPress}
                    />
                  </div>

                  <div className="cart-filter-header">
                    <div className="filter-header">
                      <Form.Select
                        aria-label="Default select example"
                        style={{ fontSize: "16px", fontWeight: "500" }}
                        onChange={handleSortChange}
                      >
                        <option style={{ fontSize: "16px", fontWeight: "500" }}>
                          Lọc sản phẩm
                        </option>
                        <option
                          value="1"
                          style={{ fontSize: "16px", fontWeight: "500" }}
                        >
                          A - Z (Tên)
                        </option>
                        <option
                          value="2"
                          style={{ fontSize: "16px", fontWeight: "500" }}
                        >
                          Z - A (Tên)
                        </option>
                        <option
                          value="3"
                          style={{ fontSize: "16px", fontWeight: "500" }}
                        >
                          Cao - Thấp (Giá)
                        </option>

                        <option
                          value="4"
                          style={{ fontSize: "16px", fontWeight: "500" }}
                        >
                          Thấp - Cao (Giá)
                        </option>
                      </Form.Select>
                    </div>
                    <div className="btn-add-product" onClick={AddProductAdmin}>
                      <Button
                        variant="primary"
                        style={{ fontSize: "16px", fontWeight: "500" }}
                      >
                        Thêm Sản Phẩm
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="list-pr-mn">
                  <Table className="addmin-edit-table">
                    <thead>
                      <tr>
                        <th className="name-title-table">SẢN PHẨM</th>
                        <th className="name-title-table">NGUỒN GỐC</th>
                        <th className="name-title-table">GIÁ</th>
                        <th className="name-title-table">SỐ LƯỢNG</th>
                        <th className="name-title-table">TRẠNG THÁI</th>
                        <th className="name-title-table" colSpan={1}>
                          HÀNG ĐỘNG
                        </th>
                      </tr>
                    </thead>
                    <tbody>{renderTableData()}</tbody>
                  </Table>
                </div>
                <div className="number-page-main">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={
                      searchActive ? filteredData.length : users.length
                    }
                    pageRangeDisplayed={6}
                    onChange={handlePageChange}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="custom-toast"
      />
    </>
  );
};

export default Addmin;
