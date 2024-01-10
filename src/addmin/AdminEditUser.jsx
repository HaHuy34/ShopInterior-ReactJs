import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { AutoComplete, Checkbox } from "antd";
import Form from "react-bootstrap/Form";
import "../assetss/style/addmin/CustomerManagement.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore/lite";
import { db } from "../component/firebase/FirebaseConfig";
import { ToastContainer, toast } from "react-toastify";

const AdminEditUser = () => {
  const CheckboxGroup = Checkbox.Group;
  const plainOptions = [""];
  const defaultCheckedList = ["Apple", "Orange"];
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [nguoiDung, setNguoiDung] = useState([]);

  useEffect(() => {
    // Hàm để lấy người dùng từ Firestore
    const layNguoiDung = async () => {
      const boSuuTapNguoiDung = collection(db, "UserPurchase");
      const snapshotNguoiDung = await getDocs(boSuuTapNguoiDung);

      const duLieuNguoiDung = [];
      snapshotNguoiDung.forEach((doc) => {
        duLieuNguoiDung.push({ id: doc.id, ...doc.data() });
      });

      setNguoiDung(duLieuNguoiDung);
    };

    layNguoiDung(); // Gọi hàm
  }, []);

  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;
  const onChange = (list) => {
    setCheckedList(list);
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  const handleDeleteClick = async (userId) => {
    // Thực hiện xóa tài khoản từ Firestore dựa trên userId
    try {
      // Lấy tham chiếu đến tài khoản người dùng cần xóa
      const userDocRef = doc(db, "UserPurchase", userId);

      // Xóa tài khoản
      await deleteDoc(userDocRef);

      // Cập nhật lại danh sách người dùng sau khi xóa thành công
      setNguoiDung((prevUsers) =>
        prevUsers.filter((user) => user.id !== userId)
      );

      toast.success("Đã xóa tài khoản", {
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
      console.error("Lỗi khi xóa tài khoản:", error.message);
    }
  };

  return (
    <>
      <div className="CustomerManagement">
        <div className="container">
          {/* <div className="search-us-main">
            <div className="search-user">
              <i class="bx bx-search"></i>
              <input
                type="text"
                placeholder="Tìm kiếm theo mã khách hàng, tên , SĐT khách hàng "
              />
            </div>
            <div className="filter-forem">
              <Form.Select aria-label="Default select example">
                <option>Bộ lọc</option>
                <option value="1">Khách hàng lâu năm</option>
                <option value="2">Khách hàng mới</option>
              </Form.Select>
              <i class="bx bx-filter-alt"></i>
            </div>
          </div> */}

          <Table>
            <thead>
              <tr className="abs-cus">
                <th className="check-boxx-table">
                  <Checkbox
                    indeterminate={indeterminate}
                    onChange={onCheckAllChange}
                  ></Checkbox>
                </th>
                <th>Mã khách hàng</th>
                <th>Tên khách hàng</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Trạng thái</th>
                <th>Chỉnh sửa</th>
              </tr>
            </thead>
            {nguoiDung.length > 0 ? (
              <tbody className="user-table">
                {nguoiDung.map((nguoidung, index) => (
                  <tr key={index}>
                    <td>
                      <CheckboxGroup
                        options={plainOptions}
                        value={checkedList}
                        onChange={onChange}
                      />
                    </td>
                    <td className="code-user">
                      {nguoidung.id.substring(0, 7)}
                    </td>
                    <td>{nguoidung.lastName}</td>
                    <td>{nguoidung.phone}</td>
                    <td>{nguoidung.email}</td>
                    <td>
                      <div className="badge badge-light-primary">Hoạt động</div>
                    </td>
                    <td>
                      <i
                        class="bx bxs-trash"
                        style={{ color: "#03bad1" }}
                        onClick={() => handleDeleteClick(nguoidung.id)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="7">
                    <h3>Danh sách người dùng trống</h3>
                  </td>
                </tr>
              </tbody>
            )}
          </Table>
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

export default AdminEditUser;
