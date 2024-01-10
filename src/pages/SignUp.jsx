import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import "../assetss/style/SignUp.css";
import { database, db } from "../component/firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore/lite";

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

  // const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (formData.name === "") {
      newErrors.name = "Vui lòng nhập tên của bạn";
      isValid = false;
    }

    if (formData.email === "") {
      newErrors.email = "Vui lòng nhập địa chỉ email của bạn";
      isValid = false;
    }

    if (formData.password === "") {
      newErrors.password = "Vui lòng nhập mật khẩu của bạn";
      isValid = false;
    }

    if (formData.repeatpassword === "") {
      newErrors.repeatpassword = "Vui lòng nhập lại mật khẩu của bạn";
      isValid = false;
    } else if (formData.password !== formData.repeatpassword) {
      newErrors.repeatpassword = "Mật khẩu không phù hợp";
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

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    let isValidForm = validateForm();
    console.log("isValidForm", isValidForm);
    if (validateForm) {
      // Xử lý gửi form khi dữ liệu hợp lệ
      const email = e.target.email.value;
      const password = e.target.password.value;
      try {
        const authUser = await createUserWithEmailAndPassword(
          database,
          email,
          password
        );

        // Trích xuất uid
        const userUid = authUser.user.uid;
        console.log("userUid", userUid);

        // Lưu thông tin người dùng vào Firestore
        await setDoc(doc(db, "UserPurchase", userUid), {
          email: authUser.user.email,
          imageUrl:
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png", // Bạn có thể thêm các thông tin khác của người dùng ở đây
        });

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
        }, 1500);
      } catch (errors) {
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
      }
      // localStorage.setItem("userName", name);
      //   createUserWithEmailAndPassword(database, email, password)
      //     .then((data) => {
      //       toast.success("Đăng ký tài khoản thành công.", {
      //         position: "top-right",
      //         autoClose: 2000,
      //         hideProgressBar: false,
      //         closeOnClick: true,
      //         pauseOnHover: true,
      //         draggable: true,
      //         progress: undefined,
      //         theme: "light",
      //       });
      //       setTimeout(() => {
      //         navigate("/signin");
      //       }, 1300);

      //       console.log(data, "authData");
      //     })
      //     .catch((errors) => {
      //       if (errors.code === "auth/email-already-in-use") {
      //         toast.error("Email đã được sử dụng!", {
      //           position: "top-right",
      //           autoClose: 2000,
      //           hideProgressBar: false,
      //           closeOnClick: true,
      //           pauseOnHover: true,
      //           draggable: true,
      //           progress: undefined,
      //           theme: "light",
      //         });
      //       } else if (errors.code === "auth/invalid-email") {
      //         toast.error("Địa chỉ email không hợp lệ!", {
      //           position: "top-right",
      //           autoClose: 2000,
      //           hideProgressBar: false,
      //           closeOnClick: true,
      //           pauseOnHover: true,
      //           draggable: true,
      //           progress: undefined,
      //           theme: "light",
      //         });
      //       } else if (errors.code === "auth/operation-not-allowed") {
      //         toast.error("Hoạt động không được phép!", {
      //           position: "top-right",
      //           autoClose: 2000,
      //           hideProgressBar: false,
      //           closeOnClick: true,
      //           pauseOnHover: true,
      //           draggable: true,
      //           progress: undefined,
      //           theme: "light",
      //         });
      //       } else if (errors.code === "auth/weak-password") {
      //         toast.error("Mật khẩu quá yếu!", {
      //           position: "top-right",
      //           autoClose: 2000,
      //           hideProgressBar: false,
      //           closeOnClick: true,
      //           pauseOnHover: true,
      //           draggable: true,
      //           progress: undefined,
      //           theme: "light",
      //         });
      //       }
      //     });
      // }
    }
  };

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
                    placeholder="Nhập email"
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

              <div className="checkform">
                <button type="submit" className="btn-sent-form">
                  Đăng ký
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
