import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Cart } from "../../Context/CartChangerContext";
import axios from "axios";
import { baseUrl, PRODUCTS } from "../../Api/Api";

export default function ProductBox({ id, Url, title, description, sold }) {
  const { setIsChange } = useContext(Cart);
  const [addedToCart, setAddedToCart] = useState(false);
  const [product, setProduct] = useState(null);

  // جلب بيانات المنتج عند تحميل المكون
  useEffect(() => {
    axios
      .get(`${baseUrl}/${PRODUCTS}/${id}`)
      .then((response) => setProduct(response.data.data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  const handleSave = () => {
    if (!product || !product._id) {
      console.error("Product is undefined, cannot save.");
      return;
    }

    let cartItems;
    try {
      cartItems = JSON.parse(localStorage.getItem("product")) || [];
    } catch (error) {
      console.error("Error parsing localStorage:", error);
      cartItems = [];
    }

    // البحث عن المنتج داخل السلة
    const existingProduct = cartItems.find((item) => item._id === product._id);

    if (existingProduct) {
      existingProduct.quantity += 1; // زيادة العداد عند وجود المنتج بالفعل
    } else {
      cartItems.push({ ...product, quantity: 1 }); // إضافة المنتج الجديد مع counter = 1
    }

    // تحديث `localStorage`
    localStorage.setItem("product", JSON.stringify(cartItems));

    // تحديث `cartItems` في `Context`
    setIsChange((prev) => !prev);
  };

  return (
    <div className="box">
      <Link to={`/product/${id}`}>
        <img src={Url || "fallback-image.jpg"} alt={title || "Product"} />
        <div className="content">
          <h3>{title || "No Title Available"}</h3>
          <p>{description || "No description available."}</p>
        </div>
      </Link>
      <div className="info">
        <Link to={`feedback/product/${id}`}>Add Review</Link>
        {sold === true ? (
          <span style={{ color: "red" }}>Sold</span>
        ) : (
          <FontAwesomeIcon
            icon={faCartShopping}
            className={addedToCart ? "added-to-cart" : ""}
            onClick={handleSave}
          />
        )}
      </div>
    </div>
  );
}
