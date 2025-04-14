import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/store/auth/authSlice.js";
import Form from "@/components/auth/Form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await dispatch(registerUser(form));

    if (response.meta.requestStatus === "fulfilled") {
      toast.success("Registration Successful, Please Login");
      navigate("/auth/login");
    }
  };

  const registerFields = [
    { label: "Username", name: "username" },
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password" },
  ];

  const footerContent = (
    <p>
      Already have an account?{" "}
      <Link to="/auth/login" className="text-blue-600 hover:underline">
        Login
      </Link>
    </p>
  );

  return (
    <>
      <Form
        title="Create an account"
        formData={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        fields={registerFields}
        buttonText={loading ? "Registering..." : "Sign Up"}
        footer={footerContent}
      />
      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}
    </>
  );
};

export default Register;
