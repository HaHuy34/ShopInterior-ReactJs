import { Link } from "react-router-dom";
import "../assetss/style/Blog.css";
import BackToTop from "../component/BackToTop";
import { collection, getDocs } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { db } from "../component/firebase/FirebaseConfig";
import LoadingProduct from "../component/LoadingProduct";

const Blog = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Số mục muốn hiển thị trên mỗi trang
  const [loading, setLoading] = useState(true);

  async function getCities(db) {
    const citiesCol = collection(db, "blog");
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setUsers(cityList);
  }

  console.log(users);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    getCities(db);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getCities(db);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Tính toán các giá trị liên quan đến phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="blog-main">
        <div className="container">
          {loading ? (
            <div className="row">
              {[1, 2, 3].map((index) => (
                <div
                  className="col-12 col-sm-12 col-md-6 col-lg-4"
                  key={index}
                  data-aos="fade-right"
                >
                  <LoadingProduct />
                </div>
              ))}
            </div>
          ) : (
            <div className="row">
              {currentItems.map((blog, index) => (
                <div
                  className="col-12 col-sm-12 col-md-6 col-lg-4"
                  key={index.id}
                  data-aos="fade-right"
                >
                  <div className="blog-item">
                    <Link to={`${blog.id}`}>
                      <div
                        className="blog-image-top"
                        style={{ backgroundImage: `url(${blog.imageMain})` }}
                      >
                        <div className="post-date">
                          <span className="post-day">23</span>
                          <br />
                          <span className="post-month">Tháng 11</span>
                        </div>
                        <div className="post-categories">
                          <span className="by-categories">
                            XU HƯỚNG THIẾT KẾ, NỘI THẤT
                          </span>
                        </div>
                      </div>

                      <div className="blog-content">
                        <h3 className="title-content">{blog.nameblog}</h3>
                        <div className="entry-content">
                          {blog.contentOutMain}
                        </div>
                        <p className="read-more">ĐỌC THÊM</p>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={users.length}
        pageRangeDisplayed={6}
        onChange={handlePageChange}
        itemClass="page-item"
        linkClass="page-link"
      />
      <BackToTop />
    </>
  );
};

export default Blog;
