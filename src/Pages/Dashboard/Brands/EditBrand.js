import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl, BRANDS } from "../../../Api/Api";
import Cookie from "cookie-universal";
import LoadingButton from "../../../Components/Website/LoadingButton";

export default function EditBrand() {
  const params = useParams();
  const [name, setName] = useState("");
  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  const nav = useNavigate();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    axios
      .get(`${baseUrl}/${BRANDS}/${params.id}`)
      .then((data) => setName(data.data.data.name));
  }, []);

  async function handleSub(e) {
    setLoad(true);
    e.preventDefault();
    try {
      let res = await axios.put(
        `${baseUrl}/${BRANDS}/${params.id}`,
        { name },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setLoad(false);
      // console.log(res.status);
      if (res.status === 200) {
        nav("/dashboard/brands");
      }
    } catch (err) {
      setLoad(false);
      console.log(err);
    }
  }

  // console.log(name);
  return (
    <>
      <h1 className="p-relative">Brands</h1>
      <div className="add-category">
        <form onSubmit={handleSub}>
          <div className="name-category">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              placeholder="Name..."
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
