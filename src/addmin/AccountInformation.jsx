import React, { useEffect, useState } from "react";
import "../assetss/style/addmin/AccountInformation.css";
import { getAuth, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { ToastContainer } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore/lite";
import { db } from "../component/firebase/FirebaseConfig";

const AccountInformation = () => {
  const [imageFile, setImageFile] = useState(null);
  const uploadedImage = localStorage.getItem("uploadedImage");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    newPassword: "",
    phone: "",
    detailedAddress: "",
    city: "",
    confirmPassword: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
  });
  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Lấy hình ảnh từ sự kiện tải lên
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const uploadedImage = e.target.result;
        // Lưu URL của hình ảnh vào localStorage
        localStorage.setItem("uploadedImage", uploadedImage);
        setImageFile(uploadedImage); // Lưu trữ hình ảnh trong state
      };
      reader.readAsDataURL(file);
    }
  };

  // Sử dụng useEffect để lấy URL hình ảnh từ localStorage khi trang web được nạp lại
  useEffect(() => {
    const storedImage = localStorage.getItem("uploadedImage");
    if (storedImage) {
      setImageFile(storedImage);
    }
  }, []);


  const handleForgotPasswordClick = async () => {
    const auth = getAuth();
    const email = formData.email; // Get the email from the form data
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Email đặt lại mật khẩu đã được gửi", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Lỗi khi gửi email đặt lại mật khẩu:", error.message);
    }
  };
  return (
    <>
      <div class="container-xl px-4 mt-4 account-admin-i4">
        <div class="row">
          <div class="col-xl-4">
            <div class="card mb-4 mb-xl-0">
              <div class="card-header">Ảnh đại diện</div>
              <div class="card-body text-center">
                {imageFile ? (
                  // Hiển thị hình ảnh được tải lên (nếu có)
                  <img
                    src={imageFile}
                    alt=""
                    style={{
                      width: "150px",
                      height: "150px",
                      overflow: "hidden",
                    }}
                    className="rounded-circle"
                  />
                ) : (
                  // Hiển thị hình ảnh mặc định nếu chưa có hình ảnh
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkL_zpTULJ9oHSTLYX2iaSAeeCxoPUi3hWKQ&usqp=CAU"
                    alt=""
                    width="35"
                    height="35"
                    className="rounded-circle"
                  />
                )}
                {/* <img
                  style={{
                    width: "150px",
                    height: "150px",
                    overflow: "hidden",
                  }}
                  className="img-account-profile rounded-circle mb-2"
                  src={
                    uploadedImage ||
                    "http://bootdey.com/img/Content/avatar/avatar1.png"
                  }
                  alt=""
                /> */}
                <div class="small font-italic text-muted mb-4"></div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          </div>
          <div class="col-xl-8">
            <div class="card mb-4">
              <div class="card-header">Chi tiết tài khoản</div>
              <div class="card-body">
                <form>
                  {/* <div class="mb-3">
                    <label class="small mb-1" for="inputUsername">
                      Tên người dùng (tên của bạn sẽ xuất hiện như thế nào với
                      những người dùng khác trên trang web)
                    </label>
                    <input
                      class="form-control"
                      id="inputUsername"
                      type="text"
                      placeholder="Tên hiển thị"
                      // placeholder="username"
                    />
                  </div> */}
                  {/* <div class="row gx-3 mb-3">
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputFirstName">
                        Tên đầu
                      </label>
                      <input
                        class="form-control"
                        id="inputFirstName"
                        type="text"
                        placeholder="Nhập tên của bạn"
                      />
                    </div>
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputLastName">
                        Họ
                      </label>
                      <input
                        class="form-control"
                        id="inputLastName"
                        type="text"
                        placeholder="Nhập họ của bạn"
                      />
                    </div>
                  </div> */}
                  <div class="mb-3">
                    <label class="small mb-1" for="inputEmailAddress">
                      Địa chỉ email
                    </label>
                    <input
                      class="form-control"
                      id="inputEmailAddress"
                      type="email"
                      // value={email}
                    />
                  </div>
                  <div class="row gx-3 mb-3">
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputOrgName">
                        Mật khẩu hiện tại (Để trống hoặc không thay đổi)
                      </label>
                      <input
                        class="form-control"
                        id="inputOrgName"
                        type="text"
                        placeholder="Mật khẩu hiện tại"
                      />
                      <span
                        className="forgot-password-detailaccout"
                        onClick={handleForgotPasswordClick}
                      >
                        Đặt lại mật khẩu
                      </span>
                    </div>
                    {/* <div class="col-md-6">
                      <label class="small mb-1" for="inputLocation">
                        Mật khẩu mới (Để trống hoặc không thay đổi)
                      </label>
                      <input
                        class="form-control"
                        id="inputLocation"
                        type="text"
                        placeholder="Mật khẩu mới"
                      />
                    </div> */}
                  </div>

                  {/* <div class="row gx-3 mb-3">
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputPhone">
                        Số điện thoại
                      </label>
                      <input
                        class="form-control"
                        id="inputPhone"
                        type="tel"
                        placeholder="Nhập số điện thoại"
                      />
                    </div>
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputBirthday">
                        Ngày sinh
                      </label>
                      <input
                        class="form-control"
                        id="inputBirthday"
                        type="text"
                        name="birthday"
                        placeholder="Nhập ngày sinh của bạn"
                      />
                    </div>
                  </div> */}

                  <div
                    class="col-12"
                    style={{ textAlign: "center", paddingTop: "20px" }}
                  >
                    <button
                      class="btn btn-success"
                      type="button"
                      style={{ marginRight: "10px" }}
                    >
                      Hủy
                    </button>
                    <button class="btn btn-primary" type="button">
                      Lưu thay đổi
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
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

export default AccountInformation;
