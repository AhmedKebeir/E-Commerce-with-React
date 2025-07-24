import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl, GETALLUSERS } from "../../Api/Api";
import Cookie from "cookie-universal";
import Loading from "../../Components/Website/Loading";
import avatarImage from "../../Images/avatar.png";
import "../../Css/base/FrameWorkDash.css";
import "../../Css/base/Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faFaceSmile,
  faCodeCommit,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  const [reload, setReload] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!token) return;
    setLoad(true);
    axios
      .get(`${baseUrl}/${GETALLUSERS}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((data) => {
        setUsers(data.data.data);
        setLoad(false);
      })
      .catch((error) => {
        console.error("❌ خطأ في جلب المستخدمين:", error);
        setLoad(false);
      });
  }, [reload]);


  async function removeUser(id) {
    const res = await axios.delete(`${baseUrl}/${GETALLUSERS}/${id}`, {
      headers: { Authorization: "Bearer " + token },
    });
    if (res.status === 204) {
      setReload((prev) => !prev);
    }
  }

  return (
    <>
      <>
        <h1 className="p-relative">Users</h1>
        {users.length === 0 || load ? (
          <Loading />
        ) : (
          <div className="friends-page m-20 d-grid gap-20">
            {users.map((userr, index) => (
              <div
                key={index}
                className="friend bg-white p-20 rad-10 p-relative"
              >
                <div className="contact">
                  <FontAwesomeIcon icon={faPhone} />
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div className="txt-c">
                  <img
                    className="rad-half mt-10 mb-10 w-100 h-100"
                    src={avatarImage}
                    alt="User Avatar"
                  />
                  <h4 className="m-0">{userr.name}</h4>
                  <p className="c-grey fs-13 mt-5 mb-0">{userr.email}</p>
                </div>
                <div className="icons fs-14 p-relative">
                  <div className="mb-10">
                    <FontAwesomeIcon icon={faFaceSmile} />
                    <span>99 Friend</span>
                  </div>
                  <div className="mb-10">
                    <FontAwesomeIcon icon={faCodeCommit} />
                    <span>15 Projects</span>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faNewspaper} />
                    <span>25 Articles</span>
                  </div>
                  <span className="vip fw-bold c-orange">VIP</span>
                </div>
                <div className="info between-flex fs-13">
                  <span className="c-grey">
                    {userr.active ? "active" : "not active"}
                  </span>
                  <div>
                    <button
                      className="bg-red c-white btn-shape"
                      onClick={() => {
                        removeUser(userr._id);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    </>
  );
}
