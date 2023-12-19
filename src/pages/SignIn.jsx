import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assetss/style/SignIn.css";
import { database } from "../component/firebaseLogin/FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import Addmin from "../addmin/Addmin";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    checkbox: "",
  });

  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (formData.name === "") {
      newErrors.name = "Nhập tên của bạn";
      isValid = false;
    }

    if (formData.email === "") {
      newErrors.email = "Nhập địa chỉ email";
      isValid = false;
    }

    if (formData.password === "") {
      newErrors.password = "Nhập mật khẩu của bạn";
      isValid = false;
    }

    if (formData.repeatpassword === "") {
      newErrors.repeatpassword = "Nhập lại mật khẩu";
      isValid = false;
    } else if (formData.password !== formData.repeatpassword) {
      newErrors.repeatpassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    let isValidForm = validateForm();

    // Check if the checkbox is not checked
    if (!checkboxChecked) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        checkbox: "Please remember your password for more convenient login",
      }));
      isValidForm = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        checkbox: "",
      }));
    }
    if (validateForm) {
      // Xử lý gửi form khi dữ liệu hợp lệ
      const email = e.target.email.value;
      const password = e.target.password.value;
      if (type === "signin") {
        createUserWithEmailAndPassword(database, email, password)
          .then((data) => {
            toast.success("Đăng nhập thành công!", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            // navigate("/addmin");
          })
          .catch((errors) => {
            // toast.error(`${errors.code}`, {
            //   position: "top-center",
            //   autoClose: 5000,
            //   hideProgressBar: false,
            //   closeOnClick: true,
            //   pauseOnHover: true,
            //   draggable: true,
            //   progress: undefined,
            //   theme: "light",
            // });
            alert(errors.code);
          });
      } else {
        signInWithEmailAndPassword(database, email, password)
          .then((data) => {
            setTimeout(() => {
              navigate("/addmin");
            }, 1500);
            toast.success("Đăng nhập thành công!", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          })
          .catch((errors) => {
            if (errors.code === "auth/wrong-password") {
              toast.error("Mật khẩu không hợp lệ!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            } else if (errors.code === "auth/too-many-requests") {
              toast.error("Quá nhiều yêu cầu!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            } else if (errors.code === "auth/user-not-found") {
              toast.error("Tài khoản không tồn tại!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
          });
      }
    }
  };
  return (
    <>
      <div className="container">
        <div className="signin-content">
          <div className="sign-image">
            <figure className="img-sign-in"></figure>

            <Link className="sign-up" to="/signup">
              Tạo một tài khoản
            </Link>
          </div>
          <div className="signin-form">
            <h1 className="form-title">Đăng nhập</h1>
            <form className="register-form" onSubmit={handleSubmit}>
              <div className="form-group-signin">
                <div className="input-form">
                  <i className="bx bxs-envelope"></i>
                  <input
                    type="email"
                    placeholder="Nhập địa chỉ email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="form-group-signin">
                <div className="input-form">
                  <i className="bx bxs-lock"></i>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Mật khẩu"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {showPassword ? (
                    <i
                      className="bx bxs-show"
                      onClick={handlePasswordVisibility}
                    ></i>
                  ) : (
                    <i
                      className="bx bxs-hide"
                      onClick={handlePasswordVisibility}
                    ></i>
                  )}
                </div>
                {errors.password && (
                  <span className="error">{errors.password}</span>
                )}
              </div>
              {/* <div className="checkbox">
                <div className="check-service">
                  <input
                    type="checkbox"
                    checked={checkboxChecked}
                    onChange={(e) => setCheckboxChecked(e.target.checked)}
                  />
                  <label
                    onClick={() =>
                      setCheckboxChecked((prevChecked) => !prevChecked)
                    }
                  >
                    <span className="term-service">Remember me</span>
                  </label>
                </div>
                {errors.checkbox && (
                  <span className="error">{errors.checkbox}</span>
                )}
              </div> */}
              <div className="checkform">
                <button type="submit" className="btn-sent-form">
                  Đăng nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
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

export default SignIn;
