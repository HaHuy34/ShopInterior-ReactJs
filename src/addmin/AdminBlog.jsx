import React, { useEffect, useState } from "react";
import "../assetss/style/addmin/AdminBlogList.css";
import { db } from "../component/firebase/FirebaseConfig";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore/lite";
import { Pagination } from "antd";
import LoadingProduct from "../component/LoadingProduct";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AdminBlog = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Số mục muốn hiển thị trên mỗi trang
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

  const removeBlogItem = async (blogId) => {
    try {
      // Xóa tài liệu từ bộ sưu tập Firestore
      await deleteDoc(doc(db, "blog", blogId));
      // Loại bỏ mục đã xóa từ trạng thái local (users)
      setUsers((prevBlog) => prevBlog.filter((user) => user.id !== blogId));
      toast.success("Đã xóa bài viết!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };
  return (
    <>
      <div
        className="admin-blog-list"
        style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 16px" }}
      >
        <div className="blog-main">
          <div
            className="container"
            style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 16px" }}
          >
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
                      </div>
                      <div className="edit-blog-item">
                        <div className="edit-add-remove">
                          <button
                            type="button"
                            class="btn btn-primary"
                            onClick={() => removeBlogItem(blog.id)}
                          >
                            Xóa
                          </button>
                          <button
                            type="button"
                            class="btn btn-warning"
                            style={{ marginRight: "10px" }}
                          >
                            Chỉnh sửa
                          </button>
                          <Link to={`${blog.id}`}>
                            <button type="button" class="btn btn-info">
                              Xem
                            </button>
                          </Link>
                        </div>
                      </div>
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
          pageRangeDisplayed={3}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    </>
  );
};

export default AdminBlog;
