import React from "react";
import "../assetss/style/Gutters.css";

const Gutters = () => {
  return (
    <>
      <div className="shipping-info">
        <div className="container">
          <div className="row gutters" id="row" data-aos="fade-up">
            <div className="col-12 col-lg-3 col-sm-6" id="col">
              <div className="content-main">
                <div className="icon-box">
                  <i className="fa-solid fa-truck-arrow-right"></i>
                </div>
                <div className="icon-content">
                  <p className="content-title">Miễn phí vận chuyển</p>
                  <p className="ct">Thế giới</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-3 col-sm-6" id="col">
              <div className="content-main">
                <div className="icon-box">
                  <i className="fa-solid fa-hand-holding-dollar"></i>
                </div>
                <div className="icon-content">
                  <p className="content-title">Trả lại tiền</p>
                  <p className="ct">30 ngày</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-3 col-sm-6" id="col">
              <div className="content-main">
                <div className="icon-box">
                  <i className="fa-solid fa-headset"></i>
                </div>
                <div className="icon-content">
                  <p className="content-title">Hỗ trợ 27/4</p>
                  <p className="ct">Hỗ trợ khách hàng</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-3 col-sm-6" id="col">
              <div className="content-main" id="last-ch">
                <div className="icon-box">
                  <i className="fa-solid fa-credit-card"></i>
                </div>
                <div className="icon-content">
                  <p className="content-title">Bao mật thanh toán</p>
                  <p className="ct">Thanh toán an toàn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gutters;
