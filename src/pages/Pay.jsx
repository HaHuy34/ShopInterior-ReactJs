import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../src/assetss/style/Pay.css";
import { ToastContainer, toast } from "react-toastify";
import {
  selectCartItems,
  selectCartQuantities,
  selectCartTotalPrice,
  updateQuantities,
  updateTotalPrice,
} from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../component/firebase/FirebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore/lite";
import getCurrentUser from "../component/firebase/getCurrentUser";

const Pay = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [discountCode, setDiscountCode] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [shippingFee, setShippingFee] = useState(30000); // Khởi tạo phí vận chuyển mặc định
  const [discountApplied, setDiscountApplied] = useState(false);

  // Lấy thông tin các sản phẩm trong giỏ hàng
  const cartItems = useSelector(selectCartItems);
  const totalCartPrice = useSelector(selectCartTotalPrice);
  const quantities = useSelector(selectCartQuantities);
  console.log("quantities", quantities);

  const [formData, setFormData] = useState({
    // Khai báo tất cả các trường của form
    name: "",
    lastName: "",
    district: "",
    zipCode: "",
    cityProvince: "",
    phoneNumber: "",
    email: "",
    discountCode: "",
  });
  console.log(formData);

  useEffect(() => {
    // Retrieve form data from local storage
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      const parsedFormData = JSON.parse(storedFormData);
      // Update the component state with the retrieved form data
      setFormData(parsedFormData);
    }
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // const handleInputChange = (field, value) => {
  //   setFormData({
  //     ...formData,
  //     [field]: value,
  //   });
  // };

  const checkDiscountCodeInFirestore = async (code) => {
    try {
      // Lấy reference đến collection "codesale"
      const discountCollectionRef = collection(db, "codesale");

      // Lấy tất cả các documents trong collection
      const discountSnapshot = await getDocs(discountCollectionRef);
      const discountList = discountSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      discountList.forEach((discount) => {
        console.log("codeSaleAccount:", discount.codeSaleAccount);
      });

      console.log("Danh sách Mã giảm giá:", discountList);

      // Kiểm tra xem mã giảm giá có tồn tại trong danh sách hay không
      const discountExists = discountList.some(
        (discount) => discount.codeSaleAccount === code
      );

      // Trả về true nếu mã giảm giá tồn tại, ngược lại trả về false
      return discountExists;
    } catch (error) {
      console.error("Lỗi khi kiểm tra mã giảm giá:", error);
      return false;
    }
  };

  const handleDiscountCodeChange = (event) => {
    const value = event.target.value;
    setDiscountCode(value);
  };

  const applyDiscountCode = async () => {
    // Kiểm tra xem discountCode có giá trị không
    if (!discountCode.trim("")) {
      setInfoMessage("Nhập mã giảm giá nếu có");
      return;
    }

    // Kiểm tra mã giảm giá trong Firestore
    const discountExists = await checkDiscountCodeInFirestore(discountCode);
    // Nếu mã giảm giá tồn tại, cập nhật phí vận chuyển thành 0
    if (discountExists) {
      setShippingFee(0);
      setInfoMessage(""); // Reset thông báo nếu có
      setDiscountApplied(true);
    } else {
      // Mã giảm giá không hợp lệ, cập nhật thông báo
      setInfoMessage("Mã giảm giá không hợp lệ");
      setShippingFee(30000);
      setDiscountApplied(false);
    }
  };

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      applyDiscountCode();
    }
  };

  const handleButtonClick = async () => {
    applyDiscountCode();
  };

  //   const saveOrderToFirestore = async () => {
  //   try {
  //     // Kiểm tra xác thực, ví dụ: sử dụng Firebase Authentication
  //     const user = getCurrentUser(); // Thay thế getCurrentUser() bằng hàm lấy thông tin người dùng hiện tại

  //     if (!user) {
  //       console.log("Người dùng chưa đăng nhập");
  //       // Thực hiện xử lý tùy ý (ví dụ: chuyển hướng đến trang đăng nhập)
  //       return;
  //     }

  //     // Lấy thông tin số lượng từ state và dispatch action để cập nhật

  //     if (cartItems.length === 0) {
  //       console.log("Giỏ hàng trống rỗng");
  //       // Thực hiện xử lý tùy ý (ví dụ: hiển thị thông báo)
  //       return;
  //     }

  //     const quantities = cartItems.reduce((acc, item) => {
  //       acc[item.id] = item.quantity;
  //       return acc;
  //     }, {});

  //     // Thông tin đơn hàng
  //     const orderData = {
  //       userId: user.uid,
  //       items: cartItems,
  //       quantities: quantities,
  //       // Thêm các trường thông tin khác của đơn hàng vào đây
  //     };

  //     // Lưu đơn hàng vào Firestore
  //     await addDoc(collection(db, "orders"), orderData);

  //     // Cập nhật tổng giá và chuyển hướng người dùng đến trang xác nhận thanh toán
  //     dispatch(updateQuantities(quantities));

  //     // const isDiscountApplied = /* Logic kiểm tra xem giảm giá có được áp dụng không */;

  //     // dispatch(updateTotalPrice(isDiscountApplied));

  //     navigate("/payment-success");
  //   } catch (error) {
  //     console.error("Lỗi khi lưu đơn hàng vào Firestore:", error);
  //     // Xử lý lỗi nếu cần thiết
  //   }
  // };

  const saveFormData = () => {
    // Kiểm tra nếu có bất kỳ trường nào trống
    // if (
    //   !formData.email ||
    //   !formData.name ||
    //   !formData.lastName ||
    //   !formData.phoneNumber ||
    //   !formData.zipCode ||
    //   !formData.district ||
    //   !formData.zipCode
    // ) {
    //   toast.error("Hãy nhập đủ thông tin giao hàng", {
    //     position: "top-right",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    // } else {
    setTimeout(() => {
      // Lấy thông tin số lượng từ state và dispatch action để cập nhật
      const quantities = cartItems.reduce((acc, item) => {
        acc[item.id] = item.quantity;
        return acc;
      }, {});

      dispatch(updateQuantities(quantities));
      dispatch(updateTotalPrice()); // Gửi action để cập nhật tổng giá
      navigate("/payment-success");
    }, 1000);

    toast.success("Bạn đã thanh toán thành công", {
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

  // Format lại giá tiền
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <>
      <div className="container">
        {/* {cartItems.map((product) => ( */}
        <div className="wrap-main contact-top pay-su">
          <div className="main-content">
            <div className="container">
              <article className="floating-lable row">
                <div className="col col--two" id="repo">
                  <section className="section">
                    <div className="section-header">
                      <div className="layout-flex">
                        <h2 className="section-title">Thông tin giao hàng</h2>
                      </div>
                    </div>
                    <div className="section-content">
                      <form className="fieldset">
                        <div className="in4-pay">
                          <div className="field">
                            <div className="validate-input">
                              <label
                                class="focus-input100"
                                data-placeholder="Tên"
                              >
                                Tên
                                <abbr
                                  class="required"
                                  title="bắt buộc"
                                  data-placeholder="Tên"
                                >
                                  *
                                </abbr>
                              </label>
                              <input
                                class="input100 has-val"
                                type="text"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="field">
                            <div className="validate-input">
                              <label
                                class="focus-input100"
                                data-placeholder="Họ"
                              >
                                Họ
                                <abbr class="required" title="bắt buộc">
                                  *
                                </abbr>
                              </label>
                              <input
                                class="input100 has-val"
                                required
                                type="text"
                                value={formData.middleName}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                        </div>

                        {/* <div className="field">
                          <div className="validate-input">
                            <label
                              class="focus-input100"
                              data-placeholder="Mã bưu điện"
                            >
                              Mã bưu điện (tùy chọn)
                            </label>
                            <input
                              class="input100 has-val"
                              type="text"
                              required
                              value={formData.zipCode}
                              onChange={(e) =>
                                handleInputChange("zipCode", e.target.value)
                              }
                            />
                          </div>
                        </div> */}

                        <div className="field">
                          <div className="validate-input">
                            <label
                              class="focus-input100"
                              data-placeholder="Email"
                            >
                              Tỉnh / Thành Phố
                              <abbr class="required" title="bắt buộc">
                                *
                              </abbr>
                            </label>
                            <input
                              class="input100 has-val"
                              type="text"
                              required
                              // value={formData.cityProvince}
                              // onChange={(e) =>
                              //   handleInputChange(
                              //     "cityProvince",
                              //     e.target.value
                              //   )
                              // }
                              value={formData.city}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="field">
                          <div className="validate-input">
                            <label
                              class="focus-input100"
                              data-placeholder="Địa chỉ chi tiết"
                            >
                              Địa chỉ chi tiết
                              <abbr class="required" title="bắt buộc">
                                *
                              </abbr>
                            </label>
                            <input
                              class="input100 has-val"
                              required
                              value={formData.detailedAddress}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="field">
                          <div className="validate-input">
                            <label
                              class="focus-input100"
                              data-placeholder="Số điện thoại"
                            >
                              Số điện thoại
                              <abbr class="required" title="bắt buộc">
                                *
                              </abbr>
                            </label>
                            <input
                              class="input100 has-val"
                              type="number"
                              value={formData.phone}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="field">
                          <div className="validate-input">
                            <label
                              class="focus-input100"
                              data-placeholder="Email"
                            >
                              Địa chỉ email
                              <abbr class="required" title="bắt buộc">
                                *
                              </abbr>
                            </label>
                            <input
                              class="input100 has-val"
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) =>
                                handleInputChange("email", e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </section>
                </div>
                <div className="col col--two" id="two-style">
                  <div className="money-transport" for="">
                    <div className="transport">
                      <h2 className="section-title bsi">Thanh toán</h2>
                    </div>

                    <div className="money-transport-content">
                      <div className="mo-rec-row">
                        <div className="radio-check">
                          <input
                            type="checkbox"
                            className="paymentMethod"
                            id="paymentMethodCheckbox"
                            name="paymentMethod"
                            value="COD"
                            // checked={formData.paymentMethod === "COD"}
                            onChange={() => {}}
                          />
                        </div>
                        <label className="radio-label">
                          <span className="radio-label-pr">
                            Thanh toán khi nhận hàng
                          </span>
                          <span className="radio-label-acc">
                            <img
                              src="./assets/images/ImagesFigma/money_tran.png"
                              alt=""
                            />
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* <div
                        className="money-transport-content"
                        id="back-card-online"
                        // onClick={() => handlePaymentMethodChange("VISA")}
                      >
                        <div className="mo-rec-row">
                          <div className="radio-check">
                            <input
                              type="checkbox"
                              className="paymentMethod"
                              id="bankonline"
                              name="paymentMethod"
                              value="VISA"
                              // checked={formData.paymentMethod === "VISA"}
                              onChange={() => {}}
                            />
                          </div>
                          <label className="radio-label">
                            <span className="radio-label-pr">
                              Thanh toán online
                            </span>
                            <span className="radio-label-acc">
                              <img
                                src="./assets/images/ImagesFigma/money_tran.png"
                                alt=""
                              />
                            </span>
                          </label>
                        </div>
                      </div> */}
                  </div>
                </div>
              </article>
            </div>
          </div>
          <aside className="sidebar">
            <h2 class="section-title">Đơn hàng</h2>
            <div className="sidebar-content">
              <div className="order-summary">
                <table className="product-table">
                  <thead className="prduct-table-header">
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody id="tbl">
                    {cartItems &&
                      cartItems.map((products, index) => (
                        <tr className="pr-main" key={index}>
                          <td className="prduct-image">
                            <div className="prduct-thumbnail">
                              <div className="prduct-img-thum">
                                <div
                                  className="bg-img"
                                  style={{
                                    backgroundImage: `url(${products.image})`,
                                  }}
                                ></div>
                                <span className="pr-thum-quan">
                                  {quantities[products.id]}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="prduct-des">
                            <span className="prduct-des-name">
                              {products.title}
                            </span>
                          </td>
                          <td className="prduct-price">
                            <span>{formatCurrency(products.price)}</span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className="sale-sum">
                <div className="sale-ipbtn">
                  <div className="mes-sale-main">
                    <input
                      type="text"
                      placeholder="Nhập mã giảm giá"
                      className="input-sale"
                      value={discountCode}
                      onChange={handleDiscountCodeChange}
                      onKeyPress={handleKeyPress}
                    />
                    <div className="mess-sale">{infoMessage}</div>
                  </div>
                  <button className="btn-sale" onClick={handleButtonClick}>
                    Áp dụng
                  </button>
                </div>
              </div>
            </div>

            {/* Total order summary */}
            <div className="total-order-sum">
              <table className="totale-table-sum">
                <thead>
                  <tr>
                    <td></td>
                    <td></td>
                  </tr>
                </thead>
                <tbody className="tlt-total">
                  <tr>
                    <th className="tlt-total-name">Phí vận chuyển</th>
                    <td className="tlt-total-price">
                      {`${
                        shippingFee === 0 ? "0" : formatCurrency(shippingFee)
                      }`}
                    </td>
                  </tr>
                  <tr>
                    <th className="tlt-total-payment-name">Tổng</th>
                    <td className="tlt-total-payment-price">
                      {discountApplied
                        ? formatCurrency(totalCartPrice)
                        : formatCurrency(totalCartPrice + 30000)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Back to cart and order button */}
            <div className="back-to-cart">
              <Link href="./cart.html">
                <i className="fa-solid fa-chevron-left"></i>
                <span>Quay lại giỏ hàng</span>
              </Link>
              <div className="btn-order">
                <button
                  type="submit"
                  className="btn-or-next"
                  onClick={saveFormData}
                >
                  Đặt hàng
                </button>
              </div>
            </div>
          </aside>
        </div>
        {/* ))} */}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
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

export default Pay;
