import { Link } from "react-router-dom";
import Header from "../../Components/Website/Header";
import "../../Css/base/Basket.css";
import { useContext, useEffect, useState } from "react";
import { Cart } from "../../Context/CartChangerContext";

export default function Basket() {
  const [products, setProducts] = useState([]);
  const { setIsChange } = useContext(Cart);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("product")) || [];
    setProducts(storedProducts);
  }, []);

  function handleIncrease(id) {
    const updatedProducts = products.map((product) =>
      product._id === id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
    setProducts(updatedProducts);
    localStorage.setItem("product", JSON.stringify(updatedProducts));
    setIsChange((prev) => !prev);
  }

  function handleDecrease(id) {
    const updatedProducts = products.map((product) =>
      product._id === id && product.quantity > 1
        ? { ...product, quantity: product.quantity - 1 }
        : product
    );
    setProducts(updatedProducts);
    localStorage.setItem("product", JSON.stringify(updatedProducts));
    setIsChange((prev) => !prev);
  }

  function handleRemoveProduct(id) {
    const updatedProducts = products.filter((product) => product._id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("product", JSON.stringify(updatedProducts));
    setIsChange((prev) => !prev);
  }

  return (
    <div className="basket-shop">
      <Header />
      <div className="container basket-items">
        <div className="tabble">
          <table className="table-items">
            <thead>
              <tr>
                <th>Product Image</th>
                <th>Title</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(products) && products.length > 0 ? (
                products.map((product, index) => (
                  <tr key={index}>
                    <td>
                      <img src={product.imageCover} alt={product.title} />
                    </td>
                    <td>{product.title}</td>
                    <td>{product.description || "No description available"}</td>
                    <td>
                      <button onClick={() => handleDecrease(product._id)}>
                        ➖
                      </button>
                      <span>{product.quantity}</span>
                      <button onClick={() => handleIncrease(product._id)}>
                        ➕
                      </button>
                    </td>
                    <td>{product.price} EGP</td>
                    <td>
                      <button onClick={() => handleRemoveProduct(product._id)}>
                        ❌
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No products in the cart.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="checkout">
          <div>
            <span>SubTotal</span>
            <span>
              {products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              )}{" "}
              EGP
            </span>
          </div>
          <div>
            <span>Total</span>
            <span>
              {products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              )}{" "}
              EGP
            </span>
          </div>
          <div className="discount">
            <input type="text" placeholder="Discount Code..." />
            <button className="btn-input">Apply</button>
          </div>
          <Link to="/basket/checkout" className="apply">
            Check Out
          </Link>

          <div className="or">
            <Link to="/">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
