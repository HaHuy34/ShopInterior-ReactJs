import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../assetss/style/ContactUs.css";
import ImageContact01 from "../assetss/images/ImagesFigma/book.png";
import ImageContact02 from "../assetss/images/ImagesFigma/litt.png";
import ImageContact03 from "../assetss/images/ImagesFigma/phone.png";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
import FeedbackClinet from "./FeedbackClinet";
import "boxicons";
const ContactUs = () => {
  const [showForm, setShowForm] = useState(true);
  // const navigate = useNavigate();
  // Number Phone
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (e) => {
    if (phoneNumber) {
      if (isValidPhoneNumber(phoneNumber)) {
        console.log("Valid phone number.");
      } else {
        console.log("Invalid phone number.");
      }
    }
  };

  const isValidPhoneNumber = (number) => {
    // Kiểm tra định dạng mã vùng điện thoại của Việt Nam (2 hoặc 3 chữ số)
    return /^0\d{9}$/.test(number);
  };

  // Send Mess
  const handleSummit = () => {
    setShowForm(false);
    toast.success("Send feedback successfully!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    // navigate("/");
  };
  return (
    <>
      <div className="contact-top">
        <Container>
          <Row>
            <Col md={6} lg={4} data-aos="fade-right">
              <div className="contact-wrap">
                <div className="contact-icon">
                  <img src={ImageContact01} alt="" />
                </div>
                <div className="contact-text">
                  <span>Địa chỉ</span>
                  <p>18 P. Viên, Đông Ngạc, Bắc Từ Liêm, Hà Nội</p>
                </div>
              </div>
            </Col>
            <Col md={6} lg={4} data-aos="fade-up">
              <div className="contact-wrap">
                <div className="contact-icon">
                  <img src={ImageContact02} alt="" />
                </div>
                <div className="contact-text">
                  <span>Địa chỉ Email</span>
                  <p>huyn11677@gmail.com</p>
                </div>
              </div>
            </Col>
            <Col md={6} lg={4} data-aos="fade-left">
              <div className="contact-wrap">
                <div className="contact-icon">
                  <img src={ImageContact03} alt="" />
                </div>
                <div className="contact-text">
                  <span>Số điện thoại</span>
                  <p>+ 0865569042</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="get-in-touch">
        <Container>
          <Row>
            <Col sm={12} md={6} lg={6} data-aos="fade-right">
              <div className="heading">
                <h2>Bạn có bất kỳ câu hỏi nào?</h2>
              </div>
              <p className="leads">
                Shopwise cam kết cung cấp giải pháp thương mại điện tử với trải
                nghiệm mua sắm tốt nhất cho người tiêu dùng trong định hình
                phong cách sống hiện đại và mua sắm nội thất tại Việt Nam.
              </p>
              {showForm ? (
                <div className="form">
                  <form onSubmit={handleSummit}>
                    <Row>
                      <Col md={6}>
                        <div className="form-group-contact">
                          <input
                            type="text"
                            required
                            placeholder="Nhập họ và tên *"
                            name="name"
                          />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="form-group-contact">
                          <input
                            type="email"
                            required
                            placeholder="Nhập địa chỉ Email *"
                            name="email"
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <div className="form-group-contact">
                          <input
                            type="tel"
                            // id="phoneInput"
                            name="phone"
                            placeholder="Nhập số điện thoại *"
                            value={phoneNumber}
                            onBlur={handlePhoneNumberChange}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            maxLength={10}
                          />
                          {phoneNumber &&
                            (isValidPhoneNumber(phoneNumber) ? (
                              <p className="success">
                                Valid phone number.
                                <box-icon
                                  name="check-square"
                                  type="solid"
                                  color="#07BC0C"
                                  size="sm"
                                ></box-icon>
                              </p>
                            ) : (
                              <p className="err">
                                Invalid phone number.
                                <box-icon
                                  name="error"
                                  type="solid"
                                  color="red"
                                  size="sm"
                                ></box-icon>
                              </p>
                            ))}
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="form-group-contact">
                          <input
                            type="text"
                            name="subject"
                            placeholder="Tên sản phẩm muốn phản ánh"
                          />
                        </div>
                      </Col>
                    </Row>
                    <div className="form-group-contact">
                      <textarea
                        required
                        className="form-con"
                        rows="4"
                        name="message"
                        placeholder="Thông tin phản hồi *"
                      ></textarea>
                    </div>
                    <div className="col-md-12">
                      <button className="btn-fill-out" type="submit">
                        Gửi phản hồi
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <FeedbackClinet />
              )}
            </Col>
            <Col sm={12} md={6} lg={6} data-aos="fade-left">
              <div className="map">
                <iframe
                  title="myFrame"
                  src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3919.5553606579792!2d106.72284397469703!3d10.768710589379593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1zNTIgTmd1eeG7hW4gQ8ahIFRo4bqhY2gsIFAuIEFuIEzhu6NpIMSQw7RuZywgUS4gMiwgVFAgSENNLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1684239568691!5m2!1svi!2s"
                  width="600"
                  height="450"
                  style={{ border: "0" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </Col>
          </Row>
        </Container>
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

export default ContactUs;
