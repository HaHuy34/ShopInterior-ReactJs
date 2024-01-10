import React, { useState, useEffect } from "react";
import Trending from "../component/Trending";
import { ToastContainer, toast } from "react-toastify";
import BackToTop from "../component/BackToTop";
import { useDispatch } from "react-redux";
import { doc, getDoc } from "firebase/firestore/lite";
import { useParams } from "react-router-dom";
import { db } from "../component/firebase/FirebaseConfig";
import "../assetss/style/ProductDetail.css";
import { addToCart } from "../redux/cartSlice";

const Productdetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [zoomPosition, setZoomPosition] = useState({ x: "50%", y: "50%" });
  const [isZoomed, setIsZoomed] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decRef = doc(db, "products", id);
        const userSnapShot = await getDoc(decRef);

        if (userSnapShot.exists()) {
          setProductDetails(userSnapShot.data());
          setSelectedImage(userSnapShot.data().image);
        } else {
          const decRefAllProduct = doc(db, "AllProducts", id);
          const allProductSnapShot = await getDoc(decRefAllProduct);

          if (allProductSnapShot.exists()) {
            setProductDetails(allProductSnapShot.data());
            setSelectedImage(allProductSnapShot.data().image);
          } else {
            console.error("Dữ liệu không tồn tại");
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const increase = () => {
    if (quantity < 10) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
    // const productToAdd = {
    //   // title: productDetails.title,
    //   // price: productDetails.price,
    //   // image: productDetails.image,

    //   id: productDetails.id, // Replace with the actual ID of your product
    //   title: productDetails.title,
    //   price: productDetails.price,
    //   image: productDetails.image,
    //   // Thêm các thuộc tính khác nếu cần thiết
    // };

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

  const handleMouseEnter = (e) => {
    setIsZoomed(true);
    updateZoomPosition(e);
  };

  const handleMouseMove = (e) => {
    updateZoomPosition(e);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const updateZoomPosition = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100 + "%";
    const y = ((e.clientY - rect.top) / rect.height) * 100 + "%";
    setZoomPosition({ x, y });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <>
      <div className="product-detail-main">
        <div className="container">
          <div className="row">
            <div className="mb-md-0 mb-4 col-md-6 col-lg-6">
              <div className="product-image">
                <div
                  className="img-zoom-container"
                  onMouseEnter={handleMouseEnter}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    id="myimage"
                    src={selectedImage || productDetails.imageChild}
                    alt=""
                  />
                  {isZoomed && (
                    <div
                      className="zoomed-image"
                      style={{
                        "--zoom-x": zoomPosition.x,
                        "--zoom-y": zoomPosition.y,
                      }}
                    >
                      <img
                        src={selectedImage || productDetails.imageChild}
                        alt="Zoomed View"
                      />
                    </div>
                  )}
                </div>
                <div className="product-img-bottom">
                  <div
                    className={`muli ${
                      selectedImage === productDetails.image ? "selected" : ""
                    }`}
                    onClick={() => handleImageClick(productDetails.image)}
                  >
                    <img src={productDetails.image} alt="" />
                  </div>
                  <div
                    className={`muli ${
                      selectedImage === productDetails.imageChild01
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      handleImageClick(productDetails.imageChild01)
                    }
                  >
                    <img src={productDetails.imageChild01} alt="" />
                  </div>
                  <div
                    className={`muli ${
                      selectedImage === productDetails.imageChild02
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      handleImageClick(productDetails.imageChild02)
                    }
                  >
                    <img src={productDetails.imageChild02} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6">
              <div className="pr-detail">
                <div className="product-description">
                  <h4 className="prduct-title">{productDetails.title}</h4>
                  <div className="product-price">
                    <div className="pr-pr">
                      <span className="price">
                        {formatCurrency(productDetails.price)}
                      </span>
                      <del>{formatCurrency(productDetails.del)}</del>
                      <div className="sale">
                        <span>
                          Giảm giá{" "}
                          <span>
                            {Math.round(
                              ((productDetails.del - productDetails.price) /
                                productDetails.del) *
                                100
                            )}
                          </span>
                          %
                        </span>
                      </div>
                    </div>
                    <span className="rating-num">
                      <i className="bx bx-show-alt bx-flip-vertical"></i>
                      {productDetails.rating}
                    </span>
                  </div>
                  <div className="pr-decs">
                    <p>{productDetails.description}</p>
                  </div>
                  <div className="product-info">
                    <ul className="info-pr">
                      <li>
                        <i className="fa-regular fa-circle-check"></i>
                        Bảo hành thương hiệu {productDetails.source} 1 năm
                      </li>
                      <li>
                        <i className="fa-solid fa-arrows-rotate"></i>
                        Chính sách hoàn trả trong 30 ngày
                      </li>
                      <li>
                        <i className="fa-solid fa-sack-dollar"></i>
                        Tiền mặt khi giao hàng có sẵn
                      </li>
                    </ul>
                  </div>
                  <div className="add-to-card">
                    <div className="add-product">
                      <button onClick={decrease}>-</button>
                      <button id="quantity">{quantity}</button>
                      <button onClick={increase}>+</button>
                    </div>
                    <button
                      className="custom-btn btn-3"
                      onClick={addToCartHandler}
                    >
                      <span>
                        <i className="fa-solid fa-cart-shopping"></i>Thêm vào
                        giỏ
                      </span>
                    </button>
                    <div className="wish-lish">
                      <i className="fa-regular fa-heart" id="icon"></i>
                    </div>
                  </div>
                  <div className="main-tags">
                    <div className="swith-color">
                      <span className="swith-lable">Mã sản phẩm: </span>
                      <p>{productDetails.code}</p>
                    </div>
                    <div className="swith-color">
                      <span className="swith-lable">Xuất xứ: </span>
                      <p>{productDetails.source}</p>
                    </div>
                    {/* <div className="swith-color">
                      <span className="swith-lable">Tages: </span>
                      <p>{productDetails.tags}</p>
                    </div> */}
                    <div className="share">
                      <span className="swith-lable">Share: </span>
                      <div className="icons-share">
                        <i className="fa-brands fa-facebook-f"></i>
                        <i className="fa-brands fa-twitter"></i>
                        <i className="fa-brands fa-google-plus-g"></i>
                        <i className="fa-brands fa-youtube"></i>
                        <i className="fa-solid fa-camera-retro"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Trending />
      <BackToTop />
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

export default Productdetail;
