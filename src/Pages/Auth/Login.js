import { Link, useNavigate } from "react-router-dom";
import Header from "../../Components/Website/Header";
import { useState } from "react";
import axios from "axios";
import { baseUrl, LOGIN } from "../../Api/Api";
import Cookie from "cookie-universal";
import LoadingButton from "../../Components/Website/LoadingButton";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState("");

  const Nav = useNavigate();

  //cookies
  const cookie = Cookie();

  function handleChangeInputs(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoad(true);
    try {
      const res = await axios.post(`${baseUrl}/${LOGIN}`, form);

      const role = res.data.role;
      cookie.set("e-commerce", res.data.token);
      console.log(res);
      if (role === "admin") {
        setLoad(false);
        Nav("/dashboard/products");
      } else {
        setLoad(false);
        Nav("/");
      }
    } catch (err) {
      setLoad(false);
      setErr(err);
    }
  }
  return (
    <>
      <Header />
      <div className="parent">
        <div className="sign ">
          <div className="row container h-100vh">
            <form className="form" onSubmit={handleSubmit}>
              <h1 className="head-login">Log In...</h1>
              <div className="inputs">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Your Email...."
                  value={form.email}
                  onChange={handleChangeInputs}
                />
                <label htmlFor="email">Email:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter Your Password...."
                  value={form.password}
                  onChange={handleChangeInputs}
                />
                <label htmlFor="password">Password:</label>

                {err === "" ? (
                  ""
                ) : (
                  <p className="err">Email or password is not valid!</p>
                )}
                <button type="submit">
                  {load ? <LoadingButton /> : "Log In"}
                </button>
              </div>
              <div className="or">
                <div className="line"></div>
                <div className="others">
                  <Link to="/register" className="prag">
                    Don't have an account?
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
