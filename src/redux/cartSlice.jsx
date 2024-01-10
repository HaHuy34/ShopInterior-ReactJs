import { createSlice, createSelector } from "@reduxjs/toolkit";
const ite =
  localStorage.getItem("cartItem") != null
    ? JSON.parse(localStorage.getItem("cartItem"))
    : [];
const quantity =
  localStorage.getItem("quantity") != null
    ? JSON.parse(localStorage.getItem("quantity"))
    : [];
const total =
  localStorage.getItem("total") != null
    ? JSON.parse(localStorage.getItem("total"))
    : [];
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: ite,
    quantity: quantity,
    total: total,
  },
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.total = existingItem.quantity * existingItem.price;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          total: action.payload.price,
        });
      }

      localStorage.setItem(
        "cartItem",
        JSON.stringify(state.items.map((item) => item))
      );
      localStorage.setItem("quantity", JSON.stringify(state.quantity));
      // localStorage.total("total", JSON.stringify(state.total));
    },
    decreaseQuantity: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity = Math.max(1, existingItem.quantity - 1);
        existingItem.total = existingItem.quantity * existingItem.price;
      }
    },
    removeItem: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      localStorage.removeItem("cartItem");
    },

    updateQuantities: (state, action) => {
      state.quantities = action.payload;
    },
    updateTotalPrice: (state) => {
      const shippingFee = 30000;
      const totalQuantity = state.items.reduce(
        (total, item) => total + state.quantities[item.id],
        0
      );
      state.totalCartPrice =
        totalQuantity > 0 ? state.totalCartPrice + shippingFee : 0;
    },
  },
});

export const {
  addToCart,
  decreaseQuantity,
  removeItem,
  updateQuantities,
  updateTotalPrice,
} = cartSlice.actions;

export const selectProductQuantityById = (state, productId) => {
  const item = state.cart.items.find((item) => item.id === productId);
  return item ? item.quantity : 0;
};

export const selectCartItems = (state) => state.cart.items;

export const selectCartQuantities = (state) => state.cart.quantities; // Selector để lấy thông tin số lượng

export const selectCartTotalItems = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0)
);
export const selectCartTotalPrice = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.total, 0)
);

export default cartSlice.reducer;
