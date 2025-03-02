import { Link } from "react-router-dom";
import "../../Css/base/ProductsDash.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, PRODUCTS } from "../../Api/Api";
import Loading from "../../Components/Website/Loading";
import Cookie from "cookie-universal";

export default function Products() {
  const [products, setProducts] = useState([]);
  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  const [del, setDel] = useState(false);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    axios
      .get(`${baseUrl}/${PRODUCTS}`)
      .then((data) => setProducts(data.data.data))
      .catch((err) => console.log(err));
  }, [del]);

  async function handledelete(id) {
    setLoad(true);
    try {
      const res = await axios.delete(`${baseUrl}/${PRODUCTS}/${id}`, {
        headers: { Authorization: "Bearer " + token },
      });

      if (res.status === 204) {
        setDel((prev) => !prev);
      }
      setLoad(false);
    } catch (err) {
      console.log(err);
      setLoad(false);
    }
  }

  return (
    <>
      <h1 className="p-relative">Products</h1>
      <div className="create-product">
        <Link to="create">
          <FontAwesomeIcon icon={faCirclePlus} />
          Create a new product
        </Link>
      </div>

      {products.length === 0 || load === true ? (
        <Loading />
      ) : (
        <div className="products-table">
          <table>
            <thead>
              <tr>
                <th>Product Image</th>
                <th>Product Title</th>
                <th>Product Price</th>
                <th>Product Quantity</th>
                <th>Product Color</th>
                <th>Brand</th>
                <th>Category</th>
                <th>SubCategories</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product1, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img src={product1.imageCover} />
                    </td>
                    <td>{product1.title}</td>
                    <td>{product1.price} LE</td>
                    <td>{product1.quantity}</td>
                    <td>{product1.colors.join("|")}</td>
                    <td>{product1.brand.name}</td>
                    <td>
                      {product1.category?.name
                        ? product1.category.name
                        : "null"}
                    </td>
                    <td>{product1.subcategories.name}</td>
                    <td>
                      <div className="actions">
                        <Link to={`${product1._id}`}>
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="update"
                          />
                        </Link>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="delete"
                          onClick={() => handledelete(product1._id)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
