import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assetss/style/Addmin.css";
import "../assetss/style/addmin/MenuAdmin.css";

const MenuAdmin = () => {
  const [isAsideVisible, setIsAsideVisible] = useState(true);
  const [imageFile, setImageFile] = useState(null); // State để lưu trữ hình ảnh
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
  const [isSubMenuVisiblUser, setIsSubMenuVisibleUser] = useState(false);
  const [isSubMenuVisiblAccount, setIsSubMenuVisibleAccount] = useState(false);
  const [isShowListProduct, setisShowListProduct] = useState(true);
  const navigate = useNavigate();

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

  const HomePage = () => {
    navigate("/");
  };

  return (
    <>
      <div className="menu-repo">
        <div className="header-addmin-top">
          <div className="main-add-min">
            <header className="app-header">
              <nav className="navbar navbar-expand-lg navbar-light">
                <ul className="navbar-nav">
                  <li
                    className="nav-item d-block d-xl-block"
                    onClick={toggleAsideVisibility}
                  >
                    <div
                      className="nav-link sidebartoggler nav-icon-hover"
                      id="headerCollapse"
                      // to=""
                    >
                      <i class="bx bx-menu"></i>
                    </div>
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
          </div>
        </div>
        <div className="main-add-min">
          <div
            className="menu-main-edit"
            style={{
              left: isAsideVisible ? "-100%" : "0%",
            }}
          >
            <aside className="left-sidebar">
              <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
                <div class="layout has-sidebar fixed-sidebar fixed-header">
                  <aside
                    id="sidebar"
                    class="sidebar break-point-sm has-bg-image"
                  >
                    <Link id="btn-collapse" class="sidebar-collapser">
                      <i
                        class="bx bx-arrow-from-left"
                        onClick={toggleAsideVisibility}
                      ></i>
                    </Link>
                    <div class="sidebar-layout">
                      <div class="sidebar-header">
                        <div class="pro-sidebar-logo" onClick={HomePage}>
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
                                      <Link to="/addmin">
                                        <span class="menu-title">
                                          Danh sách sản phẩm
                                        </span>
                                      </Link>
                                    </li>
                                    {/* <li class="menu-item">
                                      <Link to="#">
                                        <span class="menu-title">
                                          Tài khoản người dùng
                                        </span>
                                      </Link>
                                    </li> */}
                                    <li class="menu-item">
                                      <Link to="admin-edit-use">
                                        <span class="menu-title">
                                          Quản lý người dùng
                                        </span>
                                      </Link>
                                    </li>
                                    <li class="menu-item">
                                      <Link to="/CustomerManagement">
                                        <span class="menu-title">
                                          Quản lý hóa đơn
                                        </span>
                                      </Link>
                                    </li>
                                    <li class="menu-item">
                                      <Link to="/admin-list-blog">
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
                                setIsSubMenuVisibleUser(!isSubMenuVisiblUser)
                              }
                            >
                              <Link to="#">
                                <span class="menu-icon">
                                  <i class="bx bx-user"></i>
                                </span>
                                <span class="menu-title">Website</span>
                              </Link>
                              {isSubMenuVisiblUser && (
                                <div class="sub-menu-list">
                                  <ul>
                                    <li class="menu-item">
                                      <Link to="/">
                                        <span class="menu-title">
                                          Trang chủ
                                        </span>
                                      </Link>
                                    </li>
                                    <li class="menu-item">
                                      <Link to="/contactus">
                                        <span class="menu-title">Liên hệ</span>
                                      </Link>
                                    </li>
                                    <li class="menu-item">
                                      <Link to="#">
                                        <span class="menu-title">
                                          Yêu thích
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
                                <span class="menu-title">Tài khoản</span>
                              </Link>
                              {isSubMenuVisiblAccount && (
                                <div class="sub-menu-list">
                                  <ul>
                                    <li class="menu-item">
                                      <Link to="info-account">
                                        <span class="menu-title">
                                          Thông tin tài khoản
                                        </span>
                                      </Link>
                                    </li>

                                    <li class="menu-item">
                                      <Link to="/signin">
                                        <span class="menu-title">
                                          Đăng xuất
                                        </span>
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
        </div>
      </div>
    </>
  );
};

export default MenuAdmin;
