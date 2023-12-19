import React from "react";
import "../assetss/style/Slide.css";
import ImageSlide01 from "../assetss/images/ImagesFigma/banner-image-hed06.png";
import ImageSlide02 from "../assetss/images/ImagesFigma/banner-image-hed07.png";
import ImageSlide03 from "../assetss/images/ImagesFigma/banner-image-he-13.png";
import ImageSlide04 from "../assetss/images/ImagesFigma/banner-image-hed05.png";
import ImageSlide05 from "../assetss/images/ImagesFigma/banner-image-hed02.png";
import ImageSlide06 from "../assetss/images/ImagesFigma/banner-image-hed04.png";
import { useNavigate } from "react-router-dom";

const Slide = () => {
  const navigate = useNavigate();
  const handleNextClick = () => {
    const slide = document.getElementById("slide");
    slide.appendChild(slide.firstElementChild);
  };

  const handlePrevClick = () => {
    const slide = document.getElementById("slide");
    slide.insertBefore(slide.lastElementChild, slide.firstElementChild);
  };

  const banerLink = () => {
    navigate("/categorylist");
  };

  return (
    <>
      <div className="container-banner-image">
        <div className="slide-bn">
          <div id="slide">
            <div
              className="itemas"
              id="itemas-01"
              style={{
                backgroundImage: `url(${ImageSlide01})`,
              }}
            >
              <div className="content">
                <div className="name" id="title-name-he">
                  Bộ sưu tập ghế sofa
                </div>
                <div className="des">
                  Nhận ưu đãi lên tới 50% chỉ trong hôm nay
                </div>
                <button className="btn-line-fill" onClick={banerLink}>
                  XEM NGAY
                </button>
              </div>
            </div>
            <div
              className="itemas"
              id="itemas-02"
              style={{
                backgroundImage: `url(${ImageSlide02})`,
              }}
            >
              <div className="content">
                <div className="name" id="title-name-he">
                  Bộ sưu tập ghế gỗ
                </div>
                <div className="des">
                  Nhận giảm giá tới 70% chỉ trong hôm nay!
                </div>
                <button className="btn-line-fill" onClick={banerLink}>
                  XEM NGAY
                </button>
              </div>
            </div>
            <div
              className="itemas"
              id="itemas-03"
              style={{
                backgroundImage: `url(${ImageSlide03})`,
              }}
            >
              <div className="content">
                <div className="name" id="title-name-he">
                  Bộ sưu tập phòng khách
                </div>
                <div className="des">Get up to 60% off Today Only!</div>
                <button className="btn-line-fill" onClick={banerLink}>
                  XEM NGAY
                </button>
              </div>
            </div>
            <div
              className="itemas"
              id="itemas-04"
              style={{
                backgroundImage: `url(${ImageSlide04})`,
              }}
            >
              <div className="content">
                <div className="name" id="title-name-he">
                  Bộ sưu tập ghế sofa
                </div>
                <div className="des">
                  Nhận ưu đãi lên tới 50% chỉ trong hôm nay!
                </div>
                <button className="btn-line-fill" onClick={banerLink}>
                  XEM NGAY
                </button>
              </div>
            </div>
            <div
              className="itemas"
              id="itemas-05"
              style={{
                backgroundImage: `url(${ImageSlide05})`,
              }}
            >
              <div className="content">
                <div className="name" id="title-name-he">
                  Bộ sưu tập ghế gỗ
                </div>
                <div className="des">
                  Nhận ưu đãi lên tới 70% chỉ trong hôm nay!
                </div>
                <button className="btn-line-fill" onClick={banerLink}>
                  XEM NGAY
                </button>
              </div>
            </div>
            <div
              className="itemas"
              id="itemas-06"
              style={{
                backgroundImage: `url(${ImageSlide06})`,
              }}
            >
              <div className="content">
                <div className="name" id="title-name-he">
                  Bộ sưu tập phòng khách
                </div>
                <div className="des">
                  Nhận ưu đãi lên tới 60% chỉ trong hôm nay!
                </div>
                <button className="btn-line-fill" onClick={banerLink}>
                  XEM NGAY
                </button>
              </div>
            </div>
          </div>
          <div className="buttons">
            <button id="prevas" onClick={handlePrevClick}>
              <i className="fa-solid fa-arrow-up-long"></i>
            </button>
            <button id="nextas" onClick={handleNextClick}>
              <i className="fa-solid fa-arrow-down-long"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slide;
