import { useEffect, useState } from "react";

import Cookie from "cookie-universal";
import axios from "axios";
import { baseUrl, GETORDERSUSER, ORDERS, PRODUCTS } from "../../../Api/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import { faPenSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Orders() {
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
      .then((data) => setOrders(data.data.data));
  }, [del]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (orders.length > 0) {
        const productPromises = orders.flatMap(
          (order) =>
            order?.cartItems?.map((cartItem) =>
              axios
                .get(`${baseUrl}/${PRODUCTS}/${cartItem.product}`)
                .then((res) => res.data.data)
                .catch((error) => {
                  console.error("Error fetching product:", error);
                  return null;
                })
            ) || [] // Ensure empty array if cartItems is undefined
        );

        const fetchedProducts = await Promise.all(productPromises);
        setProducts(fetchedProducts.filter((product) => product !== null));
      }
    };

    fetchProducts();
  }, [orders]);

  console.log(orders);

  async function deleteOrder(id) {
    try {
      let res = await axios.delete(`${baseUrl}/orders/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      console.log(res.status);
      if (res.status === 204) {
        setDel((prev) => !prev);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1 className="p-relative">Orders</h1>
      <div className="feedback-user" style={{ marginTop: "100px" }}>
        <div className="container">
          <div className="tabble">
            <table className="table-items">
              <thead>
                <tr>
                  <th>quantity of products</th>
                  <th>Date&Time</th>
                  <th>Total Price</th>
                  <th>Payment Method</th>
                  <th>Details</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(orders) && orders.length > 0 ? (
                  orders.map((order, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          {order.cartItems.reduce(
                            (cartSum, item) => cartSum + item.quantity,
                            0
                          )}
                        </td>
                        <td>{new Date(order.createdAt).toLocaleString()}</td>
                        <td>{order.totalOrderPrice} EGP</td>
                        <td>{order?.shippingAddress?.paymentMethodType} </td>
                        <td>
                          <Link
                            style={{ color: "#344e52", fontWeight: "700" }}
                            to={`${index}`}
                          >
                            Details
                          </Link>
                        </td>
                        <td>
                          <div className="actions">
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="delete"
                              onClick={() => deleteOrder(order._id)}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6">No Orderes.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
