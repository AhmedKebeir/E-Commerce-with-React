import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Search() {
  return (
    <div className="search">
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <input type="text" name="search" id="search" placeholder="Search..." />
    </div>
  );
}
