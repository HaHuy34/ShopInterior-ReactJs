import { Link } from "react-router-dom";

const Footer = () => {
  const homeLink = () => {
    alert(1);
  };

  const wishList = () => {
    alert(1);
  };

  const categoryList = () => {
    alert(1);
  };

  const retTo = () => {
    alert(1);
  };

  const reTo = () => {
    alert(1);
  };

  const Update = () => {
    alert(1);
  };
  return (
    <>
      <footer className="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="widget-main">
                  <div className="widget">
                    <h6 className="widget-title">Thông tin liên lạc</h6>
                    <ul className="widget-info">
                      <li>
                        <i className="fa-solid fa-location-dot"></i>
                        <p>123 Phố Viên, Bắc Từ Liêm, Hà Nội</p>
                      </li>
                      <li>
                        <i className="fa-solid fa-envelope"></i>
                        <p>huyn11677@gmai.com</p>
                      </li>
                      <li>
                        <i className="fa-solid fa-mobile-screen-button"></i>
                        <p>0865569042</p>
                      </li>
                    </ul>
                  </div>
                  <div className="widget">
                    <ul className="social-icons">
                      <li>
                        <Link to="#" className="social-facebook">
                          <i className="fa-brands fa-facebook-f"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="social-twitter">
                          <i className="fa-brands fa-twitter"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="social-google">
                          <i className="fa-brands fa-google-plus"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="social-youtube">
                          <i className="fa-brands fa-youtube"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="social-camera">
                          <i className="fa-solid fa-camera-retro"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-6">
                <div className="widget-main">
                  <div className="widget">
                    <h6 className="widget-title">Liên Kết</h6>
                    <ul className="widget-info">
                      <li>
                        <p onClick={homeLink}>Trang Chủ</p>
                      </li>
                      <li>
                        <p onClick={wishList}>Yêu Thích</p>
                      </li>
                      <li>
                        <p onClick={categoryList}>Sản Phẩm</p>
                      </li>
                      <li>
                        <p onClick={retTo}>Blogs</p>
                      </li>
                      <li>
                        <p onClick={reTo}>Liên Hệ Chúng Tôi</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-6">
                <div className="widget-main">
                  <div className="widget">
                    <h6 className="widget-title">Tài Khoản</h6>
                    <ul className="widget-info">
                      <li>
                        <p onClick={Update}>Tài khoản của tôi</p>
                      </li>
                      <li>
                        <p onClick={Update}>Lịch Sử Đơn Hàng</p>
                      </li>
                      <li>
                        <p onClick={Update}>Theo Dõi Đơn Hàng</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="widget-main">
                  <div className="widget">
                    <h6 className="widget-title">Ưu Đãi</h6>
                    <ul className="widget-info">
                      <li>
                        <p>
                          Nếu bạn muốn nhận email từ chúng tôi mỗi khi chúng tôi
                          có ưu đãi đặc biệt mới, hãy đăng ký tại đây!
                        </p>
                      </li>
                      <li>
                        <form className="form-control">
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Nhập địa chỉ email"
                          />
                          <button className="btn-sent">
                            <i className="fa-solid fa-envelope-circle-check"></i>
                          </button>
                        </form>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <p className="tc">© 2023 Mọi Độc Quyền Của Huy Ha</p>
              </div>
              <div className="col-md-6">
                <ul className="payment">
                  <li>
                    <Link to="#">
                      <img src="./assets/images/ImagesFigma/img1.png" alt="" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <img src="./assets/images/ImagesFigma/img2.png" alt="" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <img src="./assets/images/ImagesFigma/img3.png" alt="" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <img src="./assets/images/ImagesFigma/img4.png" alt="" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <img src="./assets/images/ImagesFigma/img5.png" alt="" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
