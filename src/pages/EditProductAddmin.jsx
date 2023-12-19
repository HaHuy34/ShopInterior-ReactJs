import React from "react";
import { Controller, useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { FormGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";

const EditProductAddmin = ({ selectedProduct }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      image: selectedProduct?.image || "",
      title: selectedProduct?.title || "",
      price: selectedProduct?.price || "",
      category: selectedProduct?.description || "",
    },
  });

  const onSubmit = async (data, e) => {
    try {
      e.preventDefault();
      // Thực hiện yêu cầu HTTP PUT để cập nhật API với dữ liệu đã chỉnh sửa
      const response = await axios.put(
        `http://localhost:3000/all_products/${selectedProduct.id}`,
        data
      );
      console.log(response);

      // Xử lý phản hồi API
      if (response.status === 200) {
        console.log("Product updated successfully:", response.data);
        // Thực hiện các hành động khác như hiển thị thông báo thành công cho người dùng
      } else {
        console.error("Failed to update product:", response);
        //  Xử lý các tình huống lỗi, ví dụ: hiển thị thông báo lỗi cho người dùng
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Ảnh</Form.Label>

          <Controller
            control={control}
            name="image"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Form.Control
                {...field}
                type="text"
                placeholder="Đường dẫn ảnh"
              />
            )}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tên sản phẩm</Form.Label>

          <Controller
            control={control}
            name="title"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Form.Control
                {...field}
                type="text"
                placeholder="Nhập tên sản phẩm"
              />
            )}
          />
          {errors.title && <p>Ten SP khong duoc de trong!</p>}
        </Form.Group>

        <FormGroup className="mb-3">
          <Form.Label>Giá</Form.Label>
          <Controller
            control={control}
            name="price"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Form.Control
                {...field}
                type="price"
                placeholder="Nhập giá sản phẩm"
              />
            )}
          />
        </FormGroup>

        <FormGroup className="mb-3">
          <Form.Label>Chi tiết về sản phẩm</Form.Label>
          <Controller
            control={control}
            name="category"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Form.Control
                {...field}
                type="category"
                placeholder="Nhập chi tiết về sản phẩm "
              />
            )}
          />
        </FormGroup>

        <Button variant="primary" type="submit">
          Cập Nhật
        </Button>
      </Form>
    </>
  );
};

export default EditProductAddmin;
