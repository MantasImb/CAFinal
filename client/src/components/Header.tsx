import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { reset as resetOrganisation } from "../features/organisation/organisationSlice";
import { type RootState } from "../app/store";
import { type AppDispatch } from "../app/store";

export default function Header() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  function onLogout() {
    dispatch(resetOrganisation());
    dispatch(reset());
    dispatch(logout());
    navigate("/");
  }

  return (
    <header className="flex justify-between items-center py-2 px-4 border-b-gray-200 border-b">
      {/* Logo */}
      <div className="p-2 font-bold text-2xl">
        <Link to="/">
          Beauty
          <i className="text-pink-700">book</i>
        </Link>
      </div>
      {/* Links */}
      <ul className="flex h-full gap-4 text-black/40">
        {user ? (
          <>
            <li className="flex items-center hover:text-pink-700">
              <button
                className="flex flex-nowrap gap-1 font-semibold"
                onClick={onLogout}
              >
                <FaSignOutAlt className="text-xl" /> SIGN OUT
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="flex items-center hover:text-pink-700">
              <Link
                to="/login"
                className="flex flex-nowrap gap-1 font-semibold"
              >
                <FaSignInAlt className="text-xl" /> LOGIN
              </Link>
            </li>
            <li className="flex items-center hover:text-pink-700">
              <Link
                to="/register"
                className="flex flex-nowrap gap-1 font-semibold"
              >
                <FaUser className="text-lg" /> REGISTER
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}
