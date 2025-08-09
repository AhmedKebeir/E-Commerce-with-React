import { Link, useNavigate } from "react-router-dom";
import Header from "../../Components/Website/Header";
import "../../Css/base/CheckOut.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, ORDERS } from "../../Api/Api";
import Cookie from "cookie-universal";

export default function CheckOut() {
  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  const nav = useNavigate();
  const [err, setErr] = useState("");
  const cities = [
    "Cairo",
    "Alexandria",
    "Giza",
    "Luxor",
    "Aswan",
    "Hurghada",
    "Sharm El-Sheikh",
    "Port Said",
    "Ismailia",
    "Suez",
  ];

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    phone: "01",
    street: "",
    city: "",
    payment: "",
  });

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("product")) || [];
    setProducts(storedProducts);
  }, []);

  async function handelSubmit(e) {
    e.preventDefault();
    console.log(products);

    const data = {
      cartItems: products.map((p) => ({
        product: p._id,
        quantity: p.quantity,
        // color: p.color || "",
      })),
      shippingAddress: {
        address: form.street || "",
        phone: form.phone || "",
        city: form.city || "",
        paymentMethodType: form.payment || "",
      },
    };
    console.log(data);
    try {
      const res = await axios.post(`${baseUrl}/orders/cashOrder`, data, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      if (res.status === 201) {
        window.localStorage.removeItem("product");
        nav("/", { replace: true });
      }
    } catch (err) {
      // setErr("Error:", err.response ? err.response.message : err.message);
      nav();
    }
  }

  // console.log(setErr);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  console.log(form);
  return (
    <>
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
                      <span>{product.quantity}</span>
                    </td>
                    <td>{product.price} EGP</td>
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

        <div className="checkout-fin">
          <div className="container">
            <form onSubmit={handelSubmit}>
              <div className="tel">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Enter Your Phone Number..."
                  value={form.phone}
                  onChange={(e) => {
                    // السماح بالأرقام فقط
                    const onlyNumbers = e.target.value.replace(/\D/g, "");
                    if (onlyNumbers.length <= 11) {
                      handleChange({
                        target: { name: "phone", value: onlyNumbers },
                      });
                    }
                  }}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, ""); // منع الأحرف غير الرقمية
                  }}
                  pattern="[0-9]{11}"
                  minLength={11}
                  maxLength={11}
                  required
                />
                <label htmlFor="phone">Phone:</label>
              </div>
              <div className="street">
                <input
                  type="text"
                  name="street"
                  id="street"
                  placeholder="Street and Number..."
                  required
                  value={form.street}
                  onChange={handleChange}
                />
                <label htmlFor="street">Street and Number:</label>
              </div>
              <div className="city">
                <label htmlFor="city">Select Your City:</label>
                <select
                  id="city"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                >
                  <option value={form.payment}>-- Choose a City --</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <div className="city">
                <label htmlFor="payment">Select type payment:</label>
                <select
                  id="payment"
                  name="payment"
                  value={form.payment}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Choose a payment --</option>
                  <option value="cash">Cash</option>
                  <option value="InstaPay">InstaPay</option>
                </select>
              </div>
              {form.payment === "InstaPay" ? (
                <>
                  <p className="insta-phone">
                    This is InstaPay number:01015738335
                  </p>
                  <p className="insta-phone">
                    :ابعت صورة التحويل على الواتساب
                    <br />
                    01015738335
                  </p>
                </>
              ) : (
                ""
              )}
              <div className="country">
                <input
                  type="text"
                  name="country"
                  id="country"
                  value="Eygpt"
                  readOnly
                />
                <label htmlFor="country">Country:</label>
              </div>
              {err !== "" ? (
                <p style={{ color: "red" }}>quantity is not equal!</p>
              ) : (
                ""
              )}
              <div className="sub">
                <Link to="/basket">Go back</Link>
                <button type="submit">Check out</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className=""></div>
    </>
  );
}
