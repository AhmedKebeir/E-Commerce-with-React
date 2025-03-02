import { Link } from "react-router-dom";
import Loading from "../../../Components/Website/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import "../../../Css/base/Category.css";
import axios from "axios";
import { baseUrl, BRANDS } from "../../../Api/Api";

import Cookie from "cookie-universal";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [del, setDel] = useState(false);
  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  useEffect(() => {
    axios
      .get(`${baseUrl}/${BRANDS}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((data) => setBrands(data.data.data));
  }, [del]);

  async function deleteCaegory(id) {
    try {
      let res = await axios.delete(`${baseUrl}/${BRANDS}/${id}`, {
        headers: { Authorization: "Bearer " + token },
      });
      if (res.status === 204) {
        setDel((prev) => !prev);
      }
    } catch (err) {
      console.log(err);
    }
  }
  // console.log(categories);
  return (
    <>
      <h1 className="p-relative">Brands</h1>
      <div className="create-product">
        <Link to="create">
          <FontAwesomeIcon icon={faCirclePlus} />
          Create a new brand
        </Link>
      </div>
      {brands.length === 0 ? (
        <Loading />
      ) : (
        <div className="categories-table">
          <table>
            <thead>
              <tr>
                <th>Brand Name</th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {brands.map((product1, index) => {
                return (
                  <tr key={index}>
                    <td>{product1.name}</td>

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
                          onClick={() => deleteCaegory(product1._id)}
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
