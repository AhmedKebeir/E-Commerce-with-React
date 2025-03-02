import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Search from "../Website/Search";
import { Link } from "react-router-dom";

export default function ToBar() {
  return (
    <div className="head between-flex  bg-white p-15">
      <ul>
        <li>
          <Link style={{ color: "#314a4d", fontSize: "20px" }} to="/">
            Website
          </Link>
        </li>
      </ul>
      <div className="icon d-flex align-center">
        <span className="notification p-relative">
          <FontAwesomeIcon icon={faBell} />
        </span>
        <img src={require("../../Images/avatar.png")} alt="avatar" />
      </div>
    </div>
  );
}
