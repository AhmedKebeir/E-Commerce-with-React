import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import HomePage from "./Pages/Website/HomePage";

import Basket from "./Pages/Website/Basket";
import CheckOut from "./Pages/Website/CheckOut";
import Dashboard from "./Pages/Dashboard/Dashboard";
import RequireAuth from "./Pages/Auth/RequireAuth";
import Users from "./Pages/Dashboard/Users";
import Products from "./Pages/Dashboard/Products";
import CreateProduct from "./Pages/Dashboard/CreateProduct";
import EditProduct from "./Pages/Dashboard/EditProduct";
import Categories from "./Pages/Dashboard/Category/Categories";
import CreateCategory from "./Pages/Dashboard/Category/CreateCategory";
import EditCategory from "./Pages/Dashboard/Category/EditCategory";
import Brands from "./Pages/Dashboard/Brands/Brands";
import CreateBrands from "./Pages/Dashboard/Brands/CreateBrand";
import EditBrand from "./Pages/Dashboard/Brands/EditBrand";
import SubCategories from "./Pages/Dashboard/SubCategories/SubCategories";
import EditSubCategory from "./Pages/Dashboard/SubCategories/EditSubCategory";
import CreateSubCategory from "./Pages/Dashboard/SubCategories/CreateSubCategory";
import SingleProduct from "./Pages/Website/SingleProduct/SingleProduct";
import RequireAuthUsers from "./Pages/Auth/RequireAuthUsers";
import FeedbackForProduct from "./Pages/Website/Feedbacks/FeedbackForProduct";
import Feedbacks from "./Pages/Website/Feedbacks/Feedbacks";
import MyOrders from "./Pages/Website/MyOrders";
import Orders from "./Pages/Dashboard/Orders/Orders";
import DetailsOrder from "./Pages/Dashboard/Orders/DetailsOrder";
import AllFeedback from "./Pages/Dashboard/FeedbackDash/AllFeedback";
import UpdateFeedback from "./Pages/Dashboard/FeedbackDash/UpdateFeedback";
import DetailsMyOrders from "./Pages/Website/DetailsMyOrder";
import Err403 from "./Pages/Auth/403";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/Error404" element={<Err403 />} />
        <Route element={<RequireAuthUsers />}>
          <Route path="/basket/checkout" element={<CheckOut />} />
          <Route
            path="/feedback/product/:id"
            element={<FeedbackForProduct />}
          />
          <Route path="feedback" element={<Feedbacks />} />
          <Route path="myorders" element={<MyOrders />} />
          <Route path="myorders/:id" element={<DetailsMyOrders />} />
        </Route>

        {/* Protected Route  */}
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="products" element={<Products />} />
            <Route path="products/create" element={<CreateProduct />} />
            <Route path="products/:id" element={<EditProduct />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/create" element={<CreateCategory />} />
            <Route path="categories/:id" element={<EditCategory />} />
            <Route path="brands" element={<Brands />} />
            <Route path="brands/create" element={<CreateBrands />} />
            <Route path="brands/:id" element={<EditBrand />} />
            <Route path="subcategories" element={<SubCategories />} />
            <Route
              path="subcategories/create"
              element={<CreateSubCategory />}
            />
            <Route path="subcategories/:id" element={<EditSubCategory />} />

            <Route path="users" element={<Users />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<DetailsOrder />} />
            <Route path="feedback" element={<AllFeedback />} />
            <Route path="feedback/:id" element={<UpdateFeedback />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
