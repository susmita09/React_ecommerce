import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
  getProductsReducer,
  getProductDetailsReducer,
  createProductsReducer, deleteProductsReducer
} from "./reducers/productReducers";

import { cartReducer } from "./reducers/cartReducer";
 import { wishReducer } from "./reducers/wishReducer";
import { authenticationReducer } from "./reducers/authReducer";
import { getUsersReducer } from "./reducers/userReducer";
import { editOrderReducer, getOrdersReducer} from "./reducers/orderReducer";
import { getUserOrderReducer } from './reducers/userOrderReducer';
 
const rootReducer = combineReducers({
  getProducts: getProductsReducer,
  getProductDetails: getProductDetailsReducer,
  createProductsA: createProductsReducer,
  deleteProduct : deleteProductsReducer,
  editProduct : editOrderReducer,
  cart: cartReducer,
  userOrder : getUserOrderReducer,
  auth: authenticationReducer,
  users: getUsersReducer,
  ordersState: getOrdersReducer,
  wish : wishReducer
});

const persistConfig = {
  key: 'cart',
   storage,
  whitelist: ['cart','wish'] // which reducer want to store
};
const pReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

const store = createStore(
   pReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export default store;
export {persistor};
// export default persistor;
