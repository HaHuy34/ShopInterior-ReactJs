import Gutters from "../component/Gutters";
import Slide from "../component/Slide";
import Trending from "../component/Trending";
import LogoDetail from "../assetss/images/ImagesFigma/detail-imag.svg";
import { Link } from "react-router-dom";
import useGetApi from "../hook/useGetApi";
import "../assetss/style/Loadding.css";
import { ToastContainer, toast } from "react-toastify";
import BackToTop from "../component/BackToTop";
import NetworkConnections from "../component/NetworkConnections";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions";
import CollectionProduct from "./CollectionProduct";

const Home = () => {
  const dispatch = useDispatch(); // Lấy dispatch từ Redux
  let [data, loading] = useGetApi(
    // "https://api-shop-interior.vercel.app/products"
    "http://localhost:3000/products"
  );

  console.log(data);
  if (loading) {
    return <div className="loader"></div>;
  }
  const addToCartHandler = (product) => {
    const productToAdd = {
      title: product.title,
      price: product.price,
      image: product.image,
      code: product.code,
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
          {data && (
            <div className="row">
              {data.map((product, index) => (
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
                      <span className="rating-num">
                        <i className="bx bx-show-alt bx-flip-vertical"></i>
                        {product.rating}
                      </span>
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
                      >
                        <Link
                          to="#"
                          className="btn-radius"
                          // onClick={addToCartHandler}
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
