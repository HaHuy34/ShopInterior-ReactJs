import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../src/assetss/style/Pay.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

const Pay = () => {
  const navigate = useNavigate();
  // Lấy sản phẩm từ trạng thái vị trí
  const location = useLocation();
  const { cartItems, totalPrice, quantities } = location.state || {};
  const [payQuantities, setPayQuantities] = useState(quantities); // Store quantities in Pay.jsx state
  console.log("quansđsfsdfsdfsdftities", cartItems);
  console.log(totalPrice);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false); // Thêm biến trạng thái để kiểm tra xem mã đã được áp dụng chưa
  const [discountCode, setDiscountCode] = useState("");
  const [discountMessage, setDiscountMessage] = useState("");
  const [totalAmount, setTotalAmount] = useState(30000);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    district: "",
    zipCode: "",
    cityProvince: "",
    phoneNumber: "",
    email: "",
    discountCode: "",
    transportFee: 0,
    totalAmount: 0,
    paymentMethod: "COD",
    paymentOnlineMethod: "VISA",
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  useEffect(() => {
    if (formData.paymentMethod === "COD") {
      setSelectedPaymentMethod("Thanh toán khi nhận hàng");
    } else if (formData.paymentMethod === "VISA") {
      setSelectedPaymentMethod("Thanh toán online");
    }
  }, [formData.paymentMethod]);

  useEffect(() => {
    localStorage.setItem("selectedPaymentMethod", selectedPaymentMethod);
  }, [selectedPaymentMethod]);

  // Trong hàm useEffect, sau khi khai báo các state
  useEffect(() => {
    // Kiểm tra xem có dữ liệu đã lưu trong localStorage không
    const savedBuyerInfo = localStorage.getItem("buyerInfo");
    const savedPaymentMethod = localStorage.getItem("selectedPaymentMethod");

    if (savedBuyerInfo) {
      // Nếu có dữ liệu, điền nó vào các ô input
      const parsedBuyerInfo = JSON.parse(savedBuyerInfo);
      setFormData({
        ...formData,
        ...parsedBuyerInfo,
      });
    }

    if (savedPaymentMethod) {
      // Nếu có dữ liệu về phương thức thanh toán, cập nhật state
      setSelectedPaymentMethod(savedPaymentMethod);
    }
  }, []);

  const [buyerInfo, setBuyerInfo] = useState({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    district: "",
    cityProvince: "",
  });

  const listSale = ["Huy", "Ha", "Quan", "Tuan"];

  const handleDiscountCodeChange = (e) => {
    setDiscountCode(e.target.value);
  };

  const applyDiscountCode = () => {
    if (listSale.includes(discountCode)) {
      // Mã giảm giá hợp lệ
      setDiscountMessage(`Đã áp mã thành công`);
      setIsDiscountApplied(true); // Đánh dấu rằng mã đã được áp dụng
      setTotalAmount(0);
    } else {
      // Mã giảm giá không hợp lệ
      setDiscountMessage("Mã không hợp lệ");
      setIsDiscountApplied(false); // Đánh dấu rằng mã đã được áp dụng
      setTotalAmount(30000);
    }
  };

  // Tạo một biến tạm để kiểm tra xem mã giảm giá đã được áp dụng hay chưa
  // const isDiscountApplied = listSale.includes(discountCode);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Người dùng ấn phím "Enter," gọi applyDiscountCode
      applyDiscountCode();
    }
  };

  const handlePaymentMethodChange = (method) => {
    setFormData({
      ...formData,
      paymentMethod: method,
      paymentOnlineMethod: method === "COD" ? "" : "VISA",
    });
  };

  const handleInputChange = (fieldName, value) => {
    // Check if the input value exceeds the maximum length
    if (fieldName === "phoneNumber" && value.length > 11) {
      // Truncate the input value to 11 characters
      value = value.slice(0, 11);
    }
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const saveFormData = () => {
    // Validate the form data before submission
    if (
      !formData.email ||
      !formData.name ||
      !formData.lastName ||
      !formData.phoneNumber ||
      !formData.zipCode ||
      !formData.district ||
      !formData.zipCode
    ) {
      alert("Xin vui lòng điền đầy đủ thông tin vào các ô bắt buộc");
      return; // Don't proceed with submission if any required field is empty
    }

    const phoneNumberPattern = /^[0-9]*$/;
    if (!phoneNumberPattern.test(formData.phoneNumber)) {
      alert("Hãy nhập lại số điện thoại");
      return; // Don't proceed with submission if the phone number format is incorrect
    }

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      alert("Hãy nhập lại địa chỉ email");
      return; // Don't proceed with submission if the email format is incorrect
    }

    // ... Lưu thông tin vào trạng thái toàn cục
    setBuyerInfo({
      name: formData.name,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
    });

    // Lưu thông tin vào localStorage
    localStorage.setItem("buyerInfo", JSON.stringify(formData));
    localStorage.setItem("selectedPaymentMethod", selectedPaymentMethod);
    setTimeout(() => {
      navigate("/payment-success", {
        state: {
          cartItems,
          payQuantities, // Pass the payQuantities data
          totalPrice, // Pass the totalPrice data
        },
      });
      console.log("danh sách sản phẩm", cartItems);
    }, 1000);


     setTimeout(() => {
       navigate("/checkorder", {
         state: {
           cartItems,
           payQuantities, // Pass the payQuantities data
           totalPrice, // Pass the totalPrice data
         },
       });
       console.log("danh sách sản phẩm", cartItems);
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
                                data-placeholder="Email"
                              >
                                Tên
                                <abbr class="required" title="bắt buộc">
                                  *
                                </abbr>
                              </label>
                              <input
                                class="input100 has-val"
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                  handleInputChange("name", e.target.value)
                                }
                                required
                              />
                            </div>
                          </div>
                          <div className="field">
                            <div className="validate-input">
                              <label
                                class="focus-input100"
                                data-placeholder="Email"
                              >
                                Họ
                                <abbr class="required" title="bắt buộc">
                                  *
                                </abbr>
                              </label>
                              <input
                                class="input100 has-val"
                                type="text"
                                required
                                value={formData.lastName}
                                onChange={(e) =>
                                  handleInputChange("lastName", e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="field">
                          <div className="validate-input">
                            <label
                              class="focus-input100"
                              data-placeholder="Email"
                            >
                              Địa chỉ
                              <abbr class="required" title="bắt buộc">
                                *
                              </abbr>
                            </label>
                            <input
                              class="input100 has-val"
                              required
                              value={formData.district}
                              onChange={(e) =>
                                handleInputChange("district", e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="field">
                          <div className="validate-input">
                            <label
                              class="focus-input100"
                              data-placeholder="Email"
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
                        </div>
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
                              value={formData.cityProvince}
                              onChange={(e) =>
                                handleInputChange(
                                  "cityProvince",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="field">
                          <div className="validate-input">
                            <label
                              class="focus-input100"
                              data-placeholder="Email"
                            >
                              Số điện thoại
                              <abbr class="required" title="bắt buộc">
                                *
                              </abbr>
                            </label>
                            <input
                              class="input100 has-val"
                              type="text"
                              value={formData.phoneNumber}
                              onChange={(e) =>
                                handleInputChange("phoneNumber", e.target.value)
                              }
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

                    <div
                      className="money-transport-content"
                      onClick={() => handlePaymentMethodChange("COD")}
                      // onClick={handlePaymentMethodClick}
                    >
                      <div className="mo-rec-row">
                        <div className="radio-check">
                          <input
                            type="checkbox"
                            className="paymentMethod"
                            id="paymentMethodCheckbox"
                            name="paymentMethod"
                            value="COD"
                            checked={formData.paymentMethod === "COD"}
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

                    <div
                      className="money-transport-content"
                      id="back-card-online"
                      onClick={() => handlePaymentMethodChange("VISA")}
                    >
                      <div className="mo-rec-row">
                        <div className="radio-check">
                          <input
                            type="checkbox"
                            className="paymentMethod"
                            id="bankonline"
                            name="paymentMethod"
                            value="VISA"
                            checked={formData.paymentMethod === "VISA"}
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
                    </div>
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
                                  {payQuantities[index]}
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
                    <div className="mess-sale">{discountMessage}</div>
                  </div>
                  <button className="btn-sale" onClick={applyDiscountCode}>
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
                      {formatCurrency(totalAmount)}
                    </td>
                  </tr>
                  <tr>
                    <th className="tlt-total-payment-name">Tổng</th>
                    <td className="tlt-total-payment-price">
                      {formatCurrency(
                        isDiscountApplied ? totalPrice - 30000 : totalPrice
                      )}
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
