import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faUser,
  faShop,
  faUsers,
  faCartShopping,
  faChartBar,
  faComment,
  faLayerGroup,
  faBook,
  faList,
} from "@fortawesome/free-solid-svg-icons";
export default function SideBar() {
  return (
    <div className="sidebar bg-white p-20 p-relative">
      <h3 className="p-relative txt-c mt-0">
        <FontAwesomeIcon icon={faChartBar} /> <span>Dashboard</span>
      </h3>
      <ul>
        <li>
          <NavLink
            className="d-flex align-center fs-14 c-black rad-6 p-10"
            to="products"
          >
            <FontAwesomeIcon icon={faShop} />
            <span>Products</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className="d-flex align-center fs-14 c-black rad-6 p-10"
            to="categories"
          >
            <FontAwesomeIcon icon={faLayerGroup} />
            <span>Categories</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className="d-flex align-center fs-14 c-black rad-6 p-10"
            to="subcategories"
          >
            <FontAwesomeIcon icon={faList} />
            <span>SubCategories</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className="d-flex align-center fs-14 c-black rad-6 p-10"
            to="brands"
          >
            <FontAwesomeIcon icon={faBook} />
            <span>Brands</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className="d-flex align-center fs-14 c-black rad-6 p-10"
            to="/dashboard/users"
          >
            <FontAwesomeIcon icon={faUsers} />
            <span>Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className="d-flex align-center fs-14 c-black rad-6 p-10"
            to="/dashboard/orders"
          >
            <FontAwesomeIcon icon={faCartShopping} />
            <span>Orders</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/feedback"
            className="d-flex align-center fs-14 c-black rad-6 p-10"
          >
            <FontAwesomeIcon icon={faComment} />
            <span>Feedbacks</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className="d-flex align-center fs-14 c-black rad-6 p-10 "
            to="profile.html"
          >
            <FontAwesomeIcon icon={faUser} />
            <span>Profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className="d-flex align-center fs-14 c-black rad-6 p-10"
            to="settings.html"
          >
            <FontAwesomeIcon icon={faGear} />
            <span>Settings</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
