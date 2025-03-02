import { useEffect, useState } from "react";
import Header from "../../../Components/Website/Header";
import "../../../Css/base/Feedback.css";
import Cookie from "cookie-universal";
import axios from "axios";
import { baseUrl, GETUSER, REVIEWS } from "../../../Api/Api";
import { useNavigate, useParams } from "react-router-dom";

export default function FeedbackForProduct() {
  const cookie = Cookie();
  const token = cookie.get("e-commerce");

  const params = useParams();

  const nav = useNavigate();

  const [rate, setRate] = useState({
    content: "",
    ratings: 1,
    product: params.id,
    user: "",
  });

  useEffect(() => {
    axios
      .get(`${baseUrl}/${GETUSER}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((data) => setRate({ ...rate, user: data.data.data._id || "" }));
  }, []);

  function handleChange(e) {
    setRate({ ...rate, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${baseUrl}/products/${params.id}/${REVIEWS}`,
        rate,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      if (res.status === 201) {
        nav("/", { replace: true });
      }
    } catch (err) {
      console.log(err.data);
    }
  }

  return (
    <>
      <Header />
      <div className="feedback">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="feedback">Feedback:</label>
            <textarea
              rows="4"
              cols="50"
              placeholder="Enter your feedback here..."
              name="content"
              value={rate.content}
              onChange={handleChange}
            />
            <label htmlFor="ratings">Ratings:</label>
            <input
              type="number"
              name="ratings"
              placeholder="Enter your rate between 1 - 5 ."
              value={rate.ratings}
              onChange={handleChange}
            />
            <button type="submit" className="btn-feed">
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
