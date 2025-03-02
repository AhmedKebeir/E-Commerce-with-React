import axios from "axios";
import { useRef, useEffect, useState } from "react";
import { data, useNavigate, useParams } from "react-router-dom";
import { baseUrl, BRANDS, CATEGORIES, PRODUCTS, SUBCAT } from "../../Api/Api";
import Cookie from "cookie-universal";
import LoadingButton from "../../Components/Website/LoadingButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
const colors = [
  "Red",
  "Green",
  "Blue",
  "Yellow",
  "Purple",
  "Orange",
  "Pink",
  "Black",
  "White",
  "Gray",
  "Cyan",
  "Magenta",
  "Brown",
  "Lime",
  "Teal",
  "Navy",
];

export default function EditProduct() {
  const fileInputRef = useRef(null);
  const params = useParams();
  const [load, setLoad] = useState(false);

  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  const nav = useNavigate();
  // console.log(params);
  const [product, setProduct] = useState({
    brand: "",
    category: "",
    colors: [],
    imageCover: "",
    images: [],
    price: "",
    quantity: "",
    subcategories: "",
    title: "",
  });
  const [categories, setCategories] = useState([{ _id: "", name: "" }]);
  const [brand, setBrand] = useState([{ _id: "", name: "" }]);
  const [subcat, setSubcat] = useState([{ _id: "", name: "" }]);
  const [images, setImages] = useState([]);

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
        const productRes = await axios.get(
          `${baseUrl}/${PRODUCTS}/${params.id}`
        );
        const productData = productRes.data.data;

        setProduct({
          ...productData,
          brand: brandsData.find((b) => b.name === productData.brand?.name) || {
            _id: "",
            name: productData.brand?.name || "",
          },
          category: categoriesData.find(
            (c) => c.name === productData.category?.name
          ) || {
            _id: "",
            name: productData.category?.name || "",
          },
          subcategories: subcatData.find(
            (s) => s.name === productData.subcategories?.name
          ) || {
            _id: "",
            name: productData.subcategories?.name || "",
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // التأكد من تنفيذ الكود مرة واحدة فقط عند تحميل الصفحة

  // console.log(product);

  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    setLoad(true);
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("title", product.title);
      data.append("price", parseFloat(product.price));
      data.append("quantity", parseInt(product.quantity));

      product.colors.forEach((color) => data.append("colors[]", color));
      if (product.category?._id) data.append("category", product.category._id);
      if (product.brand?._id) data.append("brand", product.brand._id);
      if (product.subcategories?._id)
        data.append("subcategories", product.subcategories._id);

      if (typeof product.imageCover === "string") {
        data.append("imageCover", product.images[0]);
      } else if (product.imageCover instanceof File) {
        data.append("imageCover", product.images[0]);
      }

      product.images.forEach((image) => {
        if (image instanceof File) {
          data.append("images", image);
        } else if (typeof image === "string") {
          data.append("images", image);
        }
      });

      const res = await axios.put(`${baseUrl}/${PRODUCTS}/${params.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Product updated successfully:", res.data);
      setLoad(false);
      nav("/dashboard/products");
    } catch (err) {
      console.error(
        "Error updating product:",
        err.response?.data || err.message
      );
      setLoad(false);
    }
  }

  function handleDeleteImage(index) {
    const newImages = product.images.filter((_, i) => i !== index);
    setProduct({ ...product, images: newImages });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  // console.log(product.images);

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
              value={product.title}
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
              value={product.quantity}
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
              value={product.price}
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
              value={product.colors.join(" ")}
              onChange={(e) =>
                setProduct({ ...product, colors: e.target.value.split(" ") })
              }
            />
          </div>
          <div className="brand">
            <label htmlFor="brand">Brand:</label>
            <select
              id="brand"
              value={product.brand?._id || ""}
              onChange={(e) => {
                const selectedBrand = brand.find(
                  (b) => b._id === e.target.value
                );
                setProduct({
                  ...product,
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
              value={product.category?._id || ""} // استخدام _id بدلاً من name
              onChange={(e) => {
                const selectedCategory = categories.find(
                  (cat) => cat._id === e.target.value
                );
                setProduct({
                  ...product,
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
              value={product.subcategories?._id || ""} // استخدام _id بدلاً من name
              onChange={(e) => {
                const selectedSubcategory = subcat.find(
                  (cat) => cat._id === e.target.value
                );
                setProduct({
                  ...product,
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
              ref={fileInputRef}
              onChange={(e) => {
                const files = Array.from(e.target.files);
                setProduct({
                  ...product,
                  images: [...product.images, ...files],
                });
              }}
            />
          </div>

          {/* ✅ عرض الصور القادمة من الـ API + الصور الجديدة */}
          {product.images.length > 0 && (
            <div className="preview-images">
              {product.images.map((image, index) => (
                <div key={index} className="image-upload">
                  <img
                    src={
                      typeof image === "string"
                        ? image
                        : URL.createObjectURL(image)
                    }
                    alt="Product"
                    width="100"
                    style={{ margin: "5px", borderRadius: "5px" }}
                  />
                  <FontAwesomeIcon
                    icon={faX}
                    onClick={() => handleDeleteImage(index)}
                  />
                </div>
              ))}
            </div>
          )}
          <button type="submit" className="create">
            {load ? <LoadingButton /> : "Edit"}
          </button>
        </form>
      </div>
    </>
  );
}
