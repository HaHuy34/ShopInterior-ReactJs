import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { AutoComplete, Checkbox } from "antd";
import Form from "react-bootstrap/Form";
import "../assetss/style/addmin/CustomerManagement.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const CustomerManagement = () => {
  const CheckboxGroup = Checkbox.Group;
  const plainOptions = [""];
  const defaultCheckedList = ["Apple", "Orange"];
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  // const checkAll = plainOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;
  const onChange = (list) => {
    setCheckedList(list);
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  //Format giá
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const options = [
    {
      value: "Đang xử lý",
    },
    {
      value: "Đã giao hàng cho đơn vị vận chuyển",
    },
    {
      value: "Đang vận chuyển tới bạn",
    },
    {
      value: "Giao hàng thành công ",
    },
  ];
  return (
    <>
      <div className="CustomerManagement">
        <div className="container">
          <div className="search-us-main">
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
                {/* <option value="3">Three</option> */}
              </Form.Select>
              <i class="bx bx-filter-alt"></i>
            </div>
          </div>

          <Table>
            <thead>
              <tr className="abs-cus">
                <th className="check-boxx-table">
                  <Checkbox
                    indeterminate={indeterminate}
                    onChange={onCheckAllChange}
                    // checked={checkAll}
                  ></Checkbox>
                  {/* <Divider /> */}
                  {/* <CheckboxGroup
                    options={plainOptions}
                    value={checkedList}
                    onChange={onChange}
                  /> */}
                </th>
                <th>Mã khách hàng</th>
                <th>Tên khách hàng</th>
                <th>Số điện thoại</th>
                <th>Trạng thái</th>
                <th>Tổng chi tiêu</th>
                <th>Tổng đơn hàng</th>
              </tr>
            </thead>
            <tbody className="user-table">
              <tr>
                <td>
                  <CheckboxGroup
                    options={plainOptions}
                    value={checkedList}
                    onChange={onChange}
                  />
                </td>
                <td className="code-user">HTKMRE541</td>
                <td>Hà Văn Huy</td>
                <td>0934534532</td>
                <td>
                  <AutoComplete
                    style={{
                      width: 200,
                    }}
                    options={options}
                    placeholder="Trạng thái đơn hàng"
                    filterOption={(inputValue, option) =>
                      option.value
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                    }
                  />
                </td>
                <td>{formatCurrency(30000000)}</td>
                <td>5</td>
              </tr>
            </tbody>
          </Table>
          <Stack spacing={1}>
            <Pagination count={10} showFirstButton showLastButton />
          </Stack>
        </div>
      </div>
    </>
  );
};

export default CustomerManagement;
