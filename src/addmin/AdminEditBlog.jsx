import React, { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore/lite";
import { db } from "../component/firebase/FirebaseConfig";
import "../assetss/style/addmin/AddProductAdmin.css";
import { useNavigate, useParams } from "react-router-dom";
const AdminEditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [ename, setEName] = useState("");
  const [priceNew, setPriceNew] = useState("");
  const [epriceNew, setEPriceNew] = useState("");
  const [priceOld, setPriceOld] = useState("");
  const [epriceOld, setEPriceOld] = useState("");
  const [count, setCount] = useState("");
  const [ecount, setECount] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [eimageUrl, setEImageUrl] = useState("");
  const [source, setSource] = useState("");
  const [esource, setESource] = useState("");
  const [rating, setRating] = useState("");
  const [erating, setERating] = useState("");
  const [code, setCode] = useState("");
  const [ecode, setECode] = useState("");
  const [detailProduct, setDetailProuct] = useState("");
  const [edetailProduct, setEDetailProuct] = useState("");
  const decRef = doc(db, "products", id);

  const getd = async () => {
    const userSnapShot = await getDoc(decRef);
    setEName(userSnapShot.data().title);
    setEPriceNew(userSnapShot.data().price);
    setEPriceOld(userSnapShot.data().del);
    setECount(userSnapShot.data().quantity);
    setEImageUrl(userSnapShot.data().image);
    setESource(userSnapShot.data().source);
    setERating(userSnapShot.data().rating);
    setECode(userSnapShot.data().code);
    setEDetailProuct(userSnapShot.data().description);
  };

  getd();

  const submit = async () => {
    await updateDoc(decRef, {
      title: name,
      price: Number(priceNew),
      del: Number(priceOld),
      quantity: Number(count),
      image: imageUrl,
      source: source,
      rating: Number(rating),
      code: Number(code),
      description: detailProduct,
      // imageChild: imageChild,
    });
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
                        <img src={imageUrl || eimageUrl} alt="Maxwell Admin" />
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
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          placeholder={ename}
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
                          value={code}
                          onChange={(e) => {
                            setCode(e.target.value);
                          }}
                          placeholder={ecode}
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
                          placeholder={ecount}
                          class="form-control"
                          id="eMail"
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
                          value={priceNew}
                          onChange={(e) => {
                            setPriceNew(e.target.value);
                          }}
                          placeholder={epriceNew}
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
                          value={priceOld}
                          onChange={(e) => {
                            setPriceOld(e.target.value);
                          }}
                          placeholder={epriceOld}
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
                          value={detailProduct}
                          onChange={(e) => {
                            setDetailProuct(e.target.value);
                          }}
                          placeholder={edetailProduct}
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
                          value={source}
                          onChange={(e) => {
                            setSource(e.target.value);
                          }}
                          placeholder={esource}
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
                          value={rating}
                          onChange={(e) => {
                            setRating(e.target.value);
                          }}
                          placeholder={erating}
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
                          value={imageUrl}
                          onChange={(e) => {
                            setImageUrl(e.target.value);
                          }}
                          placeholder={eimageUrl}
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row gutters">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div class="text-right">
                        <button
                          onClick={backListProduct}
                          type="button"
                          id="submit"
                          name="submit"
                          class="btn btn-secondary"
                          style={{ margin: "0 15px" }}
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
                          Cập nhật
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
    </>
  );
};

export default AdminEditBlog;
