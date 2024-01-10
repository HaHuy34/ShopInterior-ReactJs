import Slider from "react-slick";
import { Link } from "react-router-dom";
import "../assetss/style/Trending.css";
import LogoDetail from "../assetss/images/ImagesFigma/detail-imag.svg";
import useGetApi from "../hook/useGetApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions";
import { toast } from "react-toastify";

const Trending = () => {
  const dispatch = useDispatch(); // Lấy dispatch từ Redux
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
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

  let [data] = useGetApi(
    // "https://api-shop-interior.vercel.app/trending_items"
    "http://localhost:3000/trending_items"
  );
  console.log(data);
  //Format giá
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  return (
    <>
      {/* <div className="container">
        <div className="row products-title">
          <div className="col-md-6 text-center">
            <h2 className="animation-title" data-aos="fade-up">
              Sản phẩm thịnh hành
            </h2>
          </div>
        </div>
        <Slider {...settings}>
          {data.map((product, index) => (
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
                  <span className="price">{formatCurrency(product.price)}</span>
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
          ))}
        </Slider>
      </div> */}
    </>
  );
};

export default Trending;
