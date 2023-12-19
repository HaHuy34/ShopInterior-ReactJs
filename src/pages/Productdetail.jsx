import React from "react";
// import Slide from "../component/Slide";
// import Gutters from "../component/Gutters";
import "../assetss/style/ProductDetail.css";
import { useParams } from "react-router-dom";
import useGetApi from "../hook/useGetApi";
import { useState } from "react";
import { useEffect } from "react";
import Trending from "../component/Trending";
import { ToastContainer, toast } from "react-toastify";
import BackToTop from "../component/BackToTop";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions";

const Productdetail = () => {
  const dispatch = useDispatch(); // Lấy dispatch từ Redux

  const [quantity, setQuantity] = useState(1);
  // Zoom ảnh
  const [zoomPosition, setZoomPosition] = useState({ x: "50%", y: "50%" });
  const [isZoomed, setIsZoomed] = useState(false);

  const { id } = useParams();
  const [dataProduct] = useGetApi(
    // `https://api-shop-interior-git-main-hahuy34.vercel.app/products/${id}`
    `http://localhost:3000/products/${id}`
  );

  const [dataTrending] = useGetApi(
    // `https://api-shop-interior-git-main-hahuy34.vercel.app/products/${id}`
    `http://localhost:3000/trending_items/${id}`
  );

  const [dataAllProduct] = useGetApi(
    // `https://api-shop-interior-git-main-hahuy34.vercel.app/products/${id}`
    `http://localhost:3000/all_products/${id}`
  );

  const [selectImage, setSelectImage] = useState("");

  //Product
  useEffect(() => {
    // Đặt giá trị ban đầu cho selectImage sau khi lấy dữ liệu
    if (dataProduct && dataProduct.image) {
      setSelectImage(dataProduct.image);
    }
  }, [dataProduct]);

  //Trending_Item
  useEffect(() => {
    // Đặt giá trị ban đầu cho selectImage sau khi lấy dữ liệu
    if (dataTrending && dataTrending.image) {
      setSelectImage(dataTrending.image);
    }
  }, [dataTrending]);

  useEffect(() => {
    // Đặt giá trị ban đầu cho selectImage sau khi lấy dữ liệu
    if (dataAllProduct && dataAllProduct.image) {
      setSelectImage(dataAllProduct.image);
    }
  }, [dataAllProduct]);

  //ImageBackGround
  const handleImageClick = (image) => {
    setSelectImage(image);
  };

  // Count + -
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

  //Add to card
  const addToCartHandler = (product) => {
    const productToAdd = {
      title: product.title,
      price: product.price,
      image: product.image,
      // Thêm các thuộc tính khác nếu cần thiết
    };
    dispatch(addToCart(productToAdd)); // Gửi hành động Redux khi thêm vào giỏ hàng

    console.log("Dữ liệu đã thêm vào cart:", productToAdd);
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

  // Zoom ảnh
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
      {/* <Gutters /> */}
      {dataProduct && dataProduct.title && (
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
                    <img id="myimage" src={selectImage} alt="" />
                    {isZoomed && (
                      <div
                        className="zoomed-image"
                        style={{
                          "--zoom-x": zoomPosition.x,
                          "--zoom-y": zoomPosition.y,
                        }}
                      >
                        <img src={selectImage} alt="Zoomed View" />
                      </div>
                    )}
                  </div>
                  <div className="product-img-bottom">
                    <div
                      className={`muli ${
                        selectImage === dataProduct.imageChild?.imageChild01
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleImageClick(dataProduct.imageChild?.imageChild01)
                      }
                    >
                      <img src={dataProduct.imageChild?.imageChild01} alt="" />
                    </div>
                    <div
                      className={`muli ${
                        selectImage === dataProduct.imageChild?.imageChild02
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleImageClick(dataProduct.imageChild?.imageChild02)
                      }
                    >
                      <img src={dataProduct.imageChild?.imageChild02} alt="" />
                    </div>
                    <div
                      className={`muli ${
                        selectImage === dataProduct.imageChild?.imageChild03
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleImageClick(dataProduct.imageChild?.imageChild03)
                      }
                    >
                      <img src={dataProduct.imageChild?.imageChild03} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-6">
                <div className="pr-detail">
                  <div className="product-description">
                    <h4 className="prduct-title">{dataProduct.title}</h4>
                    <div className="product-price">
                      <div className="pr-pr">
                        <span className="price">
                          {formatCurrency(dataProduct.price)}
                        </span>
                        <del>{formatCurrency(dataProduct?.del)}</del>
                        <div className="sale">
                          <span>
                            Giảm giá
                            {Math.round(
                              (dataProduct.price / dataProduct.del) * 100
                            )}
                            %
                          </span>
                        </div>
                      </div>
                      <span className="rating-num">
                        <i className="bx bx-show-alt bx-flip-vertical"></i>
                        {dataProduct?.rating}
                      </span>
                    </div>
                    <div className="pr-decs">
                      <p>{dataProduct.description}</p>
                    </div>
                    <div className="product-info">
                      <ul className="info-pr">
                        <li>
                          <i className="fa-regular fa-circle-check"></i>Bảo hành
                          thương hiệu AL Jazeera 1 năm
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
                        onClick={() => addToCartHandler(dataProduct)}
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
                        <span className="swith-lable">Sku: </span>
                        <p>BE45VGRT</p>
                      </div>
                      <div className="swith-color">
                        <span className="swith-lable">Material: </span>
                        <p>Gỗ, Da, vải </p>
                      </div>
                      <div className="swith-color">
                        <span className="swith-lable">Tages: </span>
                        <p>Vải, In</p>
                      </div>
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
      )}
      {dataTrending && dataTrending.title && (
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
                    <img id="myimage" src={selectImage} alt="" />
                    {isZoomed && (
                      <div
                        className="zoomed-image"
                        style={{
                          "--zoom-x": zoomPosition.x,
                          "--zoom-y": zoomPosition.y,
                        }}
                      >
                        <img src={selectImage} alt="Zoomed View" />
                      </div>
                    )}
                  </div>
                  <div className="product-img-bottom">
                    <div
                      className={`muli ${
                        selectImage === dataTrending.imageChild?.imageChild01
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleImageClick(dataTrending.imageChild?.imageChild01)
                      }
                    >
                      <img src={dataTrending.imageChild?.imageChild01} alt="" />
                    </div>
                    <div
                      className={`muli ${
                        selectImage === dataTrending.imageChild?.imageChild02
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleImageClick(dataTrending.imageChild?.imageChild02)
                      }
                    >
                      <img src={dataTrending.imageChild?.imageChild02} alt="" />
                    </div>
                    <div
                      className={`muli ${
                        selectImage === dataTrending.imageChild?.imageChild03
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleImageClick(dataTrending.imageChild?.imageChild03)
                      }
                    >
                      <img src={dataTrending.imageChild?.imageChild03} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-6">
                <div className="pr-detail">
                  <div className="product-description">
                    <h4 className="prduct-title">{dataTrending.title}</h4>
                    <div className="product-price">
                      <div className="pr-pr">
                        <span className="price">
                          {formatCurrency(dataTrending.price)}
                        </span>
                        <del>{formatCurrency(dataTrending?.del)}</del>
                        <div className="sale">
                          <span>
                            -
                            {Math.round(
                              (dataTrending.price / dataTrending.del) * 100
                            )}
                            %
                          </span>
                        </div>
                      </div>
                      <span className="rating-num">
                        <i className="bx bx-show-alt bx-flip-vertical"></i>
                        {dataTrending?.rating}
                      </span>
                    </div>
                    <div className="pr-decs">
                      <p>{dataTrending.description}</p>
                    </div>
                    <div className="product-info">
                      <ul className="info-pr">
                        <li>
                          <i className="fa-regular fa-circle-check"></i>Bảo hành
                          thương hiệu AL Jazeera 1 năm
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
                        onClick={() => addToCartHandler(dataProduct)}
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
                        <span className="swith-lable">Sku: </span>
                        <p>BE45VGRT</p>
                      </div>
                      <div className="swith-color">
                        <span className="swith-lable">Material: </span>
                        <p>Gỗ, Da, vải </p>
                      </div>
                      <div className="swith-color">
                        <span className="swith-lable">Tages: </span>
                        <p>Vải, In</p>
                      </div>
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
      )}
      {dataAllProduct && dataAllProduct.title && (
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
                    <img id="myimage" src={selectImage} alt="" />
                    {isZoomed && (
                      <div
                        className="zoomed-image"
                        style={{
                          "--zoom-x": zoomPosition.x,
                          "--zoom-y": zoomPosition.y,
                        }}
                      >
                        <img src={selectImage} alt="Zoomed View" />
                      </div>
                    )}
                  </div>
                  <div className="product-img-bottom">
                    <div
                      className={`muli ${
                        selectImage === dataAllProduct.imageChild?.imageChild01
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleImageClick(
                          dataAllProduct.imageChild?.imageChild01
                        )
                      }
                    >
                      <img
                        src={dataAllProduct.imageChild?.imageChild01}
                        alt=""
                      />
                    </div>
                    <div
                      className={`muli ${
                        selectImage === dataAllProduct.imageChild?.imageChild02
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleImageClick(
                          dataAllProduct.imageChild?.imageChild02
                        )
                      }
                    >
                      <img
                        src={dataAllProduct.imageChild?.imageChild02}
                        alt=""
                      />
                    </div>
                    <div
                      className={`muli ${
                        selectImage === dataAllProduct.imageChild?.imageChild03
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleImageClick(
                          dataAllProduct.imageChild?.imageChild03
                        )
                      }
                    >
                      <img
                        src={dataAllProduct.imageChild?.imageChild03}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-6">
                <div className="pr-detail">
                  <div className="product-description">
                    <h4 className="prduct-title">{dataAllProduct.title}</h4>
                    <div className="product-price">
                      <div className="pr-pr">
                        <span className="price">
                          {formatCurrency(dataAllProduct.price)}
                        </span>
                        <del>{formatCurrency(dataAllProduct?.del)}</del>
                        <div className="sale">
                          <span>
                            -
                            {Math.round(
                              (dataAllProduct.price / dataAllProduct.del) * 100
                            )}
                            %
                          </span>
                        </div>
                      </div>
                      <span className="rating-num">
                        <i className="bx bx-show-alt bx-flip-vertical"></i>
                        {dataAllProduct?.rating}
                      </span>
                    </div>
                    <div className="pr-decs">
                      <p>{dataAllProduct.description}</p>
                    </div>
                    <div className="product-info">
                      <ul className="info-pr">
                        <li>
                          <i className="fa-regular fa-circle-check"></i>Bảo hành
                          thương hiệu AL Jazeera 1 năm
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
                        onClick={() => addToCartHandler(dataProduct)}
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
                        <span className="swith-lable">Sku: </span>
                        <p>BE45VGRT</p>
                      </div>
                      <div className="swith-color">
                        <span className="swith-lable">Material: </span>
                        <p>Gỗ, Da, vải </p>
                      </div>
                      <div className="swith-color">
                        <span className="swith-lable">Tages: </span>
                        <p>Vải, In</p>
                      </div>
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
      )}
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
