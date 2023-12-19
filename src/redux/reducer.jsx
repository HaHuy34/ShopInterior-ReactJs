const initialState = {
  cartCount: 0,
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartCount: state.cartCount + 1,
        cartItems: [...state.cartItems, action.payload],
      };
    case "REMOVE_ITEM_FROM_CART":
      // Xử lý xóa sản phẩm khỏi giỏ hàng
      const updatedCartItems = [...state.cartItems];
      updatedCartItems.splice(action.payload, 1);
      return {
        ...state,
        cartItems: updatedCartItems,
      };

      
    default:
      return state;
  }
};

export default cartReducer;
