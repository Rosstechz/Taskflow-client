import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/auth/authSlice.js";
import { Link, useNavigate } from "react-router-dom";
import Form from "@/components/auth/Form";
import { toast } from "sonner";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(loginUser(form));

    if (loginUser.fulfilled.match(resultAction)) {
      toast.success("Login Successful");
      navigate("/dashboard");
    } else {
      toast.error(resultAction.payload || "Failed To Login");
    }
  };

  const loginFields = [
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
  ];

  const footerContent = (
    <p>
      Don’t have an account?{" "}
      <Link to="/auth/register" className="text-blue-600 hover:underline">
        Register
      </Link>
    </p>
  );

  return (
    <>
      <Form
        title="Sign in to your account"
        formData={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        fields={loginFields}
        buttonText={loading ? "Logging in..." : "Login"}
        footer={footerContent}
      />

      {error && (
        <p className="text-red-500 text-sm text-center mt-2">{error}</p>
      )}
    </>
  );
};

export default Login;
