import { useState } from "react";
import "../../../Css/base/Category.css";
import Cookie from "cookie-universal";
import axios from "axios";
import { baseUrl, SUBCAT } from "../../../Api/Api";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../../../Components/Website/LoadingButton";

export default function CreateSubCategory() {
  const [form, setForm] = useState({
    name: "",
  });
  const [load, setLoad] = useState(false);
  const nav = useNavigate();
  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  async function handleSubmit(e) {
    setLoad(true);
    e.preventDefault();
    try {
      let res = await axios.post(`${baseUrl}/${SUBCAT}`, form, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      if (res.status === 201) {
        nav("/dashboard/subcategories");
        setLoad(false);
      }
    } catch (err) {
      console.log(err);
      setLoad(false);
    }
  }

  function handleChangeInputs(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  return (
    <>
      <h1 className="p-relative">SubCategories</h1>
      <div className="add-category">
        <form onSubmit={handleSubmit}>
          <div className="name-category">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              placeholder="Name..."
              name="name"
              id="name"
              onChange={handleChangeInputs}
              value={form.name}
            />
          </div>

          <button type="submit" className="create">
            {load ? <LoadingButton /> : "Create"}
          </button>
        </form>
      </div>
    </>
  );
}
