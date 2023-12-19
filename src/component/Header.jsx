import { Link, useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import "../Style.css";
import Image1 from "../assetss/images/ImagesFigma/logo_dark.png";
import bannerHeader1 from "../assetss/images/ImagesFigma/menu_banner11.jpg";
import bannerHeader2 from "../assetss/images/ImagesFigma/menu_banner22.jpg";
import bannerHeader3 from "../assetss/images/ImagesFigma/menu_banner33.jpg";
import { database } from "../component/firebaseLogin/FirebaseConfig";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const naviage = useNavigate();
  const cartCount = useSelector((state) => state.cartItems.length);
  //  const cartCount = useSelector((state) => state.cartCount);
  const [searchInput, setSearchInput] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  // Đăng nhập thành công
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const productSuggestions = [
    "Ghế gỗ mọt sách",
    "Ghế nhựa Eames",
    "Char với tạp chí",
    "Ghế đan len",
    "Ghế quán cafe",
    "Ghế xoay dọc",
    "Ghế da thư giãn",
    "Ghế gỗ cổ đen",
    "Ghế đậu ba chân",
    "Ghế tựa Rival",
    "Ghế xếp Ikea",
    "Ghế ăn FRP",
    "Bàn cafe tạo kiểu",
    "Ghế ván trượt",
    "Ghế dài Lie",
  ];

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Đã đăng nhập
        setIsLoggedIn(true);
      } else {
        // Đã đăng xuất
        setIsLoggedIn(false);
      }
    });

    return () => {
      // Hủy đăng ký theo dõi khi component bị unmount
      unsubscribe();
    };
  }, []);

  // Hàm xử lý khi người dùng nhấn Enter
  const handleSearchEnter = (e) => {
    if (e.key === "Enter" && searchInput.trim() !== "") {
      setSearchInput("");
      const inputLower = searchInput.toLowerCase();
      const productExists = productSuggestions.some((product) =>
        product.toLowerCase().includes(inputLower)
      );

      if (!productExists) {
        alert("Sản phẩm bạn nhập không tồn tại");
      } else {
        setSearchInput("");
        // Lưu giá trị vào lịch sử tìm kiếm
        setSearchHistory([...searchHistory, searchInput]);
        // Navigate to the categorylist page with the search query
        naviage(`/categorylist?search=${searchInput}`);
        // Xóa giá trị input sau khi tìm kiếm
      }
    }
  };
  const SignUp = () => {
    signOut(database).then((val) => {
      console.log(val);
    });
    naviage("signup");
  };

  const SignIn = () => {
    naviage("signin");
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const cartShopping = () => {
    naviage("/cart");
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion);
  };

  const navigateCategorylist = () => {
    naviage("/categorylist");
  };

  const CheckOrder = () => {
    naviage("/order");
  };

  const AccountWishListNull = () => {
    naviage("/wishlistnull");

  }
