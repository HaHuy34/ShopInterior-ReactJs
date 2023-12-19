import { Link, useNavigate } from "react-router-dom";
import "../../src/assetss/style/Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { removeItemFromCart } from "../redux/actions";
import CartNull from "./CartNull";

const Cart = () => {
  const navigator = useNavigate();
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();

  const [quantities, setQuantities] = useState(Array(cartItems.length).fill(1)); // Khởi tạo mảng số lượng với giá trị mặc định 1 cho mỗi mục
  const [totalPrice, setTotalPrice] = useState(0); // State để lưu tổng giá trị của giỏ hàng
  console.log("cartItems:", cartItems);
  console.log("quantities", quantities);

  // Tính tổng giá trị khi có sự thay đổi trong cartItems hoặc quantities
  useEffect(() => {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i].price * quantities[i];
    }
    setTotalPrice(total);
  }, [cartItems, quantities]);

  if (cartItems.length === 0) {
    return <CartNull />;
  }
  // Format lại giá tiền
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Tăng giảm số lượng
  const handleIncrementQuantity = (index) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] += 1;
    setQuantities(updatedQuantities);
  };

  const handleDecrementQuantity = (index) => {
    const updatedQuantities = [...quantities];
    if (updatedQuantities[index] > 1) {
      updatedQuantities[index] -= 1;
      setQuantities(updatedQuantities);
    }
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const handleRemoveFromCart = (index) => {
    if (alert("Bạn muốn xóa sản phẩm ra khỏi giỏ hàng?")) {
      dispatch(removeItemFromCart(index)); // Gọi action để xóa sản phẩm khỏi Redux store (hoặc state)
    } else {
    }
  };

  const handlePaymentClick = () => {
    navigator("/pay", { state: { cartItems, totalPrice, quantities } });
    console.log(cartItems, "ca");
    console.log("Dây là click", quantities);
  };

  return (
    <>
      <div class="container">
        <div class="cart-table-main">
          <div class="container">
            <table class="form-cart">
              <thead>
                <tr>
                  <th class="product-image">Ảnh Sản Phẩm</th>
                  <th class="product-name">Tên</th>
                  <th class="product-rice">Giá</th>
                  <th class="product-quantity">Số Lượng</th>
                  <th class="product-subtotal">Thành Tiền</th>
                  <th class="product-close">Xóa</th>
                </tr>
              </thead>
              <tbody id="table">
                {cartItems.map((product, index) => (
                  <tr className="cart-item" key={index}>
                    <td className="product-imag pr">
                      <div
                        className="img-pr-main"
                        style={{
                          backgroundImage: `url(${product.image})`,
                        }}
                      ></div>
                    </td>
                    <td data-label="Name" className="product-na pr">
                      <Link to="#">{product.title}</Link>
                    </td>
                    <td data-label="Unit Price" className="product-ri pr">
                      <span className="amount">
                        {formatCurrency(product.price)}
                      </span>
                    </td>
                    <td data-label="Quantity" class="product-qatity pr">
                      <div class="quantity">
                        <button
                          class="minus-btn btnpr"
                          onClick={() => handleDecrementQuantity(index)}
                        >
                          -
                        </button>
                        <span class="qtity">{quantities[index]}</span>
                        <button
                          class="plus-btn btnpr"
                          onClick={() => handleIncrementQuantity(index)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td data-label="Into Money" class="product-sub pr">
                      <span class="sub-amu">
                        {formatCurrency(product.price * quantities[index])}
                      </span>
                    </td>
                    <td data-label="Delete" class="product-cl pr">
                      <Link
                        to="#"
                        class="cart-item-actions"
                        onClick={() => handleRemoveFromCart(index)}
                      >
                        <i class="fa-solid fa-trash-can"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div class="total-price">
              <div class="total-title-name">Tổng tiền thanh toán</div>
              <div class="to-pr">{formatCurrency(totalPrice)}</div>
            </div>
            <div class="colum-main-cart">
              <div class="continue-shopping">
                <Link to="/">TIẾP TỤC MUA SẮM</Link>
              </div>
              {/* <div> */}
              <button class="ma-apay" onClick={handlePaymentClick}>
                THANH TOÁN
              </button>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
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
      <ToastContainer />
    </>
  );
};

export default Cart;
