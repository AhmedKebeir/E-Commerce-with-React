import { data, Link } from "react-router-dom";
import image from "../../Images/ELEGANT_ESSENTIALS_circle_resized.png";
import "../../Css/component/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faPhone,
  faBars,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { use, useContext, useEffect, useState } from "react";
import Search from "./Search";
import axios from "axios";
// import { WindowSize } from "../../Context/WindowContext";
import { Cart } from "../../Context/CartChangerContext";
import Cookie from "cookie-universal";
import { baseUrl, GETUSER } from "../../Api/Api";

export default function Header() {
  const [link, setLink] = useState(false);
  const [products, setProducts] = useState([]);
  const { isChange } = useContext(Cart);
  const [user, setUser] = useState("");
  const cookie = Cookie();
  const token = cookie.get("e-commerce") || "";
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    if (!token) {
      console.warn("🚨 No token found! User might be logged out.");
      setUser("");
      return;
    }

    axios
      .get(`${baseUrl}/${GETUSER}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((data) => setUser(data.data.data))
      .catch((error) => {
        console.error("Error fetching user:", error);
        if (error.response && error.response.status === 401) {
          console.warn("🚨 Unauthorized! Token might be invalid.");
        }
      });
  }, [logout]);

  const [mobileLinksStyle, setMobileLinksStyle] = useState({
    width: "0",
    padding: "0",
  });

  const handleMenuClick = () => {
    setMobileLinksStyle({
      width: "100%",
      left: "0px",
    });
    setLink(!link);
  };
  const closeMenuClick = () => {
    setMobileLinksStyle({
      width: "0",
      left: "-40px",
    });
  };

  useEffect(() => {
    const getProducts = JSON.parse(localStorage.getItem("product")) || [];
    setProducts(getProducts);
  }, [isChange]);

  const totalQuantity = products.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  function handleLogOut() {
    cookie.remove("e-commerce");
    setLogout((prev) => !prev);
    // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
  }
  return (
    <header>
      <div className="mobile-links" style={{ ...mobileLinksStyle }}>
        <div className="display">
          <Link to="/">
            <img src={image} alt="logo" />
          </Link>
          <FontAwesomeIcon icon={faX} onClick={closeMenuClick} />
        </div>
        <Search />
        <ul className="links-mobile">
          <li>
            <Link to="/">Home</Link>
          </li>
          {user.role === "admin" ? (
            <li>
              <Link to="/dashboard/products">Dashboard</Link>
            </li>
          ) : (
            ""
          )}
          <li>
            <Link to="/feedback">Feedback</Link>
          </li>
          <li>
            <Link to="/myorders">My Orders</Link>
          </li>
        </ul>
        <div className="auth">
          {user !== "" ? (
            <button className="logout" onClick={handleLogOut}>
              Log Out
            </button>
          ) : (
            <>
              <Link to="/register" className="btn">
                Sign up
              </Link>
              <Link to="/login" className="btn">
                Log in
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={image} alt="logo" />
          </Link>
          <FontAwesomeIcon icon={faBars} onClick={handleMenuClick} />
        </div>
        <ul className="links-first">
          <li>
            <Link to="/">Home</Link>
          </li>
          {user.role === "admin" ? (
            <li>
              <Link to="/dashboard/products">Dashboard</Link>
            </li>
          ) : (
            ""
          )}
          <li>
            <Link to="/feedback">Feedback</Link>
          </li>
          <li>
            <Link to="/myorders">My Orders</Link>
          </li>
        </ul>
        {link && (
          <ul className="links">
            <li>
              <Link to="/">Home</Link>
            </li>
            {user.role === "admin" ? (
              <li>
                <Link to="/dashboard/products">Dashboard</Link>
              </li>
            ) : (
              ""
            )}

            <li>
              <Link to="/feedback">Feedback</Link>
            </li>
            <li>
              <Link to="/myorders">My Orders</Link>
            </li>
          </ul>
        )}
        <div className="content">
          <Search />
        </div>
        <div className="auth">
          <div className="phone">
            <FontAwesomeIcon icon={faPhone} />
            {/* 01277508441 */}
          </div>
          <Link to="/basket" className="basket-icone">
            <div className="basket">
              <FontAwesomeIcon icon={faCartShopping} />

              <span className="number-basket">{totalQuantity}</span>
            </div>
          </Link>
          {user !== "" ? (
            <button className="logout" onClick={handleLogOut}>
              Log Out
            </button>
          ) : (
            <>
              <Link to="/register" className="btn">
                Sign up
              </Link>
              <Link to="/login" className="btn">
                Log in
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
