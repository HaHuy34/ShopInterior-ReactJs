import React from "react";
import { Link, useNavigate } from "react-router-dom";
import imgCollectionProduct01 from "../assetss/images/ImagesFigma/furniture_banner1.jpg";
import imgCollectionProduct02 from "../assetss/images/ImagesFigma/furniture_banner2.jpg";
import "../assetss/style/CollectionProduct.css";

const CollectionProduct = () => {
  const navigate = useNavigate();
  const naviCategoryList = () => {
    navigate("/categorylist");
  };
  return (
    <>
      <div className="container">
        <div className="banner">
          <div
            className="single-banner-01"
            data-aos="fade-right"
            onClick={naviCategoryList}
          >
            <img src={imgCollectionProduct01} alt="" />
            <div className="info1">
              <h5 className="single-bn-title1">Bán Chạy</h5>
              <h3 className="single-bn-title">Bộ Sưu Tập Mới</h3>
              <Link to="/categorylist" className="single-bn-link">
                Mua Ngay
              </Link>
            </div>
          </div>
          <div
            className="single-banner-02"
            data-aos="fade-left"
            onClick={naviCategoryList}
          >
            <img src={imgCollectionProduct02} alt="" />
            <div className="info2">
              <h5 className="single-bn-title1">Bán Chạy</h5>
              <h3 className="single-bn-title">Bộ Sưu Tập Mới</h3>
              <Link to="/categorylist" className="single-bn-link">
                Mua Ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionProduct;
