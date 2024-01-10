import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../assetss/style/BlogMain.css";
import BackToTop from "../component/BackToTop";
import { doc, getDoc } from "firebase/firestore/lite";
import { db } from "../component/firebase/FirebaseConfig";
import WaitLoad from "../component/WaitLoad";

const BlogMain = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enameBlog, setNameBlog] = useState("");
  const [eimageMain, setImageMain] = useState("");
  const [econtentH1, setContentH1] = useState("");
  const [econtentH2, setContentH2] = useState("");
  const [econtentH3, setContentH3] = useState("");
  const [econtentOutMain, setContentOutMain] = useState("");
  const [eheading1Content, setHeading1Content] = useState("");
  const [eheading2Content, setHeading2Content] = useState("");
  const [eheading3Content, setHeading3Content] = useState("");
  const [eimgaeContentH1, setImgaeContentH1] = useState("");
  const [eimgaeContentH2, setImgaeContentH2] = useState("");
  const [loading, setLoading] = useState(true);

  const decRef = doc(db, "blog", id);
  console.log("decRef", decRef);
  const getd = async () => {
    const userSnapShot = await getDoc(decRef);
    setImageMain(userSnapShot.data().imageMain);
    setContentH1(userSnapShot.data().contentH1);
    setContentH2(userSnapShot.data().contentH2);
    setContentH3(userSnapShot.data().contentH3);
    setContentOutMain(userSnapShot.data().contentOutMain);
    setHeading1Content(userSnapShot.data().heading1Content);
    setHeading2Content(userSnapShot.data().heading2Content);
    setHeading1Content(userSnapShot.data().heading1Content);
    setHeading3Content(userSnapShot.data().heading3Content);
    setImgaeContentH1(userSnapShot.data().imgaeContentH1);
    setImgaeContentH2(userSnapShot.data().imgaeContentH2);
    setNameBlog(userSnapShot.data().nameblog);
  };
  getd();

  useEffect(() => {
    const decRef = doc(db, "blog", id);

    const fetchData = async () => {
      try {
        const userSnapShot = await getDoc(decRef);
        console.log(userSnapShot);
        // ... thiết lập các biến state dựa trên userSnapShot.data()
        setLoading(false); // Đặt loading thành false sau khi dữ liệu được tải
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi cho người dùng)
        setLoading(false); // Đặt loading thành false ngay cả khi có lỗi
      }
    };

    fetchData();
  }, [id]);

  // const backBlog = () => {
  //   navigate("/blog");
  // }
  return (
    <>
      {loading ? (
        <WaitLoad />
      ) : (
        <div className="main-blog-detail">
          <Container>
            <Row>
              <Col sm={9}>
                <div className="title-main-blog">
                  <p className="post-categories-blog">
                    XU HƯỚNG THIẾT KẾ, NỘI THẤT
                  </p>
                  <h1 className="name-title-blog">{enameBlog}</h1>
                  <span
                    className="out-main-blog"
                    style={{ textAlign: "start", color: "#8b7777" }}
                  >
                    {econtentOutMain}
                  </span>
                </div>
                <div className="image-main-blog">
                  <div
                    className="blog-image-top"
                    style={{ backgroundImage: `url(${eimageMain})` }}
                  >
                    <div className="post-date">
                      <span className="post-day"></span>
                      <br />
                      <span className="post-month"></span>
                    </div>
                  </div>
                </div>
                <div className="wraper-text abscoli">
                  <span>{}</span>
                </div>
                <div className="content-blog-main">
                  <div className="content-blog-main-left">
                    <h3>{eheading1Content}</h3>
                    <p className="abscoli">{econtentH1}</p>
                    <img
                      src={eimgaeContentH1}
                      alt=""
                      style={{ margin: "10px 0", width: "100%" }}
                    />
                  </div>
                </div>
                <h3>{eheading2Content}</h3>
                <p className="abscoli">{econtentH1}</p>
              </Col>
              <Col sm={3}></Col>
            </Row>
          </Container>
        </div>
      )}
      <BackToTop />
    </>
  );
};

export default BlogMain;
