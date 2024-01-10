import Gutters from "../component/Gutters";
import Slide from "../component/Slide";
import Trending from "../component/Trending";
import LogoDetail from "../assetss/images/ImagesFigma/detail-imag.svg";
import { Link } from "react-router-dom";
import "../assetss/style/Loadding.css";
import { ToastContainer, toast } from "react-toastify";
import BackToTop from "../component/BackToTop";
import NetworkConnections from "../component/NetworkConnections";
import { useDispatch } from "react-redux";
import CollectionProduct from "./CollectionProduct";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../component/firebase/FirebaseConfig";
import { addToCart } from "../redux/cartSlice";
import LoadingProduct from "../component/LoadingProduct";
const Home = () => {
  const dispatch = useDispatch(); // Lấy dispatch từ Redux
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

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
    const citiesCol = collection(db, "products");
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

  //Forrmat giá
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <>
      <div className="main-body">
        <Slide />
        <Gutters />
        <div className="row products-title">
          <div class="col-md-6 text-center">
            <h2 class="animation-title" data-aos="fade-up">
              Sản phẩm độc quyền
            </h2>
          </div>
        </div>
        <div className="container">
          {loading ? (
            <div className="row">
              {[1, 2, 3, 4].map((product, index) => (
                <div className="col-6 col-md-4 col-lg-3" key={product.code}>
                  <div className="card-item">
                    <LoadingProduct />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="row">
              {products.map((product, index) => (
                <div className="col-6 col-md-4 col-lg-3" key={product.code}>
                  <div className="card-item">
                    <div
                      className="product-img"
                      style={{ backgroundImage: `url(${product.image})` }}
                    >
                      <div className="product-action-box">
                        <div className="pr-dc">
                          <Link
                            to={`product-detail/${product.id}`}
                            className="detail-product"
                          >
                            <img src={LogoDetail} alt="" />
                          </Link>
                        </div>
                      </div>
                      {/* <span className="rating-num">
                        <i className="bx bx-show-alt bx-flip-vertical"></i>
                        {product.rating}
                      </span> */}
                    </div>
                    <div className="product-info">
                      <h6 className="pro-title">{product.title}</h6>
                      <div className="product-price">
                        <span className="price">
                          {formatCurrency(product.price)}
                        </span>
                        {product.del && (
                          <del>{formatCurrency(product.del)}</del>
                        )}
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
          )}
        </div>
        <CollectionProduct />
        <Trending />
      </div>
      <BackToTop />
      <NetworkConnections />
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

export default Home;
