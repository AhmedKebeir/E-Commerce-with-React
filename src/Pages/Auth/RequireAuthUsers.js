import axios from "axios";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { baseUrl, GETUSER } from "../../Api/Api";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "../../Components/Website/Loading";
export default function RequireAuthUsers() {
  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  const [user, setUser] = useState("");
  const Nav = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!token) {
          Nav("/login", { replace: true });
          return;
        }

        const response = await axios.get(`${baseUrl}/${GETUSER}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data.data || "");
      } catch (error) {
        console.error("❌ خطأ أثناء جلب بيانات المستخدم:", error);
        Nav("/login", { replace: true });
      }
    };

    fetchUserData();
  }, [token, Nav]);
  return token !== "" ? (
    user === "" ? (
      <Loading />
    ) : (
      <Outlet />
    )
  ) : (
    Nav("/login", { replace: true })
  );
}
