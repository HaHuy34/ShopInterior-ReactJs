import React, { useState, useEffect, useRef } from "react";
import "../assetss/style/Sales.css"
const Sale = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      // Bấm vào bên ngoài menu nên ẩn nó đi
      setIsMenuVisible(true);
    }
  };

  useEffect(() => {
    // Đính kèm trình xử lý sự kiện trên thành phần gắn kết
    document.addEventListener("mousedown", handleClickOutside);

    // Dọn dẹp trình xử lý sự kiện khi ngắt kết nối thành phần
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="container">
        <div className="discount-product">
          <div className="sales-top">
            <h3>Quản lý sản phẩm giảm giá</h3>
            <div className="main-menu-sales">
              <div className="input-search">
                <i className="bx bx-search"></i>
                <input
                  type="text"
                  placeholder="Tìm kiếm"
                  className="inp-search"
                />
              </div>
              <div className="fillter-menu" ref={menuRef}>
                <button className="filter-product" onClick={toggleMenu}>
                  <p>Fillter</p>
                  <i className="bx bx-filter-alt"></i>
                </button>
                <div
                  className={`menu-main-fillter ${
                    isMenuVisible ? "open" : "ps-fillter"
                  }`}
                >
                  <select name="lang" id="lang-select">
                    <option value="">Tất cả danh mục</option>
                    <option>Mã giảm giá 30%</option>
                    <option>Mã giảm giá 50%</option>
                    <option>Mã giảm giá 70%</option>
                    <option>Mã đã hết hạn</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="sales-bottom container">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="products-row">
                  <div className="product-image">
                    <img
                      src="https://woodmart.xtemos.com/wp-content/uploads/2016/09/product-furniture-4-3.jpg.webp"
                      alt=""
                    />
                  </div>
                  <div className="poducts-detail">
                    <span className="cell-lable-name">
                      Ghế phòng ngủ cho bé
                    </span>
                  </div>
                  <div className="poducts-detail">
                    <span className="cell-lable">Loại:</span>
                    <span className="cell-lable-in4">Phòng ngủ</span>
                  </div>
                  <div className="poducts-detail">
                    <span className="cell-lable">Trạng thái:</span>
                    <span className="status-sale-active status-sale">
                      Còn hàng
                    </span>
                  </div>
                  <div className="poducts-detail">
                    <span className="cell-lable sales-number">Giảm giá:</span>
                    <span className="cell-lable-in4 num-sales">30%</span>
                  </div>
                  <div className="poducts-detail">
                    <span className="cell-lable sales-number">Mã áp dụng:</span>
                    <span className="cell-lable-in4">SPPP2SEP8K</span>
                  </div>
                  <div className="poducts-detail">
                    <span className="cell-lable sales-number">Giá:</span>
                    <span className="cell-lable-in4 price-sales">
                      1.200.000 đ
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="products-row">
                  <div className="product-image">
                    <img
                      src="https://woodmart.xtemos.com/wp-content/uploads/2016/09/product-furniture-4-3.jpg.webp"
                      alt=""
                    />
                  </div>
                  <div className="poducts-detail">
                    <span className="cell-lable-name">
                      Ghế phòng ngủ cho bé
                    </span>
                  </div>
                  <div className="poducts-detail">
                    <span className="cell-lable">Loại:</span>
                    <span className="cell-lable-in4">Phòng ngủ</span>
                  </div>
                  <div className="poducts-detail">
                    <span className="cell-lable">Trạng thái:</span>
                    <span className="status-sale-active status-sale">
                      Còn hàng
                    </span>
                  </div>
                  <div className="poducts-detail">
                    <span className="cell-lable sales-number">Giảm giá:</span>
                    <span className="cell-lable-in4 num-sales">30%</span>
                  </div>
                  <div className="poducts-detail">
                    <span className="cell-lable sales-number">Mã áp dụng:</span>
                    <span className="cell-lable-in4">SPPP2SEP8K</span>
                  </div>
                  <div className="poducts-detail">
                    <span className="cell-lable sales-number">Giá:</span>
                    <span className="cell-lable-in4 price-sales">
                      1.200.000 đ
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="products-row">
                  <div className="product-image">
                    <img
                      src="https://woodmart.xtemos.com/wp-content/uploads/2016/09/product-furniture-4-3.jpg.webp"
                      alt=""
                    />
                  </div>
                  <div className="poducts-detail">
                    <span className="cell-lable-name">
                      Ghế phòng ngủ cho bé
                    </span>
                  </div>
                  <div className="poducts-detail">
                    <span className="cell-lable">Loại:</span>
                    <span className="cell-lable-in4">Phòng ngủ</span>
                  </div>
                  <div className="poducts-detail">
                    <span className="cell-lable">Trạng thái:</span>
                    <span className="status-sale-active status-sale">
                      Còn hàng
                    </span>
                  </div>
                  <div className="poducts-detail">
                    <span className="cell-lable sales-number">Giảm giá:</span>
                    <span className="cell-lable-in4 num-sales">30%</span>
                  </div>
                  <div className="poducts-detail">
                    <span className="cell-lable sales-number">Mã áp dụng:</span>
                    <span className="cell-lable-in4">SPPP2SEP8K</span>
                  </div>
                  <div className="poducts-detail">
                    <span className="cell-lable sales-number">Giá:</span>
                    <span className="cell-lable-in4 price-sales">
                      1.200.000 đ
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="products-row">
                  <div className="product-image">
                    <img
                      src="https://woodmart.xtemos.com/wp-content/uploads/2016/09/product-furniture-4-3.jpg.webp"
                      alt=""
                    />
                  </div>
                  <div className="poducts-detail">
                    <span className="cell-lable-name">
                      Ghế phòng ngủ cho bé
                    </span>
                  </div>
                  <div className="poducts-detail">
                    <span className="cell-lable">Loại:</span>
                    <span className="cell-lable-in4">Phòng ngủ</span>
                  </div>
                  <div className="poducts-detail">
                    <span className="cell-lable">Trạng thái:</span>
                    <span className="status-sale-active status-sale">
                      Còn hàng
                    </span>
                  </div>
                  <div className="poducts-detail">
                    <span className="cell-lable sales-number">Giảm giá:</span>
                    <span className="cell-lable-in4 num-sales">30%</span>
                  </div>
                  <div className="poducts-detail">
                    <span className="cell-lable sales-number">Mã áp dụng:</span>
                    <span className="cell-lable-in4">SPPP2SEP8K</span>
                  </div>
                  <div className="poducts-detail">
                    <span className="cell-lable sales-number">Giá:</span>
                    <span className="cell-lable-in4 price-sales">
                      1.200.000 đ
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sale;
