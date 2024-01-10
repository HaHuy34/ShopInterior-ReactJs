import React from 'react'
import imageCartNull from "../assetss/images/ImagesFigma/wishlist.png";
import { Link } from 'react-router-dom';
import WishListMain from './WishListMain';

const AccountWishlist = () => {
  return (
    <>
      {/* <div className="wish-list-main">
        <div className="container">
          <div className="wish-list-content">
            <img src={imageCartNull} alt="" />
            <h2 className="wish-list-title">Danh sách sản phẩm yêu thích đang trống</h2>
            <div className="wi-li-co">
              <span className="wlc">
                Bạn chưa có sản phẩm nào trong danh sách yêu thích
              </span>
              <span className="lwl">
                Bạn sẽ tìm thấy rất nhiều sản phẩm thú vị khác trên trang "Cửa
                hàng" của chúng tôi.
              </span>
            </div>
            <Link to="/">
              <div className="btn-return-shop">
                <span className="btn-shop">Quay lại cửa hàng</span>
              </div>
            </Link>
          </div>
        </div>
      </div> */}

      <WishListMain/>
    </>
  );
}

export default AccountWishlist