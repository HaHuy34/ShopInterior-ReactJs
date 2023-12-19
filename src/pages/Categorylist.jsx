import React, { useState } from "react";
import useGetApi from "../hook/useGetApi";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
// import { toast } from "react-toastify";
import Slide from "../component/Slide";
import LogoDetail from "../assetss/images/ImagesFigma/detail-imag.svg";
import BackToTop from "../component/BackToTop";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions";

const Categorylist = () => {
  const dispatch = useDispatch(); // Lấy dispatch từ Redux
  const [data, loading] = useGetApi("http://localhost:3000/all_products");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search");
  const [sortOrder, setSortOrder] = useState("asc"); // Khởi tạo thứ tự sắp xếp
  const [currentPage, setCurrentPage] = useState(1);
  const [isSortPriceVisible, setIsSortPriceVisible] = useState(false);

  if (loading) {
    return <div className="loader"></div>;
  }

  const handleTitlePriceClick = () => {
    setIsSortPriceVisible(!isSortPriceVisible);
  };

  const addToCartHandler = (product) => {
    const productToAdd = {
      title: product.title,
      price: product.price,
      image: product.image,
      // Thêm các thuộc tính khác nếu cần thiết
    };
    toast.success("Đã thêm sản phẩm vào giỏ hàng!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    dispatch(addToCart(productToAdd)); // Gửi hành động Redux khi thêm vào giỏ hàng

    console.log("Dữ liệu đã thêm vào cart:", productToAdd);
  };

  // Số sản phẩm trên mỗi trang và số trang hiện tại
  const itemsPerPage = 8; // Số sản phẩm trên mỗi trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //Lọc sản phẩm theo truy vấn tìm kiếm
  const currentItems = data
    .filter((product) =>
      searchQuery
        ? product.title.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    )
    .slice(indexOfFirstItem, indexOfLastItem);
  // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Tính tổng số trang
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  //Chức năng sắp xếp sản phẩm theo giá
  const sortProducts = (products) => {
    return products.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  };

  //Format giá
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <>
      <Slide />
      <div className="container">
        <div className="row products-title">
          <div className="col-md-6 text-center category">
            <h2>Chair</h2>
            <div id="sort-buttons">
              <div className="title-price-name" onClick={handleTitlePriceClick}>
                Sorted by
                <box-icon name="chevron-down" color="#2F3337"></box-icon>
                {isSortPriceVisible && (
                  <div className="sort-price">
                    <button id="sort-high" onClick={toggleSortOrder}>
                      High to Low
                    </button>
                    <button id="sort-low" onClick={toggleSortOrder}>
                      Low to High
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {sortProducts(currentItems).map((product, index) => (
            <div className="col-6 col-md-4 col-lg-3" key={index}>
              <div className="card-item">
                <div
                  className="product-img"
                  style={{ backgroundImage: `url(${product.image})` }}
                >
                  <div className="product-action-box">
                    <div className="pr-dc">
                      <Link to={`${product.id}`} className="detail-product">
                        <img src={LogoDetail} alt="" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="product-info">
                  <h6 className="pro-title">{product.title}</h6>
                  <div className="product-price">
                    <span className="price">
                      {formatCurrency(product.price)}
                    </span>
                    {product.del && <del>{formatCurrency(product.del)}</del>}
                  </div>
                  <div className="rating-wrap">
                    <span className="code-product">Mã: {product.code}</span>
                  </div>
                  <div
                    className="add-to-cart"
                    data-name={product.name}
                    data-price={product.dataPrice}
                  >
                    <Link
                      to="#"
                      className="btn-radius"
                      onClick={() => addToCartHandler(product)}
                    >
                      <i className="fa-solid fa-cart-shopping"></i>
                      <span className="adtoca">Thêm vào giỏ</span>
                    </Link>
                  </div>
                </div>
                {product.del && (
                  <div className="sale-cart-main">
                    {Math.round(
                      ((product.price - product.del) / product.del) * 100
                    )}
                    %
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Hiển thị Pagination */}
        <div className="pagination-container">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
            boundaryCount={1} // Số lượng trang ở đầu và cuối
            siblingCount={1} // Số lượng trang lân cận
            renderItem={(item) => (
              <PaginationItem component={Link} to="#" {...item} />
            )}
          />
        </div>
      </div>
      <BackToTop />
    </>
  );
};

export default Categorylist;
