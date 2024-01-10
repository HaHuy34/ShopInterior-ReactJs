import React, { useState } from "react";
import { Offcanvas, Table } from "react-bootstrap";
import axios from "axios";
import EditProductAddmin from "../pages/EditProductAddmin";
import useGetApi from "../hook/useGetApi";

export const ListProducts = () => {
  let [dataTable, loading] = useGetApi("http://localhost:3000/all_products");
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleClose = () => setShow(false);
  const handleEditClick = (item) => {
    setSelectedProduct(item);
    setShow(true); // Show the edit form
  };
  console.log(dataTable);
  if (loading) {
    return <div className="loader"></div>;
  }

  //Format giá
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handleDeleteClick = async (itemId) => {
    try {
      // Make an HTTP DELETE request to delete the item from the API
      const response = await axios.delete(
        `http://localhost:3000/all_products/${itemId}`
      );

      // Handle the API response here
      if (response.status === 200) {
        console.log("Item deleted successfully:", itemId);

        // Clone the current dataTable
        const updatedDataTable = [...dataTable];

        // Find the index of the item to delete
        const itemIndexToDelete = updatedDataTable.findIndex(
          (item) => item.id === itemId
        );

        // Remove the item from the cloned array
        if (itemIndexToDelete !== -1) {
          updatedDataTable.splice(itemIndexToDelete, 1);
          // Update the UI with the modified dataTable
          dataTable = updatedDataTable;
        }
      } else {
        console.error("Failed to delete item:", response);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  return (
    <>
      <div className="container-fluid">
        <Table className="addmin-edit-table">
          <thead>
            <tr>
              <th className="name-title-table" style={{ width: "100px" }}></th>
              <th className="name-title-table">Tên</th>
              <th className="name-title-table">Giá</th>
              <th className="name-title-table">Nguồn gốc</th>
              <th className="name-title-table">Số lượng</th>
              <th className="name-title-table" colSpan={1}>
                Chỉnh sửa
              </th>
            </tr>
          </thead>
          <tbody>
            {dataTable.length > 0 &&
              dataTable.map((item) => {
                console.log(item);
                return (
                  <tr className="table-row table-row--chris" key={item.id}>
                    <td>
                      <img className="table-row__img" src={item.image} alt="" />
                    </td>
                    <td className="table-row__td">
                      <div className="table-row__info">
                        <p className="table-row__name">{item.title}</p>
                      </div>
                    </td>
                    <td data-column="Policy" className="table-row__td">
                      <div className="policy">
                        <p className="table-row__policy">
                          {formatCurrency(item.price)}
                        </p>
                        <span className="table-row__small">Sale</span>
                      </div>
                    </td>
                    <td data-column="Destination" className="table-row__td">
                      Trung Quốc, Mỹ
                    </td>
                    <td data-column="Status" className="table-row__td">
                      <p class="table-row__status status--green status">
                        {item.quantity}
                      </p>
                    </td>

                    <td className="edit-data-table">
                      <i
                        className="bx bxs-pencil"
                        onClick={() => handleEditClick(item)}
                      ></i>
                      <i
                        class="bx bxs-trash"
                        onClick={() => handleDeleteClick(item.id)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Chỉnh sửa </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <EditProductAddmin selectedProduct={selectedProduct} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
