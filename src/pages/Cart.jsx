import { Link, useNavigate } from "react-router-dom";
import "../../src/assetss/style/Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import CartNull from "./CartNull";
import {
  addToCart,
  decreaseQuantity,
  removeItem,
  selectCartItems,
  selectCartTotalItems,
  selectCartTotalPrice,
  updateQuantities,
} from "../redux/cartSlice";
// import { Modal } from "antd";
// import { useState } from "react";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartTotalItems = useSelector(selectCartTotalItems);
  const cartItems = useSelector(selectCartItems);
  console.log(cartItems);
  const totalCartPrice = useSelector(selectCartTotalPrice);
  console.log(cartTotalItems);
  console.log(totalCartPrice);

  // Content Remove
  // const [open, setOpen] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);
  // const [modalText, setModalText] = useState(
  //   "Bạn muốn xóa sản phẩm này ra khỏi giỏ hàng 😭😭"
  // );
  // const showModal = () => {
  //   setOpen(true);
  // };
  // const handleOk = () => {
  //   setModalText("Xóa sản phẩm sẽ đóng sau hai giây");
  //   setConfirmLoading(true);
  //   setTimeout(() => {
  //     setOpen(false);
  //     setConfirmLoading(false);
  //   }, 2000);
  // };

  // const handleCancel = () => {
  //   console.log("Clicked cancel button");
  //   setOpen(false);
  // };

  // Format lại giá tiền
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Tăng số lượng sản phảm
  const handleIncreaseQuantity = (productId) => {
    dispatch(addToCart({ id: productId }));
  };

  // Giảm số lượng sản phẩm
  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity({ id: productId }));
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const handleRemoveItem = (productId) => {
    dispatch(removeItem({ id: productId }));
  };

  const handlePaymentClick = () => {
    // Lấy thông tin số lượng từ state và dispatch action để cập nhật
    const quantities = cartItems.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {});

    dispatch(updateQuantities(quantities));
    navigate("/pay");
  };

  if (cartItems.length === 0) {
    return <CartNull />;
  }

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
                      <br />
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
                          onClick={() => handleDecreaseQuantity(product.id)}
                        >
                          -
                        </button>
                        <span class="qtity">{product.quantity}</span>
                        <button
                          class="plus-btn btnpr"
                          onClick={() => handleIncreaseQuantity(product.id)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td data-label="Into Money" class="product-sub pr">
                      <span class="sub-amu">
                        {formatCurrency(product.total)}
                      </span>
                    </td>
                    <td data-label="Delete" class="product-cl pr">
                      <Link
                        to="#"
                        class="cart-item-actions"
                        onClick={() => {
                          handleRemoveItem(product.id);
                          // showModal();
                        }}
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
              <div class="to-pr">{formatCurrency(totalCartPrice)}</div>
            </div>
            <div class="colum-main-cart">
              <div class="continue-shopping">
                <Link to="/">TIẾP TỤC MUA SẮM</Link>
              </div>
              <button class="ma-apay" onClick={handlePaymentClick}>
                THANH TOÁN
              </button>
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
      {/* <Modal
        title="Xóa sản phẩm"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal> */}
    </>
  );
};

export default Cart;
