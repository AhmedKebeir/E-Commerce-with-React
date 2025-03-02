import { Link } from "react-router-dom";
import Header from "../../Components/Website/Header";
import "../../Css/base/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import ProductBox from "../../Components/Website/ProductBox";
import Footerr from "../../Components/Website/Footerr";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, PRODUCTS } from "../../Api/Api";
import Loading from "../../Components/Website/Loading";

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/${PRODUCTS}`)
      .then((response) => setProducts(response.data.data))
      .catch((error) => console.error("Error fetching products:", error)); // ✅ إضافة التعامل مع الأخطاء
  }, []);

  return (
    <>
      <Header />
      <div className="landing">
        <div className="container">
          <section className="content">
            <h1>DISCOVER ELEGANCE</h1>
            <p>
              Explore our exclusive collection to elevate your style
              effortlessly!
            </p>
            <Link to="/Product" className="btn">
              Shop now
            </Link>
          </section>
          <section className="image-landing">
            <div>
              <img
                src={require("../../Images/cesar-badilla-miranda-wMPl_GmJ5GI-unsplash.jpg")}
                alt="image"
              />
            </div>
            <div>
              <img
                src={require("../../Images/filipp-romanovski-g4RMWM9thYY-unsplash.jpg")}
                alt="image"
              />
            </div>
            <div>
              <img
                src={require("../../Images/kiwirosa-kiwi-rosa-tcmCJ2lRAWI-unsplash.jpg")}
                alt="image"
              />
            </div>
            <div>
              <img
                src={require("../../Images/redd-francisco-3vnQQgNrZ10-unsplash.jpg")}
                alt="image"
              />
            </div>
          </section>

          <a href="#products" className="go-down">
            <FontAwesomeIcon icon={faAngleDoubleDown} />
          </a>
        </div>
      </div>
      {products.length > 0 ? (
        <div className="products" id="products">
          <h2 className="main-title">Products</h2>
          <div className="container">
            {products
              .filter((product) => product.quantity >= 1)
              .map((product) => (
                <ProductBox
                  key={product._id} // ✅ إضافة مفتاح فريد
                  id={product._id} // ✅ إصلاح خطأ تمرير id
                  Url={product.imageCover}
                  title={product.title}
                  description={`${product.price} EGP`}
                />
              ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}

      {products.length > 0 ? (
        <div className="products" id="products">
          <h2 className="main-title">Sold Products</h2>
          <div className="container">
            {products
              .filter((product) => product.quantity === 0)
              .map((product) => (
                <ProductBox
                  key={product._id} // ✅ إضافة مفتاح فريد
                  id={product._id} // ✅ إصلاح خطأ تمرير id
                  Url={product.imageCover}
                  title={product.title}
                  description={`${product.price} EGP`}
                  sold={true}
                />
              ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}

      <div className="features" id="features">
        <h2 className="main-title">Features</h2>
        <div className="container">
          <div className="box quality">
            <div className="img-holder">
              <img src={require("../../Images/features-01.jpg")} alt="" />
            </div>
            <h2>Quality</h2>
            <p>
              We believe elegance starts with the details, which is why we offer
              high-quality accessories designed to elevate your style with
              sophistication and uniqueness.
            </p>
            <Link to="#">More</Link>
          </div>
          <div className="box time">
            <div className="img-holder">
              <img src={require("../../Images/features-02.jpg")} alt="" />
            </div>
            <h2>Time</h2>
            <p>
              Because time is the essence of style, we bring you the latest
              fashion accessories with speed and quality, ensuring you're always
              ready to shine.
            </p>
            <Link to="#">More</Link>
          </div>
          <div className="box passion">
            <div className="img-holder">
              <img src={require("../../Images/features-03.jpg")} alt="" />
            </div>
            <h2>Passion</h2>
            <p>
              Passion for fashion defines us. Our accessories reflect your
              unique taste and help you express your personality with
              confidence and elegance.
            </p>
            <Link to="#">More</Link>
          </div>
        </div>
      </div>

      <Footerr />
    </>
  );
}
