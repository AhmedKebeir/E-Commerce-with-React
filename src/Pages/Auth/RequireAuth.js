import { data, Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, GETUSER } from "../../Api/Api";
import Loading from "../../Components/Website/Loading";
export default function RequireAuth() {
  //User
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");

  const Nav = useNavigate();
  const cookie = Cookie();
  const token = cookie.get("e-commerce");

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

        setRole(response.data.data.role || "");
        setUser(response.data.data || "");
      } catch (error) {
        console.error("❌ خطأ أثناء جلب بيانات المستخدم:", error);
        Nav("/login", { replace: true });
      }
    };

    fetchUserData();
  }, [token, Nav]); // مراقبة التحديثات في `role`

  return token ? (
    user === "" ? (
      <Loading />
    ) : role === "admin" ? (
      <Outlet />
    ) : (
      Nav("/login", { replace: true })
    )
  ) : (
    Nav("/login", { replace: true })
  );
}
