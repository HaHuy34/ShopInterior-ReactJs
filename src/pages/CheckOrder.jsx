import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../assetss/style/CheckOrder.css";
import { Table } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const CheckOrder = () => {
  const location = useLocation();
  const { state } = location;
  const { cartItems, payQuantities, totalPrice } = state || {};
  console.log(cartItems);
  // Format lại giá tiền
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  return (
    <>
      <section className="layout-info-account">
        <Container>
          <Row>
            <Col xs={12}>
              <div className="content-account">
                <h1 className="your-account">Tài khoản của bạn</h1>
                <Link to="/" className="exit-account">
                  <i class="bx bx-log-in-circle"></i> Thoát
                </Link>
              </div>
            </Col>
            <Col md={9} xs={12} id="table-checkorder">
              <Table bordered>
                <thead>
                  <tr>
                    <th>Mã hóa đơn</th>
                    <th>Tên sản phẩm</th>
                    <th>Ngày đặt</th>
                    <th>Trạng thái thanh toán</th>
                    <th>Hình thức thanh toán</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems &&
                    cartItems.map((product, index) => (
                      <tr key={index}>
                        <td>{product.code}</td>
                        <td>{product.title}</td>
                        <td>29/12/2023</td>
                        <td className="check-update-status">Mới</td>
                        <td>Thanh toán tại nhà</td>
                        <td>{formatCurrency((product.price)*(payQuantities[index]))}</td>
                      </tr>
                    ))}
                  {/* <tr>
                    <td>54654464</td>
                    <td>Ghế bàn tròn</td>
                    <td>29/12/2023</td>
                    <td className="check-update-status">Mới</td>
                    <td>Thanh toán tại nhà</td>
                    <td>200.000đ</td>
                  </tr> */}
                </tbody>
              </Table>
            </Col>
            <Col md={3} xs={12}>
              <div className="customer_sidebar">
                <p className="customer-name">
                  <span>Họ tên:</span> Hà Văn Huy
                </p>
                <p className="customer-mail">
                  <span>Email:</span>
                  hun11677@gmail.com
                </p>
                <p className="customer-phone">
                  <span>Điện thoại</span> 0865569042
                </p>
                <p className="customer-sex">
                  <span>Giới tính</span> Nam
                </p>
                <p className="customer-birth">
                  <span>Ngày sinh</span>16/10/2001
                </p>
                <p className="customer-city">
                  <span>Thành phố</span> Hà Nội
                </p>
                <div className="view-address">
                  <Link to="/">Cập nhật lại tài khoản </Link>
                  <i class="bx bx-share bx-flip-horizontal"></i>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CheckOrder;
