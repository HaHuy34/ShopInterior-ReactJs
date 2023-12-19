import React, { createContext, useContext, useState } from "react";

// Tạo Context
const ProductContext = createContext();

// Tạo Provider
export function ProductProvider({ children }) {
  const [productInfo, setProductInfo] = useState({
    image: "",
    title: "",
    price: 0,
    quantity: 0,
  });

  return (
    <ProductContext.Provider value={{ productInfo, setProductInfo }}>
      {children}
    </ProductContext.Provider>
  );
}

// Tạo một hook tùy chỉnh để sử dụng Context
export function useProduct() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
}
