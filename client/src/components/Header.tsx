import { FaSignInAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex">
      {/* Logo */}
      <div>
        <Link to="/">BeautyBook</Link>
      </div>
      {/* Links */}
      <ul className="flex">
        <li>
          <Link to="/login">
            <FaSignInAlt /> Login
          </Link>
        </li>
        <li>
          <Link to="/register">
            <FaUser /> Register
          </Link>
        </li>
      </ul>
    </header>
  );
}
