import axios from "axios";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../Api/Api";
import { useNavigate, useParams } from "react-router-dom";
export default function UpdateFeedback() {
  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  const [review, setReview] = useState({});

  const params = useParams();

  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(`${baseUrl}/reviews/${params.id}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((data) => setReview(data.data.data));
  }, []);

  function handleChange(e) {
    setReview({ ...review, [e.target.name]: e.target.value });
  }

  //   console.log(review);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const updatedReview = {
        ...review,
        ratings: Number(review.ratings), // Ensure it's sent as a number
      };
      const res = await axios.put(
        `${baseUrl}/reviews/${params.id}`,
        updatedReview,
        {
          headers: {
            Authorization: "Bearer " + token,
            // "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        nav("/dashboard/feedback");
      }
    } catch {}
  }
  return (
    <div className="feedback">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="feedback">Feedback:</label>
          <textarea
            rows="4"
            cols="50"
            placeholder="Enter your feedback here..."
            name="content"
            value={review?.content}
            onChange={handleChange}
          />
          <label htmlFor="ratings">Ratings:</label>
          <input
            type="number"
            name="ratings"
            placeholder="Enter your rate between 1 - 5 ."
            value={review.ratings}
            onChange={handleChange}
          />
          <button type="submit" className="btn-feed">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
