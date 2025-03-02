import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneVolume,
  faClock,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTiktok,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default function Footerr() {
  return (
    <footer>
      <div className="container">
        <div className="box">
          <h3>ELEGANT ESSENTIALS | HOUSE OF FASHION ACCESSORIES</h3>
          <ul className="social">
            <li>
              <Link
                to="https://www.instagram.com/elegant_essentials000?igsh=MWU3MXk4YnY3cTlyMw=="
                className="facebook"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </Link>
            </li>
            <li>
              <Link to="https://vm.tiktok.com/ZSMasfKRD/" className="twitter">
                <FontAwesomeIcon icon={faTiktok} />
              </Link>
            </li>
            <li>
              <Link to="" className="youtube">
                <FontAwesomeIcon icon={faYoutube} />
              </Link>
            </li>
          </ul>
          <p className="text">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus
            nulla rem, dignissimos iste aspernaturs
          </p>
        </div>
        <div className="box">
          <div className="line">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <div className="info">Egypt</div>
          </div>
          <div className="line">
            <FontAwesomeIcon icon={faClock} />
            <div className="info">Business Hours: 24</div>
          </div>
          <div className="line">
            <FontAwesomeIcon icon={faPhoneVolume} />
            <div className="info">
              <span>+201277508441</span>
            </div>
          </div>
        </div>
        {/* <div className="box footer-gallery">
          <img decoding="async" src="./image/gallery-01.png" alt="" />
          <img decoding="async" src="./image/gallery-02.png" alt="" />
          <img decoding="async" src="./image/gallery-03.jpg" alt="" />
          <img decoding="async" src="./image/gallery-04.png" alt="" />
          <img decoding="async" src="./image/gallery-05.jpg" alt="" />
          <img decoding="async" src="./image/gallery-06.png" alt="" />
        </div> */}
      </div>
      <p className="copyright">Made With By Ahmed M Kebeir</p>
    </footer>
  );
}
