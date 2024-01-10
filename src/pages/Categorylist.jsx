import React, { useEffect, useState } from "react";
import useGetApi from "../hook/useGetApi";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";  
import Slide from "../component/Slide";
import LogoDetail from "../assetss/images/ImagesFigma/detail-imag.svg";
import BackToTop from "../component/BackToTop";
import { useDispatch } from "react-redux";
import LoadingProduct from "../component/LoadingProduct";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../component/firebase/FirebaseConfig";
import { addToCart } from "../redux/cartSlice";

const Categorylist = () => {
  const dispatch = useDispatch(); // Lấy dispatch từ Redux
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search");
  const [sortOrder, setSortOrder] = useState("asc"); // Khởi tạo thứ tự sắp xếp
  const [currentPage, setCurrentPage] = useState(1);
  const [isSortPriceVisible, setIsSortPriceVisible] = useState(false);

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

  // Nhận danh sách từ cơ sở dữ liệu của bạn
  async function getCities(db) {
    const citiesCol = collection(db, "AllProducts");
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log("cityList", cityList);
    setProducts(cityList);
  }
  useEffect(() => {
    getCities(db);
  }, []);

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
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
  };

  const handleTitlePriceClick = () => {
    setIsSortPriceVisible(!isSortPriceVisible);
  };

  // Số sản phẩm trên mỗi trang và số trang hiện tại
  const itemsPerPage = 8; // Số sản phẩm trên mỗi trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //Lọc sản phẩm theo truy vấn tìm kiếm
  const currentItems = products
    .filter((product) =>
      searchQuery
        ? product.title.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    )
    .slice(indexOfFirstItem, indexOfLastItem);
  // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Tính tổng số trang
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  //  const toggleSortOrder = (order) => {
  //    setSortOrder(order);
  //  };
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
      {/* <Slide /> */}
      <div className="container"style={{marginTop:"150px"}}>
        <div className="row products-title">
          <div className="col-md-6 text-center category">
            <h2>Chair</h2>
            <div id="sort-buttons">
              <div className="title-price-name" onClick={handleTitlePriceClick}>
                Sorted by
                <box-icon name="chevron-down" color="#2F3337"></box-icon>
                {isSortPriceVisible && (
                  <div className="sort-price">
                    <button
                      id="sort-high"
                      onClick={() => toggleSortOrder("desc")} // Sắp xếp từ cao đến thấp
                    >
                      High to Low
                    </button>
                    <button
                      id="sort-low"
                      onClick={() => toggleSortOrder("asc")} // Sắp xếp từ thấp đến cao
                    >
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
                      {product && (
                        <Link
                          to={`/categorylist/${product.id}`}
                          className="detail-product"
                        >
                          <img src={LogoDetail} alt="" />
                        </Link>
                      )}
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
                    onClick={() => addToCartHandler(product)}
                  >
                    <Link
                      to="#"
                      className="btn-radius"
                      // onClick={addToCartHandler}
                    >
                      <i className="fa-solid fa-cart-shopping"></i>
                      <span className="adtoca">Thêm vào giỏ</span>
                    </Link>
                  </div>
                </div>
                {product.del && (
                  <div className="sale-cart-main">
                    {Math.round(
                      ((product.del - product.price) / product.del) * 100
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
