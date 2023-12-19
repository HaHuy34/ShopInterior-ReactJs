import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assetss/style/Addmin.css";
import { Offcanvas, Table } from "react-bootstrap";
import useGetApi from "../../src/hook/useGetApi";
// import EditProductAddmin from "";
import axios from "axios";
import EditProductAddmin from "../pages/EditProductAddmin";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Pagination from "react-js-pagination";

const Addmin = () => {
  const [isAsideVisible, setIsAsideVisible] = useState(true);
  const [imageFile, setImageFile] = useState(null); // State để lưu trữ hình ảnh
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
  const [isSubMenuVisiblAccount, setIsSubMenuVisibleAccount] = useState(false);
  const [isShowListProduct, setisShowListProduct] = useState(true);

  let [dataTable, loading] = useGetApi("http://localhost:3000/all_products");
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số mục muốn hiển thị trên mỗi trang
  const [searchTerm, setSearchTerm] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Lấy hình ảnh từ sự kiện tải lên
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const uploadedImage = e.target.result;
        // Lưu URL của hình ảnh vào localStorage
        localStorage.setItem("uploadedImage", uploadedImage);
        setImageFile(uploadedImage); // Lưu trữ hình ảnh trong state
      };
      reader.readAsDataURL(file);
    }
  };

  // Sử dụng useEffect để lấy URL hình ảnh từ localStorage khi trang web được nạp lại
  useEffect(() => {
    const storedImage = localStorage.getItem("uploadedImage");
    if (storedImage) {
      setImageFile(storedImage);
    }
  }, []);

  // Function to toggle the visibility of the second aside element
  const toggleAsideVisibility = () => {
    setIsAsideVisible(!isAsideVisible);
  };

  const handleClose = () => setShow(false);
  const handleEditClick = (item) => {
    setSelectedProduct(item);
    setShow(true); // Show the edit form
  };
  console.log(dataTable);
  if (loading) {
    return <div className="loader"></div>;
  }

  //Format giá
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handleDeleteClick = async (itemId) => {
    try {
      // Make an HTTP DELETE request to delete the item from the API
      const response = await axios.delete(
        `http://localhost:3000/all_products/${itemId}`
      );

      // Handle the API response here
      if (response.status === 200) {
        console.log("Item deleted successfully:", itemId);

        // Clone the current dataTable
        const updatedDataTable = [...dataTable];

        // Find the index of the item to delete
        const itemIndexToDelete = updatedDataTable.findIndex(
          (item) => item.id === itemId
        );

        // Remove the item from the cloned array
        if (itemIndexToDelete !== -1) {
          updatedDataTable.splice(itemIndexToDelete, 1);
          // Update the UI with the modified dataTable
          dataTable = updatedDataTable;
        }
      } else {
        console.error("Failed to delete item:", response);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  function Visibility() {
    // Find the element by its ID
    const element = document.getElementById("drop2");

    // Check if the element exists before accessing its classList
    if (element) {
      element.classList.add("yourClassName");
    } else {
      console.error("Element not found.");
    }
  }

  const savedName = localStorage.getItem("userName");
  const userNameElement = document.querySelector(".userName");
  if (savedName && userNameElement) {
    userNameElement.textContent = savedName;
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Tính toán các giá trị liên quan đến phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataTable.slice(indexOfFirstItem, indexOfLastItem);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const trimmedSearchTerm = searchTerm.trim().toLowerCase();
      const filteredData = dataTable.filter((item) =>
        item.title.toLowerCase().includes(trimmedSearchTerm)
      );
      setFilteredData(filteredData);
      setSearchActive(!!trimmedSearchTerm);
    }
  };

  const renderTableData = () => {
    let itemsToRender = searchActive ? filteredData : dataTable;
    if (sortBy === "1") {
      itemsToRender = itemsToRender.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else if (sortBy === "2") {
      itemsToRender = itemsToRender.sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    }
    console.log(itemsToRender);
    if (searchActive) {
      const itemsPerPage = 5; // Set itemsPerPage to 5 when searching

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
                  Trung Quốc, Mỹ
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
                    {console.log("Quantity:", item.quantity)}
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
                  <i
                    className="bx bxs-pencil"
                    onClick={() => handleEditClick(item)}
                  ></i>
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
                Trung Quốc, Mỹ
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
                {console.log("Quantity:", `item.quantity`)}

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
                <i
                  className="bx bxs-pencil"
                  onClick={() => handleEditClick(item)}
                ></i>
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

  return (
    <>
      <div className="addmin-edit-main-products">
        <div
          className="menu-main-edit"
          style={{
            left: isAsideVisible ? "-100%" : "0%",
          }}
        >
          <aside className="left-sidebar">
            <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
              <div class="layout has-sidebar fixed-sidebar fixed-header">
                <aside id="sidebar" class="sidebar break-point-sm has-bg-image">
                  <Link id="btn-collapse" class="sidebar-collapser">
                    <i
                      class="bx bx-arrow-from-left"
                      onClick={toggleAsideVisibility}
                    ></i>
                  </Link>
                  <div class="sidebar-layout">
                    <div class="sidebar-header">
                      <div class="pro-sidebar-logo">
                        <div>P</div>
                        <h5 style={{ marginBottom: 0 }}>Shopwise</h5>
                      </div>
                    </div>
                    <div class="sidebar-content">
                      <nav class="menu open-current-submenu">
                        <ul>
                          <li
                            class="menu-item sub-menu"
                            onClick={() =>
                              setIsSubMenuVisible(!isSubMenuVisible)
                            }
                          >
                            <Link to="#">
                              <span class="menu-icon">
                                <i class="bx bx-home"></i>
                              </span>
                              <span class="menu-title">Quản trị</span>
                            </Link>
                            {isSubMenuVisible && (
                              <div class="sub-menu-list">
                                <ul>
                                  <li class="menu-item">
                                    <Link to="/statis">
                                      <span class="menu-title">
                                        Thống kê doanh số
                                      </span>
                                    </Link>
                                  </li>
                                  <li
                                    class="menu-item"
                                    onClick={() =>
                                      setisShowListProduct(!isShowListProduct)
                                    }
                                  >
                                    <Link to="#">
                                      <span class="menu-title">
                                        Danh sách sản phẩm
                                      </span>
                                    </Link>
                                  </li>
                                  <li class="menu-item">
                                    <Link to="#">
                                      <span class="menu-title">
                                        Tài khoản người dùng
                                      </span>
                                    </Link>
                                  </li>
                                  <li class="menu-item">
                                    <Link to="#">
                                      <span class="menu-title">
                                        Quản lý hoán đơn
                                      </span>
                                    </Link>
                                  </li>
                                  <li class="menu-item">
                                    <Link to="#">
                                      <span class="menu-title">
                                        Danh sách bài viết
                                      </span>
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </li>
                          <li
                            class="menu-item sub-menu"
                            onClick={() =>
                              setIsSubMenuVisibleAccount(
                                !isSubMenuVisiblAccount
                              )
                            }
                          >
                            <Link to="#">
                              <span class="menu-icon">
                                <i class="bx bx-user"></i>
                              </span>
                              <span class="menu-title">Website</span>
                            </Link>
                            {isSubMenuVisiblAccount && (
                              <div class="sub-menu-list">
                                <ul>
                                  <li class="menu-item">
                                    <Link to="#">
                                      <span class="menu-title">Trang chủ</span>
                                    </Link>
                                  </li>
                                  <li class="menu-item">
                                    <Link to="#">
                                      <span class="menu-title">Liên hệ</span>
                                    </Link>
                                  </li>
                                  <li class="menu-item">
                                    <Link to="#">
                                      <span class="menu-title">Yêu thích</span>
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </li>
                          <li
                            class="menu-item sub-menu"
                            onClick={() =>
                              setIsSubMenuVisibleAccount(
                                !isSubMenuVisiblAccount
                              )
                            }
                          >
                            <Link to="#">
                              <span class="menu-icon">
                                <i class="bx bx-user"></i>
                              </span>
                              <span class="menu-title">Tài khoản</span>
                            </Link>
                            {isSubMenuVisiblAccount && (
                              <div class="sub-menu-list">
                                <ul>
                                  <li class="menu-item">
                                    <Link to="#">
                                      <span class="menu-title">
                                        Thông tin tài khoản
                                      </span>
                                    </Link>
                                  </li>
                                  <li class="menu-item">
                                    <Link to="#">
                                      <span class="menu-title">
                                        Quản lý tài khoản người dùng
                                      </span>
                                    </Link>
                                  </li>
                                  <li class="menu-item">
                                    <Link to="#">
                                      <span class="menu-title">Đăng xuất</span>
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </aside>
                <div id="overlay" class="overlay"></div>
              </div>
            </nav>
          </aside>
        </div>
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
              <header className="app-header">
                <nav className="navbar navbar-expand-lg navbar-light">
                  <ul className="navbar-nav">
                    <li
                      className="nav-item d-block d-xl-block"
                      onClick={toggleAsideVisibility}
                    >
                      <Link
                        className="nav-link sidebartoggler nav-icon-hover"
                        id="headerCollapse"
                        to=""
                      >
                        <i class="bx bx-menu"></i>
                      </Link>
                    </li>
                    <li
                      className="nav-item bsa"
                      style={{
                        marginLeft:
                          // isAsideVisible
                          // ?
                          "0px",
                        // : "240px",
                      }}
                    >
                      <Link className="nav-link nav-icon-hover" to="">
                        <i class="bx bx-bell"></i>
                        <div className="notification bg-primary rounded-circle"></div>
                      </Link>
                    </li>
                  </ul>
                  <div
                    className="navbar-collapse justify-content-end px-0"
                    id="navbarNav"
                  >
                    <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
                      <li className="nav-item dropdown">
                        <div className="name-user-add">
                          <p className="hi-user">Hi!</p>
                          <p className="userName"></p>
                        </div>
                        <Link
                          className="nav-link nav-icon-hover"
                          to=""
                          id="drop2"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          onClick={Visibility}
                        >
                          {imageFile ? (
                            // Hiển thị hình ảnh được tải lên (nếu có)
                            <img
                              src={imageFile}
                              alt=""
                              width="35"
                              height="35"
                              className="rounded-circle"
                            />
                          ) : (
                            // Hiển thị hình ảnh mặc định nếu chưa có hình ảnh
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkL_zpTULJ9oHSTLYX2iaSAeeCxoPUi3hWKQ&usqp=CAU"
                              alt=""
                              width="35"
                              height="35"
                              className="rounded-circle"
                            />
                          )}
                        </Link>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          id="imageUploadInput"
                        />
                      </li>
                    </ul>
                  </div>
                </nav>
              </header>

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
                    <div className="btn-add-product">
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
                        {/* <th
                            className="name-title-table"
                            style={{ width: "100px" }}
                          ></th> */}
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
                      searchActive ? filteredData.length : dataTable.length
                    }
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                </div>
                <Offcanvas show={show} onHide={handleClose}>
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Chỉnh sửa </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <EditProductAddmin selectedProduct={selectedProduct} />
                  </Offcanvas.Body>
                </Offcanvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addmin;
