import { Link } from "react-router-dom";
import "../assetss/style/WishList.css";
import BgImage01 from "../assetss/images/ImagesFigma/furniture_img3.jpg";
import BgImage02 from "../assetss/images/ImagesFigma/furniture_img5.jpg";
import BgImage03 from "../assetss/images/ImagesFigma/furniture_img4.jpg";
import iconDelete from "../assetss/images/ImagesFigma/close_wissh.svg";

const WishListMain = () => {
  return (
    <>
      <div className="cart-table-main">
        <div className="container">
          <table className="form-cart">
            <thead>
              <tr>
                <th className="product-image"></th>
                <th className="product-name"></th>
                <th className="product-rice"></th>
                <th className="product-quantity"></th>
                <th className="product-subtotal"></th>
                <th className="product-close"></th>
              </tr>
            </thead>
            <tbody id="table">
              <tr className="cart-item">
                <td className="product-imag pr">
                  <div
                    className="img-pr-main"
                    style={{ backgroundImage: `url(${BgImage01})` }}
                  ></div>
                </td>
                <td data-label="Name" className="product-na pr">
                  <Link to="./product_detail.html">
                    Internet Tend To Repeat
                  </Link>
                </td>
                <td data-label="Unit Price" className="product-ri pr">
                  <span className="amount">$80.00</span>
                </td>
                <td data-label="Quantity" className="product-qatity pr">
                  <span className="status-product">IN STOCK</span>
                </td>
                <td data-label="Into Money" className="product-sub pr">
                  <div
                    className="add-to-cart-wishlist"
                    data-name="Product 1"
                    data-price="10.00"
                  >
                    Thêm vào giỏ
                  </div>
                </td>
                <td data-label="Delete" className="product-cl pr">
                  <Link to="#" className="cart-item-actions">
                    <img src={iconDelete} alt="" />
                  </Link>
                </td>
              </tr>
              <tr className="cart-item">
                <td className="product-imag pr">
                  <div
                    className="img-pr-main"
                    style={{ backgroundImage: `url(${BgImage02})` }}
                  ></div>
                </td>
                <td data-label="Name" className="product-na pr">
                  <Link to="./product_detail.html">
                    Many Desktop Publishing
                  </Link>
                </td>
                <td data-label="Unit Price" className="product-ri pr">
                  <span className="amount">$45.00</span>
                </td>
                <td data-label="Quantity" className="product-qatity pr">
                  <span className="status-product">IN STOCK</span>
                </td>
                <td data-label="Into Money" className="product-sub pr">
                  <div
                    className="add-to-cart-wishlist"
                    data-name="Product 2"
                    data-price="20.00"
                  >
                    Thêm vào giỏ
                  </div>
                </td>
                <td data-label="Delete" className="product-cl pr">
                  <Link to="#" className="cart-item-actions">
                    <img src={iconDelete} alt="" />
                  </Link>
                </td>
              </tr>
              <tr className="cart-item">
                <td className="product-imag pr">
                  <div
                    className="img-pr-main"
                    style={{ backgroundImage: `url(${BgImage03})` }}
                  ></div>
                </td>
                <td data-label="Name" className="product-na pr">
                  <Link to="./product_detail.html">Itaque Earum Rerum</Link>
                </td>
                <td data-label="Unit Price" className="product-ri pr">
                  <span className="amount">$60.00</span>
                </td>
                <td data-label="Quantity" className="product-qatity pr">
                  <span className="status-product">IN STOCK</span>
                </td>
                <td data-label="Into Money" className="product-sub pr">
                  <div
                    className="add-to-cart-wishlist"
                    data-name="Product 3"
                    data-price="30.00"
                  >
                    Thêm vào giỏ
                  </div>
                </td>
                <td data-label="Delete" className="product-cl pr">
                  <Link to="#" className="cart-item-actions">
                    <img src={iconDelete} alt="" />
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="continue-shopping">
            <div className="ctn-shop">
              <Link to="/">CONTINUE SHOPPING</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishListMain;
