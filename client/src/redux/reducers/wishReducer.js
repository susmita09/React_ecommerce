import * as actionItems from "../constants/wishConstants";

const initialState = {
  wishList: [],
  count : 0,
  status : false
   
};

export const wishReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionItems.ADD_TO_WISH:
      const productToAdd = action.payload; //{}
      const exist = state.wishList.find(
        (prod) => prod._id === productToAdd._id
      );
      // console.log(exist);
      if (exist) {
        //item exists in cart
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          wishList: [...state.wishList, productToAdd],
           status : true,
           count : state.wishList.length +1
        };
      }

    case actionItems.REMOVE_FROM_WISH:
      const item = action.payload;
      return {
        ...state,
        wishList: state.wishList.filter(
          (product) => product._id !== item._id
        ),
        count : state.wishList.length -1
      };

      default:
        return state;
    }
  };