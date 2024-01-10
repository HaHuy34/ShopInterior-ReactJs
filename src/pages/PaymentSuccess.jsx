import { useState } from "react";
import "../../src/assetss/style/PaymentSuccess.css";
import thankImageSuccess from "../assetss/images/ImagesFigma/thank_mess.svg";
import imagePrint from "../assetss/images/ImagesFigma/Printer.svg";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartQuantities,
  selectCartTotalPrice,
} from "../redux/cartSlice";
const PaymentSuccess = () => {
  const [buyerInfo, setBuyerInfo] = useState(null);
  // Lấy thông tin các sản phẩm trong giỏ hàng
  const cartItems = useSelector(selectCartItems);
  const totalCartPrice = useSelector(selectCartTotalPrice);
  console.log(totalCartPrice);
  const quantities = useSelector(selectCartQuantities);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  useEffect(() => {
    // Lấy thông tin từ localStorage khi trang được load
    const storedBuyerInfo = localStorage.getItem("buyerInfo");
    const storeSelectedPaymentMethod = localStorage.getItem(
      "selectedPaymentMethod"
    );
    if (storedBuyerInfo) {
      const parsedBuyerInfo = JSON.parse(storedBuyerInfo);
      setBuyerInfo(parsedBuyerInfo);
    }
    if (storeSelectedPaymentMethod) {
      setSelectedPaymentMethod(storeSelectedPaymentMethod);
    }
  }, []);

  // Format lại giá tiền
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

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

  return (
    <>
      <div className="main-content-payment contact-top">
        <Container>
          <Row>
            <Col xs={1} sm={12} lg={12} xl={8} id="reponsi">
              <section className="section-icon-heading">
                <div className="icon-unpr">
                  <img src={thankImageSuccess} alt="anh" />
                </div>
                <div className="thank-mes">
                  <h2 className="title-section">Cảm ơn bạn đã mua sản phẩm</h2>
                  <p className="text-section">
                    Một email xác nhận đã được gửi tới
                    <span className="email-check">
                      {/* {buyerInfo && buyerInfo.email} */}
                      {formData.email}
                    </span>
                    <br />
                    Vui lòng kiểm tra email của bạn
                  </p>
                </div>
              </section>
            </Col>
            <Col xs={1} sm={12} lg={12} xl={4}>
              <aside className="sidebarpay">
                <div className="sidebarpay-header">
                  <h3 className="sidebarpay-header-title">Đơn hàng</h3>
                </div>
                <div className="sidebarpay-content">
                  <div className="order-summary">
                    <table className="product-table">
                      <thead className="prduct-table-header">
                        <th></th>
                        <th></th>
                        <th></th>
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
                                {formatCurrency(products.price)}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="total-order-sum">
                  <table className="totale-table-sum">
                    <thead>
                      <tr>
                        <td></td>
                        <td></td>
                      </tr>
                    </thead>
                    <tbody className="tlt-total">
                      {/* <tr>
                        <th className="tlt-total-name"></th>
                        <td className="tlt-total-price"></td>
                      </tr> */}
                      <tr>
                        <th className="tlt-total-payment-name">Tổng tiền:</th>
                        <td className="tlt-total-payment-price">
                          {formatCurrency(totalCartPrice)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </aside>
            </Col>
            <Col xs={1} sm={12} lg={12} xl={8} id="sadasd">
              <section className="section">
                <div className="section-content-border">
                  <div className="container">
                    <div className="row">
                      <div className="col">
                        <h2>Thông tin mua hàng</h2>
                        <p id="buyerName">{formData.firstName}</p>
                        <p id="buyerEmail">{formData.email}</p>
                        <p id="buyerPhoneNumber">
                          {buyerInfo && buyerInfo.phoneNumber}
                        </p>
                      </div>
                      <div className="col col--sm--two">
                        <h2>Địa chỉ nhận hàng</h2>
                        <p id="shippingName">{formData.detailedAddress}</p>
                        <p id="shippingProvince">
                          {buyerInfo && buyerInfo.cityProvince}
                        </p>

                        <p id="shippingAddress">
                          {buyerInfo && buyerInfo.district}
                        </p>

                        <p id="shippingPhoneNumber">
                          {buyerInfo && buyerInfo.phoneNumber}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <h2>Phương thức thanh toán</h2>
                        <p>Thanh toán khi nhận hàng</p>
                      </div>
                      <div className="col">
                        <h2>Phương thức vận chuyên</h2>
                        <p>Giao hàng tận nơi</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="section-unprintable"></section>
            </Col>
            <Col xs={12} sm={12} lg={12} xl={12}>
              <div className="field-main">
                <div class="btn-field">
                  <Link to="/">TIẾP TỤC MUA SẮM</Link>
                </div>
                <span className="text-icon-group" onclick="window.print()">
                  <img src={imagePrint} alt="print" />
                  <span className="pr-text">Print</span>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default PaymentSuccess;
