import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { type RootState } from "../app/store";
import { type AppDispatch } from "../app/store";

export default function Header() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  function onLogout() {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  }

  return (
    <header className="flex justify-between items-center">
      {/* Logo */}
      <div>
        <Link to="/">BeautyBook</Link>
      </div>
      {/* Links */}
      <ul className="flex">
        {user ? (
          <>
            <li>
              <button onClick={onLogout}>
                <FaSignOutAlt /> Sign Out
              </button>
            </li>
          </>
        ) : (
          <>
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
          </>
        )}
      </ul>
    </header>
  );
}
