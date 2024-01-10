import React from "react";
import { useState } from "react";
import "../assetss/style/AccountDetail.css";
import { useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore/lite";
import { db, storage } from "../component/firebase/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const AccountDetails = () => {
  //Hiển thị mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const [userImageUrl, setUserImageUrl] = useState("");
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
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Lấy thông tin người dùng từ Firestore
        const userDocRef = doc(db, "UserPurchase", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          // Nếu tài khoản tồn tại, lấy đường dẫn ảnh từ dữ liệu Firestore
          const userData = userDocSnap.data();
          setUserImageUrl(userData.imageUrl);
          setFormData(userData);
        }
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
  const auth = getAuth();
  const user = auth.currentUser; // Giả sử bạn có đối tượng người dùng từ trạng thái xác thực

  // Kiểm tra nếu người dùng đã đăng nhập
  if (!user) {
    // Xử lý trường hợp khi người dùng chưa đăng nhập
    return <p>Người dùng chưa đăng nhập</p>;
  }

  const userDocRef = doc(db, "UserPurchase", user.uid);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    // Tải tệp lên Firebase Storage
    const storageRef = ref(storage, `userImages/${file.name}`);
    try {
      const snapshot = await uploadBytes(storageRef, file);

      // Lấy đường dẫn tải về
      const downloadURL = await getDownloadURL(storageRef);

      // Cập nhật tài liệu Firestore với imageUrl mới
      await updateDoc(userDocRef, { imageUrl: downloadURL });

      console.log("Đường dẫn ảnh đã được cập nhật thành công");
      // Cập nhật trạng thái local với imageUrl mới
      setUserImageUrl(downloadURL);
    } catch (error) {
      console.error("Lỗi khi tải lên ảnh:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation or submit data to the server here
    console.log("Form submitted:", formData);
    const auth = getAuth();
    try {
      // Đăng nhập
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Nếu không có lỗi, người dùng đã đăng nhập thành công
      toast.success("Cập nhật thành công.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Lấy thông tin người dùng từ Firestore
      const userDocRef = doc(db, "UserPurchase", userCredential.user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const currentData = userDocSnap.data();
        // Nếu tài khoản tồn tại, cập nhật dữ liệu Firestore
        await updateDoc(userDocRef, {
          ...currentData, // Đảm bảo bao gồm toàn bộ dữ liệu hiện tại
          firstName: formData.firstName,
          middleName: formData.middleName,
          lastName: formData.lastName,
          phone: formData.phone,
          city: formData.city,
          detailedAddress: formData.detailedAddress,
          // Thêm các trường dữ liệu khác nếu cần
        });

        console.log("Dữ liệu đã được cập nhật vào Firestore thành công");
      } else {
        console.error("Lỗi đăng nhập:");
        toast.error("Lỗi cập nhật.", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      // Xử lý lỗi xác thực, ví dụ: email hoặc mật khẩu không đúng
      console.error("Lỗi đăng nhập:", error.message);
      toast.error("Lỗi cập nhật.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    localStorage.setItem("formData", JSON.stringify(formData));
  };

  const handleForgotPasswordClick = async () => {
    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, formData.email);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Hàm xử lý sự kiện khi nhấn vào nút hiển thị/ẩn mật khẩu
  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-acc-detail">
        <div className="user-details">
          <div className="form-group">
            <label className="form-title" htmlFor="firstName">
              Tên
              <span class="required">
                <font>*</font>
              </span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Tên"
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
        <div className="user-details phone">
          <div className="form-group">
            <label className="form-title" htmlFor="firstName">
              Số điện thoại
              <span class="required">
                <font>*</font>
              </span>
            </label>
            <input
              type="number"
              id="firstName"
              name="phone"
              placeholder="Số điện thoại"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="imageInput"
          />
          <img
            src={userImageUrl}
            alt="Selected"
            style={{ maxWidth: "100%", maxHeight: "100px" }}
            onClick={() => document.getElementById("imageInput").click()}
          /> */}
          <div className="form-group">
            <label className="form-title" htmlFor="middleName">
              Tỉnh / Thành phố
              <span class="required">
                <font>*</font>
              </span>
            </label>
            <input
              type="text"
              id="middleName"
              name="city"
              placeholder="Tỉnh / Thành phố"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </div>8
          <div className="form-group">
            <label className="form-title" htmlFor="middleName">
              Địa chỉ chi tiết
              <span class="required">
                <font>*</font>
              </span>
            </label>
            <input
              type="text"
              id="middleName"
              name="detailedAddress"
              placeholder="Địa chỉ chi tiết"
              value={formData.detailedAddress}
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
              placeholder={formData.email}
              // value={formData.email}
              // onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div className="gr-main">
            <div className="form-group">
              <label className="form-title" htmlFor="password">
                Mật khẩu hiện tại (Để trống hoặc không thay đổi)
              </label>

              <div className="ipt-countdetal">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Nhập mật khẩu hiện tại"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />

                {showPassword ? (
                  <i
                    className="bx accdettail bxs-show"
                    onClick={handlePasswordVisibility}
                  ></i>
                ) : (
                  <i
                    className="bx accdettail bxs-hide"
                    onClick={handlePasswordVisibility}
                  ></i>
                )}
              </div>
              <span
                className="forgot-password-detailaccout"
                onClick={handleForgotPasswordClick}
              >
                Đặt lại mật khẩu
              </span>
            </div>

            {/* <div
              className="form-group"
              style={{ display: forgotPasswordClicked ? "block" : "none" }}
            >
              <label className="form-title" htmlFor="confirmPassword">
                Mật khẩu mới (Để trống hoặc không thay đổi)
              </label>
              <input
                type="newPassword"
                id="newPassword"
                name="newPassword"
                placeholder="Nhập mật khẩu mới"
                value={formData.newPassword}
                onChange={handleInputChange}
                required
              />
            </div> */}
          </div>
          {/* <div
            className="form-group"
            style={{ display: forgotPasswordClicked ? "block" : "none" }}
          >
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
          </div> */}
        </div>

        <div className="button">
          <input type="submit" value="Lưu thay đổi" />
          {/* <input type="submit" value="Chỉnh sửa" /> */}
        </div>
      </form>
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

export default AccountDetails;
