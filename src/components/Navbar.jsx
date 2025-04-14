import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/auth/authSlice.js";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <h1 className="text-xl font-bold text-blue-600 tracking-tight">
        TaskFlow
      </h1>

      <div className="flex items-center space-x-3">
        <span className="text-sm text-gray-600 hidden sm:inline">
          Hello, {user?.username}
        </span>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
