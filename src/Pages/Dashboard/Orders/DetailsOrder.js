import { useEffect, useState } from "react";

import Cookie from "cookie-universal";
import axios from "axios";
import { baseUrl, GETORDERSUSER, ORDERS, PRODUCTS } from "../../../Api/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import { faPenSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function DetailsOrder() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const params = useParams();
  const [del, setDel] = useState(false);
  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  useEffect(() => {
    axios
      .get(`${baseUrl}/orders`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => setOrders(data.data.data[params.id]));
  }, [del]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (orders && orders.cartItems && orders.cartItems.length > 0) {
        const productPromises = orders.cartItems.map((cartItem) =>
          axios
            .get(`${baseUrl}/${PRODUCTS}/${cartItem.product}`)
            .then((res) => res.data.data)
            .catch((error) => {
              console.error("Error fetching product:", error);
              return null;
            })
        );

        const fetchedProducts = await Promise.all(productPromises);
        setProducts(fetchedProducts.filter((product) => product !== null));
      }
    };

    fetchProducts();
  }, [orders]);
  //   console.log(orders);

  //   console.log(products);

  return (
    <>
      <h1 className="p-relative">Orders</h1>
      <div className="feedback-user" style={{ marginTop: "100px" }}>
        <div className="order-details">
          <h2>User Name: {orders?.user?.name}</h2>
          <h2>Email: {orders?.user?.email}</h2>
          <h2>Address: {orders?.shippingAddress?.address}</h2>
          <h2>City: {orders?.shippingAddress?.city}</h2>
          <h2>Phone: {orders?.shippingAddress?.phone}</h2>
          <h2>ZipCode: {orders?.shippingAddress?.zipCode}</h2>
          <h2>
            Payment Method Type: {orders?.shippingAddress?.paymentMethodType}
          </h2>
        </div>
        <div className="container">
          <div className="tabble">
            <table className="table-items">
              <thead>
                <tr>
                  <th>Product Image</th>
                  <th>Title</th>
                  <th>Quantity of order</th>
                  <th>color</th>
                  <th>Price</th>
                  <th>Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {orders?.cartItems?.map((item, index) => {
                  const product = products.find((p) => p._id === item.product);
                  return (
                    <tr key={index}>
                      <td>
                        <img src={product?.imageCover} alt={product?.title} />
                      </td>
                      <td>{product?.title || "Unknown Product"}</td>
                      <td>{item.quantity}</td>
                      <td>{item.color || "No Color"}</td>
                      <td>{product?.price || "No Price"}</td>
                      <td>{new Date(orders.createdAt).toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