const AccountDetail = () => {
  naviage("/account-detail");
};
  return (
    <>
      <header className="he-top-fix">
        <div className="container">
          <nav className="header-top">
            <div className="logo">
              <Link to="/">
                <img src={Image1} alt="logo" />
              </Link>
            </div>
            <div className="link-home">
              <ul className="menu-cher">
                <li className="home ic">
                  <Link to="/">TRANG CHỦ</Link>
                </li>
                {/* <li className="prd-muli ic" id="mu-li">
                  <Link to="wishlist" className="link-main">
                    YÊU THÍCH
                  </Link>
                  <div className="dr-menu">
                    <ul className="dr-page">
                      <li className="mu-page" style={{ marginBottom: "10px" }}>
                        <Link to="/wishlist" className="link-m">
                          Wish List
                        </Link>
                      </li>
                      <li className="mu-page">
                        <Link to="cart">About Us</Link>
                      </li>
                    </ul>
                  </div>
                </li> */}
                <li className="prd-muli ic">
                  <Link to="/" className="link-main">
                    SẢN PHẨM <i className="fa-solid fa-chevron-down"></i>
                  </Link>
                  <div className="dropdowns-menu">
                    <ul className="menu-mega d-lg-flex">
                      <li className="mega-menu-col col-lg-3">
                        <ul>
                          <li className="dropdown-header">Ghế </li>
                          <li>
                            <Link to="/categorylist">Ghế Cổ Điển</Link>
                          </li>
                          <li>
                            <Link to="/categorylist">Ghế Hiện Đại</Link>
                          </li>
                          <li>
                            <Link to="/categorylist">Ghế Đa Năng</Link>
                          </li>
                          <li>
                            <Link to="/categorylist">Ghế Da Cao Cấp</Link>
                          </li>
                        </ul>
                      </li>
                      <li className="mega-menu-col col-lg-3">
                        <ul>
                          <li className="dropdown-header">Ghế </li>
                          <li>
                            <Link to="/categorylist">Ghế Cổ Điển</Link>
                          </li>
                          <li>
                            <Link to="/categorylist">Ghế Hiện Đại</Link>
                          </li>
                          <li>
                            <Link to="/categorylist">Ghế Đa Năng</Link>
                          </li>
                          <li>
                            <Link to="/categorylist">Ghế Da Cao Cấp</Link>
                          </li>
                        </ul>
                      </li>
                      <li className="mega-menu-col col-lg-3">
                        <ul>
                          <li className="dropdown-header">Ghế </li>
                          <li>
                            <Link to="/categorylist">Ghế Cổ Điển</Link>
                          </li>
                          <li>
                            <Link to="/categorylist">Ghế Hiện Đại</Link>
                          </li>
                          <li>
                            <Link to="/categorylist">Ghế Đa Năng</Link>
                          </li>
                          <li>
                            <Link to="/categorylist">Ghế Da Cao Cấp</Link>
                          </li>
                        </ul>
                      </li>
                      <li className="mega-menu-col col-lg-3">
                        <ul>
                          <li className="dropdown-header">Ghế </li>
                          <li>
                            <Link to="/categorylist">Ghế Cổ Điển</Link>
                          </li>
                          <li>
                            <Link to="/categorylist">Ghế Hiện Đại</Link>
                          </li>
                          <li>
                            <Link to="/categorylist">Ghế Đa Năng</Link>
                          </li>
                          <li>
                            <Link to="/categorylist">Ghế Da Cao Cấp</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <div className="image-dropdown">
                      <div className="col-sm-4">
                        <div
                          className="header-image-drop-banner"
                          onClick={navigateCategorylist}
                          style={{
                            backgroundImage: `url(${bannerHeader1})`,
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            paddingTop: "50%",
                          }}
                        >
                          <div className="info5">
                            <h6 className="bn-title1 bn">Giảm giá 10%</h6>
                            <h5 className="bn-title bn">Ghế Gỗ</h5>
                            <Link to="categorylist" className="bn-link bn">
                              Mua Ngay
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div
                          className="header-image-drop-banner"
                          onClick={navigateCategorylist}
                          style={{
                            backgroundImage: `url(${bannerHeader2})`,
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            paddingTop: "50%",
                          }}
                        >
                          <div className="info5">
                            <h6 className="bn-title1 bn">Giảm giá 15%</h6>
                            <h5 className="bn-title bn">Ghế Gỗ</h5>
                            <Link to="categorylist" className="bn-link bn">
                              Mua Ngay
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div
                          className="header-image-drop-banner"
                          onClick={navigateCategorylist}
                          style={{
                            backgroundImage: `url(${bannerHeader3})`,
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            paddingTop: "50%",
                          }}
                        >
                          <div className="info5">
                            <h6 className="bn-title1 bn">Giảm giá 20%</h6>
                            <h5 className="bn-title bn">Ghế Gỗ</h5>
                            <Link to="categorylist" className="bn-link bn">
                              Mua Ngay
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="ic">
                  <Link to="/blog" className="link-main">
                    BLOG
                  </Link>
                </li>
                <li className="ic">
                  <Link to="contactus" className="link-main">
                    LIÊN HỆ
                  </Link>
                </li>
                {/* <li className="ic sales">
                  <Link to="sales" className="link-main">
                    GIẢM GIÁ
                  </Link>
                </li> */}
              </ul>
            </div>
            <div className="icons">
              <ul className="icon-link">
                <li className="search">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <div className="search-btn">
                    <input
                      type="text"
                      className="se-input"
                      placeholder="Enter name......"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      onKeyPress={handleSearchEnter}
                    />
                    {searchInput.trim() !== "" && (
                      <div className="search-history">
                        <ul>
                          {productSuggestions
                            .filter((suggestion) =>
                              suggestion
                                .toLowerCase()
                                .includes(searchInput.toLowerCase())
                            )
                            .map((suggestion, index) => (
                              <li
                                key={index}
                                onClick={() =>
                                  handleSuggestionClick(suggestion)
                                }
                              >
                                {suggestion}
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                    {/* <div className="search-history">
                      <ul>
                        {searchHistory.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                        {listSearch.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div> */}
                  </div>
                </li>
                <li className="cart" onClick={cartShopping}>
                  <i className="fa-solid fa-cart-shopping"></i>
                  <span id="cart-count">{cartCount}</span>
                </li>

                <li className="charen-account">
                  <div className="cha-main-account">
                    <i class="bx bxs-user"></i>
                    <ul className="menu-account">
                      <li onClick={CheckOrder}>Đơn đặt hàng</li>
                      <li onClick={AccountWishListNull}>Sản phẩm yêu thích</li>
                      <li onClick={AccountDetail}>Chi tiết tài khoản</li>
                      {isLoggedIn ? (
                        // Hiển thị thẻ "Đăng xuất" khi đã đăng nhập
                        <li className="logout" onClick={SignUp}>
                          Đăng xuất
                          {/* <i className="bx bx-log-out"></i> */}
                        </li>
                      ) : (
                        // Hiển thị thẻ "Đăng nhập" khi chưa đăng nhập
                        <li className="account" onClick={SignIn}>
                          Đăng nhập
                          {/* <i className="bx bx-log-in"></i> */}
                        </li>
                      )}
                    </ul>
                  </div>
                </li>

                {/* <li className="account" onClick={SignIn}>
                  <i className="bx bx-log-in"></i>
                </li>
                <li className="logout" onClick={SignUp}>
                  <i className="bx bx-log-out"></i>
                </li> */}
                <li className="bars">
                  <div
                    className={`menu ${isOpen ? "open" : ""}`}
                    onClick={toggleMenu}
                  >
                    <svg viewBox="0 0 800 600" class="">
                      <path
                        d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200"
                        class="top_bar"
                      />

                      <path d="M300,320 L540,320" class="middle_bar" />

                      <path
                        d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190"
                        class="bottom_bar"
                        transform="translate(480, 320) scale(1, -1) translate(-480, -318)"
                      />
                    </svg>
                  </div>

                  <div className={`dropdow-menu ${isOpen ? "open" : ""}`}>
                    {isOpen && (
                      <Accordion defaultActiveKey="0" flush>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header className="header-home">
                            HOME
                          </Accordion.Header>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                          <Accordion.Header>PAGES</Accordion.Header>
                          <Accordion.Body>
                            <div
                              className="dr-header"
                              style={{ width: "100%" }}
                            >
                              <p className="main-dropdow">
                                <Link to="wishlist">Wish List</Link>
                              </p>
                              <p className="main-dropdow tck">
                                <Link to="cart">About Us</Link>
                              </p>
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                          <Accordion.Header>PRODUCTS</Accordion.Header>
                          <Accordion.Body>
                            <div className="dr-header" id="scroll-hea">
                              <h5>TV SHELF</h5>
                              <p className="main-dropdow">
                                <Link to="/categorylist">Ghế Cổ Điển</Link>
                              </p>
                              <p className="main-dropdow">
                                <Link to="/categorylist">Ghế Hiện Đại</Link>
                              </p>
                              <p className="main-dropdow">
                                <Link to="/categorylist">Ghế Đa Năng</Link>
                              </p>
                              <p className="main-dropdow">
                                <Link to="/categorylist">Ghế Da Cao Cấp</Link>
                              </p>
                              <h5>WARDROBE</h5>
                              <p className="main-dropdow">
                                <Link to="/categorylist">
                                  NeoclassNameical Wardrobe
                                </Link>
                              </p>
                              <p className="main-dropdow">
                                <Link to="/categorylist">Modern Wardrobe</Link>
                              </p>
                              <p className="main-dropdow">
                                <Link to="/categorylist">
                                  Open Door Wardrobe
                                </Link>
                              </p>
                              <p className="main-dropdow">
                                <Link to="/categorylist">
                                  Wardrobe Sliding Door
                                </Link>
                              </p>
                              <h5>BED</h5>
                              <p className="main-dropdow">
                                <Link to="/categorylist">
                                  NeoclassNameical Bed
                                </Link>
                              </p>
                              <p className="main-dropdow">
                                <Link to="/categorylist">Modern New Bed</Link>
                              </p>
                              <p className="main-dropdow">
                                <Link to="/categorylist">Leather Bed</Link>
                              </p>
                              <p className="main-dropdow">
                                <Link to="/categorylist">Large Bed</Link>
                              </p>
                              <h5>TEA TABLE</h5>
                              <p className="main-dropdow">
                                <Link to="/categorylist">
                                  NeoclassNameical Tea Table
                                </Link>
                              </p>
                              <p className="main-dropdow">
                                <Link to="/categorylist">Modern Tea Table</Link>
                              </p>
                              <p className="main-dropdow">
                                <Link to="/categorylist">Square Tea Table</Link>
                              </p>
                              <p className="main-dropdow">
                                <Link to="/categorylist">Round Tea Table</Link>
                              </p>
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                          <Accordion.Header className="header-blog">
                            BLOG
                          </Accordion.Header>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                          <Accordion.Header className="header-contactus">
                            CONTACT US
                          </Accordion.Header>
                        </Accordion.Item>
                      </Accordion>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
