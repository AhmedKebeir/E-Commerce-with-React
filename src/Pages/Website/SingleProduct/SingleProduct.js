import { useContext, useEffect, useState } from "react";
import Header from "../../../Components/Website/Header";

import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl, PRODUCTS } from "../../../Api/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Cart } from "../../../Context/CartChangerContext";

export default function SingleProduct() {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [productImages, setProductImages] = useState([]);
  const { setIsChange } = useContext(Cart);
  useEffect(() => {
    axios.get(`${baseUrl}/${PRODUCTS}/${params.id}`).then((data) => {
      setProductImages(
        data.data.data.images.map((imga) => {
          return { original: imga, thumbnail: imga };
        })
      );
      setProduct(data.data.data);
    });
  }, []);

  // console.log(product);
  //   const images = {productImages.map((image,index)=>{
  //         original:image,
  //         thumbnail:image,
  //   });
  // {
  //   original: "https://picsum.photos/id/1018/1000/600/",
  //   thumbnail: "https://picsum.photos/id/1018/250/150/",
  // },
  // {
  //   original: "https://picsum.photos/id/1015/1000/600/",
  //   thumbnail: "https://picsum.photos/id/1015/250/150/",
  // },
  // {
  //   original: "https://picsum.photos/id/1019/1000/600/",
  //   thumbnail: "https://picsum.photos/id/1019/250/150/",
  // },

  const handelSave = () => {
    let getItems;
    try {
      getItems = JSON.parse(localStorage.getItem("product")) || [];
    } catch (error) {
      console.error("Error parsing localStorage:", error);
      getItems = [];
    }

    // البحث عن المنتج في القائمة
    const productExist = getItems.find((pro) => pro.id === product.id);

    if (product) {
      if (productExist) {
        // إذا كان المنتج موجودًا، قم بزيادة العداد
        productExist.quantity = (productExist.quantity || 1) + 1;
      } else {
        // إذا لم يكن المنتج موجودًا، قم بإضافته مع counter = 1
        product.quantity = 1;
        getItems.push(product);
      }

      // تحديث البيانات في localStorage
      localStorage.setItem("product", JSON.stringify(getItems));

      // تحديث حالة التغيير
      setIsChange((prev) => !prev);
    } else {
      console.error("Product is undefined, cannot save.");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="d-flex single-pro  f-wrap p-20">
          <div className="slid">
            <ImageGallery items={productImages} />
          </div>
          <div className="data">
            <h1>{product.title}</h1>

            <p>{product.brand?.name ? product.brand.name : ""}</p>
            <p>{product.colors}</p>
            <p>
              {product.subcategories?.name ? product.subcategories.name : ""}
            </p>
            <p className="price">
              <span>{product.price} EGP</span>
              {product.quantity >= 1 ? (
                <FontAwesomeIcon icon={faCartShopping} onClick={handelSave} />
              ) : (
                <span style={{ color: "red" }}>Sold</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
