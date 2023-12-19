import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import "../assetss/style/SignUp.css";
import { database } from "../component/firebaseLogin/FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  // fetchSignInMethodsForEmail,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatpassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    repeatpassword: "",
    checkbox: "",
  });

  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (formData.name === "") {
      newErrors.name = "Please enter your name";
      isValid = false;
    }

    if (formData.email === "") {
      newErrors.email = "Please enter your email";
      isValid = false;
    }

    if (formData.password === "") {
      newErrors.password = "Please enter your password";
      isValid = false;
    }

    if (formData.repeatpassword === "") {
      newErrors.repeatpassword = "Please enter your repeat password";
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
  const handleRepeatPasswordVisibility = () => {
    setShowRepeatPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    let isValidForm = validateForm();

    // Check if the checkbox is not checked
    if (!checkboxChecked) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        checkbox: "Please agree to the terms of service",
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
      const name = e.target.name.value;
      localStorage.setItem("userName", name);
      createUserWithEmailAndPassword(database, email, password)
        .then((data) => {
          toast.success("Đăng ký tài khoản thành công.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            navigate("/signin");
          }, 1300);

          console.log(data, "authData");
        })
        .catch((errors) => {
          if (errors.code === "auth/email-already-in-use") {
            toast.error("Email đã được sử dụng!", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else if (errors.code === "auth/invalid-email") {
            toast.error("Địa chỉ email không hợp lệ!", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else if (errors.code === "auth/operation-not-allowed") {
            toast.error("Hoạt động không được phép!", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else if (errors.code === "auth/weak-password") {
            toast.error("Mật khẩu quá yếu!", {
              position: "top-right",
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
  };

  // // Trong hàm xử lý đăng ký thành công
  // const nameValue = document.querySelector('input[name="name"]').value;
  // localStorage.setItem("userName", nameValue);
  // useEffect(() => {
  //   const savedName = localStorage.getItem("userName");
  //   const userNameElement = document.querySelector(".userName");

  //   if (savedName && userNameElement) {
  //     userNameElement.textContent = savedName;
  //   }
  // }, []);

  return (
    <>
      <div className="container">
        <div className="signup-content">
          <div className="signup-form">
            <h1 className="form-title">Đăng ký</h1>
            <form className="register-form" onSubmit={handleSubmit}>
              <div className="form-group-signup">
                <div className="input-form">
                  <i className="bx bxs-user"></i>
                  <input
                    type="text"
                    placeholder="Nhập tên"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
              <div className="form-group-signup">
                <div className="input-form">
                  <i className="bx bxs-envelope"></i>
                  <input
                    type="email"
                    placeholder="NHập email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="form-group-signup">
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
              <div className="form-group-signup">
                <div className="input-form">
                  <div className="input-form">
                    <i className="bx bx-lock"></i>
                    <input
                      type={showRepeatPassword ? "text" : "password"}
                      placeholder="Nhập lại mật khẩu"
                      name="repeatpassword"
                      value={formData.repeatpassword}
                      onChange={handleChange}
                    />
                    {showRepeatPassword ? (
                      <i
                        className="bx bxs-show"
                        onClick={handleRepeatPasswordVisibility}
                      ></i>
                    ) : (
                      <i
                        className="bx bxs-hide"
                        onClick={handleRepeatPasswordVisibility}
                      ></i>
                    )}
                  </div>
                </div>
                {errors.repeatpassword && (
                  <span className="error">{errors.repeatpassword}</span>
                )}
              </div>
              {/* <div className="checkbox">
                <div className="check-service">
                  <input
                    type="checkbox"
                    checked={checkboxChecked}
                    onChange={(e) => setCheckboxChecked(e.target.checked)}
                  />
                  <label>
                    <span
                      className="term-service"
                      onClick={() =>
                        setCheckboxChecked((prevChecked) => !prevChecked)
                      }
                    >
                      I agree all statements in
                    </span>
                    <Link className="service" to="#">
                      Terms of service
                    </Link>
                  </label>
                </div>
                {errors.checkbox && (
                  <span className="error">{errors.checkbox}</span>
                )}
              </div> */}
              <div className="checkform">
                <button type="submit" className="btn-sent-form">
                  Register
                </button>
              </div>
            </form>
          </div>
          <div className="sign-image">
            <figure className="img-sign-up"></figure>

            <Link className="sign-in" to="/signin">
              Tôi đã là thành viên
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
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

export default SignUp;
