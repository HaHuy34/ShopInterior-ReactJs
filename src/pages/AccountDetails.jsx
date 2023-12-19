import React from "react";
import { useState } from "react";
import "../assetss/style/AccountDetail.css";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AccountDetails = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
  });

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in, update email in formData
        setFormData((prevData) => ({ ...prevData, email: user.email }));
      } else {
        // User is logged out, reset email in formData
        setFormData((prevData) => ({ ...prevData, email: "" }));
      }
    });

    return () => {
      // Cleanup the subscription when the component unmounts
      unsubscribe();
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation or submit data to the server here
    console.log("Form submitted:", formData);

    
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="form-acc-detail">
        <div className="user-details">
          <div className="form-group">
            <label className="form-title" htmlFor="firstName">
              Tên đầu tiên
              <span class="required">
                <font>*</font>
              </span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Tên đầu tiên"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-title" htmlFor="middleName">
              Họ
              <span class="required">
                <font>*</font>
              </span>
            </label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              placeholder="Họ"
              value={formData.middleName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-title" htmlFor="lastName">
              Tên hiển thị
              <span class="required">
                <font>*</font>
              </span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Tên hiển thị"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="account-details">
          <div className="form-group">
            <label className="form-title" htmlFor="email">
              Email
              <span class="required">
                <font>*</font>
              </span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Nhập email của bạn"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div className="gr-main">
            <div className="form-group">
              <label className="form-title" htmlFor="password">
                Mật khẩu hiện tại (Để trống hoặc không thay đổi)
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Nhập mật khẩu hiện tại"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-title" htmlFor="confirmPassword">
                Mật khẩu mới (Để trống hoặc không thay đổi)
              </label>
              <input
                type="newPassword"
                id="newPassword"
                name="newPassword"
                placeholder="Nhập mật khẩu mới"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-title" htmlFor="confirmPassword">
              Xác nhận mật khẩu mới
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Nhập mật khẩu mới"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-radio">
          <label className="form-title">Giới tính</label>
          <div className="category">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleInputChange}
              />
              <span>Nam</span>
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleInputChange}
              />
              <span>Nữ</span>
            </label>
          </div>
        </div>

        <div className="button">
          <input type="submit" value="Lưu thay đổi" />
        </div>
      </form>
    </>
  );
};

export default AccountDetails;
