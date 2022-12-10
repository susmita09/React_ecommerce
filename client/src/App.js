import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Detailproduct from "./pages/Detailproduct";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CartPage from "./pages/CartPage";
import CheckOutSuccess from "./pages/CheckOutSuccess";
import Admin from "./pages/Admin";
import Product from "./component/admin_component/Product";
import Summary from "./component/admin_component/Summary";
import CreateProduct from "./component/admin_component/CreateProduct";
import Orders from "./component/admin_component/Orders";
import User from "./component/admin_component/User";
import ProductTable from "./component/admin_component/List/ProductList";
import DetailOrder from "./component/DetailOrder";
import OrderPage from "./pages/OrderPage";

function App() {
  const user = false; //id variable
  return (
    // <div className="App">

    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Detailproduct />} />
        <Route path="/order/:id" element={ <DetailOrder />} />
        <Route path="/userorder" element={<OrderPage/>} />
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" replace /> : <Register />}
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout-success" element={<CheckOutSuccess />} />

        {/* nested routhes Admin */}
        <Route path="/admin" element={<Admin />}>
          <Route path="products" element={<Product />}>
            <Route index element={<ProductTable />} />
            <Route path="create-product" element={<CreateProduct />} />
          </Route>
          <Route path="Summary" element={<Summary />} />
          <Route path="Orders" element={<Orders />} />
          <Route path="users" element={<User />} />
        </Route>
        {/* end of admin routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
