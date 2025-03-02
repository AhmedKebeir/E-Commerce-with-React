// import { useState } from "react";

import axios, { AxiosHeaders } from "axios";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl, BRANDS, CATEGORIES, PRODUCTS, SUBCAT } from "../../Api/Api";
import Cookie from "cookie-universal";
import LoadingButton from "../../Components/Website/LoadingButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function CreateProduct() {
  const fileInputRef = useRef(null);

  const cookie = Cookie();
  const [load, setLoad] = useState(false);
  const token = cookie.get("e-commerce");
  const [form, setForm] = useState({
    title: "",
    quantity: 0,
    price: "",
    colors: [],
    imageCover: "",
    category: "",
    subcategories: "",
    brand: "",
    images: [],
  });

  const [categories, setCategories] = useState([{ _id: "", name: "" }]);
  const [brand, setBrand] = useState([{ _id: "", name: "" }]);
  const [subcat, setSubcat] = useState([{ _id: "", name: "" }]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: "Bearer " + token };

        // تنفيذ جميع الطلبات معًا
        const [brandsRes, subcatRes, categoriesRes] = await Promise.all([
          axios.get(`${baseUrl}/${BRANDS}`, { headers }),
          axios.get(`${baseUrl}/${SUBCAT}`, { headers }),
          axios.get(`${baseUrl}/${CATEGORIES}`, { headers }),
        ]);

        const brandsData = brandsRes.data.data;
        const subcatData = subcatRes.data.data;
        const categoriesData = categoriesRes.data.data;

        setBrand(brandsData);
        setSubcat(subcatData);
        setCategories(categoriesData);

        // بعد تحميل كل البيانات، نجلب بيانات المنتج
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const nav = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    setLoad(true);
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("price", parseFloat(form.price));
      data.append("quantity", parseInt(form.quantity, 10));

      form.colors.forEach((color) => data.append("colors[]", color));

      if (form.category?._id) data.append("category", form.category._id);
      if (form.brand?._id) data.append("brand", form.brand._id);
      if (form.subcategories?._id)
        data.append("subcategories", form.subcategories._id);

      // ✅ If `imageCover` is a URL, send it as a string. If it's a file, append it.
      if (typeof form.imageCover === "string") {
        data.append("imageCover", form.images[0]);
      } else if (form.imageCover instanceof File) {
        data.append("imageCover", form.images[0]);
      }

      // ✅ Append image files correctly
      form.images.forEach((image) => {
        if (image instanceof File) {
          data.append("images", image);
        } else if (typeof image === "string") {
          data.append("images", image); // If it's a URL, append as a string
        }
      });

      // ✅ Send FormData with correct headers
      const res = await axios.post(`${baseUrl}/${PRODUCTS}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // ✅ Correct for file uploads
        },
      });

      // console.log("Product created successfully:", res.data);
      setLoad(false);
      nav("/dashboard/products");
    } catch (err) {
      console.error(
        "Error creating product:",
        err.response?.data || err.message
      );
      setLoad(false);
    }
  }

  function handeldeleteimage(index) {
    // إنشاء نسخة جديدة من الصور مع استبعاد الصورة المحددة
    const newImages = form.images.filter((_, i) => i !== index);

    // تحديث الحالة بعد الحذف
    setForm({ ...form, images: newImages });

    // ✅ إعادة تعيين ملف الإدخال لمنع مشاكل إعادة تحميل نفس الصورة
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  // console.log(form);
  return (
    <>
      <h1 className="p-relative">Products</h1>
      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <div className="title-product">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              placeholder="Product Title..."
              name="title"
              id="title"
              onChange={handleChange}
            />
          </div>
          <div className="number-product">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              placeholder="Quantity Of product..."
              name="quantity"
              id="quantity"
              onChange={handleChange}
            />
          </div>
          <div className="price">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Price..."
              onChange={handleChange}
            />
          </div>
          <div className="color">
            <label htmlFor="color">Color:</label>
            <input
              type="text"
              name="color"
              id="color"
              placeholder="color..."
              value={form.colors.join(" ")}
              onChange={(e) =>
                setForm({ ...form, colors: e.target.value.split(" ") })
              }
            />
          </div>
          <div className="brand">
            <label htmlFor="brand">Brand:</label>
            <select
              id="brand"
              value={form.brand?._id || ""}
              onChange={(e) => {
                const selectedBrand = brand.find(
                  (b) => b._id === e.target.value
                );
                setForm({
                  ...form,
                  brand: selectedBrand || { _id: "", name: "" },
                });
              }}
            >
              <option value="">Select a brand</option>
              {brand.map((bran) => (
                <option key={bran._id} value={bran._id}>
                  {bran.name}
                </option>
              ))}
            </select>
          </div>
          <div className="category">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              value={form.category?._id || ""} // استخدام _id بدلاً من name
              onChange={(e) => {
                const selectedCategory = categories.find(
                  (cat) => cat._id === e.target.value
                );
                setForm({
                  ...form,
                  category: selectedCategory || { _id: "", name: "" }, // التأكد من تخزين الكائن بالكامل
                });
              }}
            >
              <option value="">Select a category</option>

              {categories.map((cat, index) => (
                <option key={index} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="sub-category">
            <label htmlFor="sub-category">SubCategory:</label>
            <select
              id="sub-category"
              value={form.subcategories?._id || ""} // استخدام _id بدلاً من name
              onChange={(e) => {
                const selectedSubcategory = subcat.find(
                  (cat) => cat._id === e.target.value
                );
                setForm({
                  ...form,
                  subcategories: selectedSubcategory || { _id: "", name: "" }, // تخزين الكائن بالكامل
                });
              }}
            >
              <option value="">Select a subCategory</option>

              {subcat.map((cat, index) => (
                <option key={index} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="image">
            <label htmlFor="image">Upload Product Images:</label>
            <input
              type="file"
              multiple
              accept="image/*"
              name="images"
              id="images"
              ref={fileInputRef} // ✅ ربط الحقل بـ useRef
              onChange={(e) => {
                const files = Array.from(e.target.files); // ✅ تحويل FileList إلى مصفوفة
                setForm({ ...form, images: files });
              }}
            />
          </div>

          {/* ✅ عرض الصور القادمة من الـ API + الصور الجديدة */}
          {form.images.length > 0 && (
            <div className="preview-images">
              {form.images.map((image, index) => (
                <div className="image-upload">
                  <img
                    key={index}
                    src={
                      typeof image === "string"
                        ? image
                        : URL.createObjectURL(image)
                    } // ✅ عرض رابط الصورة القديمة أو ملف جديد
                    alt="Product"
                    width="100"
                    style={{ margin: "5px", borderRadius: "5px" }}
                  />
                  <FontAwesomeIcon
                    icon={faX}
                    onClick={() => handeldeleteimage(index)} // ✅ تمرير index لحذف الصورة المحددة
                  />
                </div>
              ))}
            </div>
          )}
          <button type="submit" className="create">
            {load ? <LoadingButton /> : "Create"}
          </button>
        </form>
      </div>
    </>
  );
}
