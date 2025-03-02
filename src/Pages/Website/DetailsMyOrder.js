import { useEffect, useState } from "react";
import Header from "../../Components/Website/Header";
import { useParams } from "react-router-dom";
import Cookie from "cookie-universal";
import axios from "axios";
import { baseUrl, GETORDERSUSER, PRODUCTS } from "../../Api/Api";

export default function DetailsMyOrders() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const params = useParams();
  const [del, setDel] = useState(false);
  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  useEffect(() => {
    axios
      .get(`${baseUrl}/${GETORDERSUSER}`, {
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

  console.log(orders);
  console.log(products);
  return (
    <>
      <Header />
      <h1 className="p-relative">Orders</h1>
      <div className="feedback-user" style={{ marginTop: "100px" }}>
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
                      <td>{orders?.totalOrderPrice || "No Price"}</td>
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
