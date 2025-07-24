import { useEffect, useState } from "react";
import Header from "../../../Components/Website/Header";
import Cookie from "cookie-universal";
import axios from "axios";
import { baseUrl, GETUSER, PRODUCTS, REVIEWS } from "../../../Api/Api";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function AllFeedback() {
  const cookie = Cookie();
  const token = cookie.get("e-commerce");

  const [userr, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]); // ✅ تخزين المنتجات في Array

  const [del, setDel] = useState(false);

  // ✅ جلب بيانات المستخدم والمراجعات عند تحميل الصفحة
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`${baseUrl}/${GETUSER}`, {
          headers: { Authorization: "Bearer " + token },
        });
        setUser(userResponse.data.data);

        const reviewsResponse = await axios.get(`${baseUrl}/reviews`, {
          headers: { Authorization: "Bearer " + token },
        });
        setReviews(reviewsResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [del]);
  //   console.log(reviews);

  // ✅ فلترة المراجعات بعد تحميل بيانات المستخدم والمراجعات
  //   useEffect(() => {
  //     if (userr && reviews.length > 0) {
  //       const filteredReviews = reviews.filter(
  //         (review) => review.user && review.user._id === userr._id
  //       );
  //       setDataShow(filteredReviews);
  //     }
  //   }, [userr, reviews]);

  //   console.log(dataShow);

  // ✅ جلب بيانات المنتجات وتخزينها في Array
  useEffect(() => {
    const fetchProducts = async () => {
      if (reviews.length > 0) {
        const productPromises = reviews.map((item) =>
          item?.product
            ? axios
                .get(`${baseUrl}/${PRODUCTS}/${item.product}`)
                .then((res) => res.data.data)
                .catch((error) => {
                  console.error("Error fetching product:", error);
                  return null; // في حالة الخطأ، نعيد null حتى لا نضيف بيانات غير صالحة
                })
            : null
        );

        const fetchedProducts = await Promise.all(productPromises);
        setProducts(fetchedProducts.filter((product) => product !== null)); // ✅ استبعاد القيم null
      }
    };

    fetchProducts();
  }, [reviews, del]);

  //   console.log(products);

  // console.log("Products Array:", products); // ✅ طباعة المصفوفة للتأكد من نجاح الجلب

  async function deleteCaegory(id) {
    try {
      const res = await axios.delete(`${baseUrl}/reviews/${id}`, {
        headers: { Authorization: "Bearer " + token },
      });
      if (res.status === 204) {
        setDel((prev) => !prev);
      }
    } catch {}
  }
  return (
    <>
      <div className="feedback-user" style={{ marginTop: "100px" }}>
        <div className="container">
          <div className="tabble">
            <table className="table-items">
              <thead>
                <tr>
                  <th>Product Image</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Content</th>
                  <th>Ratings</th>
                  <th>User</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(products) && products.length > 0 ? (
                  reviews.map((review, index) => {
                    const product = products[index] || {}; // ✅ تجنب `undefined`
                    return (
                      <tr key={index}>
                        <td>
                          <img
                            src={product?.imageCover || "placeholder.jpg"} // ✅ تأمين الصورة
                            alt={product?.title || "No title"}
                          />
                        </td>
                        <td>{product?.title || "No title"}</td>
                        <td>
                          {product?.description || "No description available"}
                        </td>
                        <td>
                          {product?.price ? `${product.price} EGP` : "N/A"}
                        </td>
                        <td>{review.content}</td>
                        <td>{review.ratings}</td>
                        <td>{review.user?.name}</td>
                        <td>
                          <div className="actions">
                            <Link to={`${review._id}`}>
                              <FontAwesomeIcon
                                icon={faPenToSquare}
                                className="update"
                              />
                            </Link>
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="delete"
                              onClick={() => deleteCaegory(review._id)}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8">No reviews.</td>
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
