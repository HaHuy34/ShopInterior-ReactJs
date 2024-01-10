import { Link } from "react-router-dom";
import "../assetss/style/WishList.css";
import BgImage01 from "../assetss/images/ImagesFigma/furniture_img3.jpg";
import BgImage02 from "../assetss/images/ImagesFigma/furniture_img5.jpg";
import BgImage03 from "../assetss/images/ImagesFigma/furniture_img4.jpg";
import iconDelete from "../assetss/images/ImagesFigma/close_wissh.svg";
import LogoDetail from "../assetss/images/ImagesFigma/detail-imag.svg";

const WishListMain = () => {
  const removeWishList = () => {
    alert("01")
  }
  return (
    <>
      <div className="container" style={{ marginTop: "120px" }}>
        {/* {loading ? (
          <div className="row">
            {[1, 2, 3, 4].map((product, index) => (
              <div className="col-6 col-md-4 col-lg-3" key={product.code}>
                <div className="card-item">
                  <LoadingProduct />
                </div>
              </div>
            ))}
          </div>
        ) : ( */}
        <div className="row">
          {/* {products.map((product, index) => ( */}
          <div
            className="col-6 col-md-4 col-lg-3"
            //  key={product.code}
          >
            <div className="card-item">
              <div
                className="product-img"
                style={{
                  backgroundImage: `url(https://shop-interior-api.vercel.app/assets/images/image15.jpg)`,
                }}
              >
                <i class="bx bxs-heart" onClick={removeWishList}></i>
                <div className="product-action-box">
                  <div className="pr-dc">
                    <Link
                      // to={`product-detail/${product.id}`}
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
                <h6 className="pro-title">
                  Ghế thư giãn
                  {/* {product.title} */}
                </h6>
                <div className="product-price">
                  <span className="price">
                    {/* {formatCurrency(product.price)} */}
                    2000000
                  </span>
                  {/* {product.del &&  */}
                  <del>
                    3000000
                    {/* {formatCurrency(product.del)} */}
                  </del>
                  {/* } */}
                </div>
                <div className="rating-wrap">
                  <span className="code-product">Mã: 234345</span>
                </div>
                <div
                  className="add-to-cart"
                  // data-name={product.name}
                  // data-price={product.dataPrice}
                  // onClick={() => addToCartHandler(product)}
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
              {/* {product.del && (
                    <div className="sale-cart-main">
                      {Math.round(
                        ((product.del - product.price) / product.del) * 100
                      )}
                      %
                    </div>
                  )} */}
            </div>
          </div>
          {/* ))} */}
        </div>
        {/* )} */}
      </div>
    </>
  );
};

export default WishListMain;
