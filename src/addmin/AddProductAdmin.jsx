import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore/lite";
import "../assetss/style/addmin/AddProductAdmin.css";
import { db } from "../component/firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AddProductAdmin = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [priceNew, setPriceNew] = useState("");
  const [priceOld, setPriceOld] = useState("");
  const [count, setCount] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [source, setSource] = useState("");
  const [rating, setRating] = useState("");
  const [code, setCode] = useState("");
  const [detailProduct, setDetailProuct] = useState("");

  const submit = async () => {
    // Kiểm tra tất cả các trường có giá trị không
    if (
      !name ||
      !priceNew ||
      !priceOld ||
      !count ||
      !imageUrl ||
      !source ||
      !rating ||
      !code ||
      !detailProduct
    ) {
      // Hiển thị thông báo nếu có trường nào đó trống
      toast.error("Vui lòng điền đầy đủ thông tin", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return; // Ngăn chặn việc thực hiện tiếp theo nếu có trường trống
    }
    // Thêm sản phẩm mới với id được tạo.
    try {
      await addDoc(collection(db, "products"), {
        title: name,
        price: Number(priceNew),
        del: Number(priceOld),
        quantity: Number(count),
        image: imageUrl,
        source: source,
        rating: Number(rating),
        code: Number(code),
        description: detailProduct,
      });
      toast.success("Đã thêm sản phẩm mới", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/addmin");
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      toast.error("Đã thêm sản phẩm mới", {
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
  };

  const backListProduct = () => {
    navigate("/addmin");
  };
  return (
    <>
      <div className="AddProductAdmin">
        <div class="container">
          <div class="row gutters">
            <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
              <div class="card h-100">
                <div class="card-body">
                  <div class="account-settings">
                    <div class="user-profile">
                      <div class="user-avatar">
                        <img
                          src={
                            imageUrl ||
                            "https://www.pngkey.com/png/full/115-1152868_png-white-plus-sign-vector-transparent-library-plus.png"
                          }
                          alt="Maxwell Admin"
                        />
                      </div>
                      <h5 class="user-name">Ảnh sản phẩm</h5>
                      <h6 class="user-email">
                        Đặt hình ảnh thu nhỏ của sản phẩm. Chỉ chấp nhận các tệp
                        hình ảnh *.png, *.jpg và *.jpeg
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
              <div class="card h-100">
                <div class="card-body">
                  <div class="row gutters">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <h6 class="mb-2 text-primary">Chi tiết sản phẩm</h6>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div class="form-group">
                        <label for="fullName">Tên Sản Phẩm</label>
                        <input
                          type="text"
                          class="form-control"
                          id="fullName"
                          placeholder="Tên sản phẩm"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div class="form-group">
                        <label for="fullName">Mã sản phẩm</label>
                        <input
                          type="number"
                          class="form-control"
                          id="fullName"
                          placeholder="Mã sản phẩm"
                          value={code}
                          onChange={(e) => {
                            setCode(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div class="form-group">
                        <label for="eMail">Số lượng</label>
                        <input
                          type="number"
                          value={count}
                          onChange={(e) => {
                            setCount(e.target.value);
                          }}
                          class="form-control"
                          id="eMail"
                          placeholder="Số lượng sản phẩm muốn thêm"
                        />
                      </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div class="form-group">
                        <label for="phone">Giá bán</label>
                        <input
                          type="number"
                          class="form-control"
                          id="phone"
                          placeholder="giá bán sản phẩm"
                          value={priceNew}
                          onChange={(e) => {
                            setPriceNew(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div class="form-group">
                        <label for="phone">Giá cũ</label>
                        <input
                          type="number"
                          class="form-control"
                          id="phone"
                          placeholder="Giá cũ sản phẩm"
                          value={priceOld}
                          onChange={(e) => {
                            setPriceOld(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div class="form-group">
                        <label for="website">Mô tả sản phẩm</label>
                        <input
                          type="text"
                          class="form-control"
                          id="website"
                          placeholder="Mô tả chi tiết về sản phảm"
                          value={detailProduct}
                          onChange={(e) => {
                            setDetailProuct(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div class="form-group">
                        <label for="website">Nguồn gốc</label>
                        <input
                          type="text"
                          class="form-control"
                          id="website"
                          placeholder="Nguồn gốc sản phảm"
                          value={source}
                          onChange={(e) => {
                            setSource(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div class="form-group">
                        <label for="website">Xếp hạng</label>
                        <input
                          type="number"
                          class="form-control"
                          id="website"
                          placeholder="Xếp hạng sản phảm"
                          value={rating}
                          onChange={(e) => {
                            setRating(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div class="form-group">
                        <label for="website">Url ảnh sản phẩm</label>
                        <input
                          type="url"
                          class="form-control"
                          id="website"
                          placeholder="Địa chỉ ảnh sản phẩm muốn thêm"
                          value={imageUrl}
                          onChange={(e) => {
                            setImageUrl(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row gutters" style={{ paddingTop: "0px" }}>
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div class="text-right">
                        <button
                          onClick={backListProduct}
                          type="button"
                          id="submit"
                          name="submit"
                          class="btn btn-secondary"
                          style={{ margin: "0px 15px" }}
                        >
                          Bỏ thao tác
                        </button>
                        <button
                          type="button"
                          id="submit"
                          name="submit"
                          class="btn btn-primary"
                          onClick={() => {
                            submit();
                          }}
                        >
                          Thêm sản phẩm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

export default AddProductAdmin;
