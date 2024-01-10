import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assetss/style/SignIn.css";
import { database, db } from "../component/firebase/FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import Addmin from "../addmin/Addmin";
import { addDoc, collection } from "firebase/firestore/lite";

const SignIn = () => {
  const navigate = useNavigate();

  const [displayname, setDisplayname] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [totalorder, setTotalorder] = useState("");
  const [totalspending, setTotalspending] = useState("");
  const [statuspurchase, setStatuspurchase] = useState("");
  const [detailedAddress, setDetailedAddress] = useState("");
  const [postal, setPostal] = useState("");
  const [city, setCity] = useState("");
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
            toast.success("Đăng nhập thành công abs!", {
              position: "top-right",
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
            toast.error(`${errors.code}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            alert(errors.code);
            console.log(errors.code);
          });
      } else {
        signInWithEmailAndPassword(database, email, password)
          .then(async (data) => {
            if (email === "huyn11677@gmail.com") {
              setTimeout(() => {
                navigate("/statis");
              }, 1500);
            } else {
              try {
                await addDoc(collection(db, "UserPurchase"), {
                  displayname: displayname,
                  email: email,
                  lastname: lastname,
                  firstname: firstname,
                  phone: phone,
                  city: city,
                  postal: postal,
                  detailedAddress: detailedAddress,
                  statuspurchase: statuspurchase,
                  totalorder: Number(totalorder),
                  totalspending: Number(totalspending),
                });
                navigate("/");
              } catch (error) {
                console.error("Error adding document: ", error);
                // Handle the error as needed
              }
            }
          })
          .catch((error) => {
            const errorCode = error.code;
            console.log("errorCode", errorCode);

            if (errorCode === "auth/wrong-password") {
              toast.error("Mật khẩu không hợp lệ!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            } else if (errorCode === "auth/too-many-requests") {
              toast.error("Quá nhiều yêu cầu!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            } else if (errorCode === "auth/user-not-found") {
              toast.error("Tài khoản không tồn tại!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            } else {
              // Xử lý các mã lỗi khác nếu cần
              console.error("Unhandled error:", error);
              // Hiển thị một thông báo chung cho lỗi không xác định
              toast.error("Đã xảy ra lỗi khi đăng nhập!", {
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

export default SignIn;
