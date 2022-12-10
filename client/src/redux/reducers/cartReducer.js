import * as actionItems from "../constants/cartConstants";

const initialState = {
  cartItems: [],
  cartTotal: 0,
  cartQuantity: 0,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionItems.ADD_TO_CART:
      const productToAdd = action.payload; //{}
      const exist = state.cartItems.find(
        (prod) => prod._id === productToAdd._id
      );
      // console.log(exist);
      if (exist) {
        //item exists in cart
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === productToAdd._id
              ? { ...item, quantity: item.quantity + productToAdd.quantity }
              : item
          ),
          cartTotal:
            state.cartTotal + productToAdd.price * productToAdd.quantity,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, productToAdd],
          cartTotal:
            state.cartTotal + productToAdd.price * productToAdd.quantity,
          cartQuantity: state.cartQuantity + 1,
        };
      }

    case actionItems.REMOVE_FROM_CART:
      const item = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (product) => product._id !== item._id
        ),
        cartTotal: state.cartTotal - item.price * item.quantity,
        cartQuantity: state.cartQuantity - 1,
      };

    //CLEAR CART
    case actionItems.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
        cartTotal: 0,
        cartQuantity: 0,
      };

    //increase quantity
    case actionItems.INCREASE_QUANTITY:
      const prodToIncrease = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === prodToIncrease._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
        cartTotal: state.cartTotal + prodToIncrease.price,
      };

    // *********** DECREASE QUANTITY **********
    case actionItems.DECREASE_QUANTITY:
      const prodToDecrease = action.payload;
      //find the item to decrease from cart

      const existing = state.cartItems.find(
        (item) => item._id === prodToDecrease._id
      );
      //check if existing item quantity is 1
      if (existing.quantity === 1) {
        return {
          ...state,
          cartItems: state.cartItems.filter(
            (product) => product._id !== prodToDecrease._id
          ),
          cartTotal:
            state.cartTotal - prodToDecrease.price * prodToDecrease.quantity,
          cartQuantity: state.cartQuantity - 1,
        };
      } else {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem._id === prodToDecrease._id
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          ),
          cartTotal: state.cartTotal - prodToDecrease.price,
        };
      }

    default:
      return state;
  }
};
