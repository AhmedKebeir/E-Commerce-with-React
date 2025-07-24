import { Link } from "react-router-dom";
import "../Auth/Auth.css";
import { useState } from "react";
import axios from "axios";
import { baseUrl, REGISTER } from "../../Api/Api";
import Header from "../../Components/Website/Header";
import Cookie from "cookie-universal";
export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  });

  const [err, setError] = useState();

  //cookies

  const cookie = Cookie();

  //Handle Form Change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  //Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/${REGISTER}`, form);
      const token = res.data.token;
      console.log(token);
      cookie.set("e-commerce", token);
      const role = res.data.data.role;
      if (role === "user") {
        window.location.pathname = "/";
      }
      console.log("success");
    } catch (err) {
      setError(() => err.response.data.errors);
      console.log(err);
    }
  }

  return (
    <>
      <Header />
      <div className="parent">
        <div className="sign ">
          <div className="row container h-100vh">
            <form className="form" onSubmit={handleSubmit}>
              <h1>Register...</h1>
              <div className="inputs">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Your Name...."
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="name">Name:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Your Email...."
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="email">Email:</label>
                {/* phone  */}
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  placeholder="Enter Your Phone Number...."
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="phone">Phone:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter Your Password...."
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                />
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="confirm"
                  name="passwordConfirm"
                  placeholder="Confirm Your Password...."
                  value={form.confirm}
                  onChange={handleChange}
                  required
                  minLength={8}
                />
                <label htmlFor="confirm">Confirm Password:</label>
                <button type="submit">Create Account</button>
              </div>
              <div className="or">
                <div className="line"></div>
                <div className="others">
                  <Link to="/login" className="prag">
                    Already have an account?
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
