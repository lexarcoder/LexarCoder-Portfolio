import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import "../style/AuthStyle.scss";
import { useAuth } from "../../../hooks/useAuth";
import Globalbg from "../../../layout/ui/GlobalBg";
export default function Login() {
  const [showPass, setShowPass] = useState(false);

  const { loading, handleLogin, handleGoogleLogin, handleGithubLogin } =
    useAuth();
  const [loginId, setLoginId] = useState("")
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handelSubmit(e) {
    e.preventDefault();

  const success = await handleLogin({
    loginId,
    password,
  });

   if(success)
{
    navigate("/");

}
  }

  return (
    <div className="auth-wrapper">
      <Globalbg />
      <div className="auth-card page">
        <h2>Login</h2>

        <div className="social-login">
          <button onClick={handleGoogleLogin}>
            <FcGoogle size={18} /> Google
          </button>
          <button onClick={handleGithubLogin}>
            <FaGithub size={18} /> GitHub
          </button>
        </div>

        {/* ONLY WRAPPED INTO FORM */}
        <form onSubmit={handelSubmit}>
          <div className="input-group">
            <input
              type="text"
              required
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />
            <label>Email or Username</label>
          </div>

          <div className="input-group">
            <input
              type={showPass ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>

            <span onClick={() => setShowPass(!showPass)}>
              {showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button className="primary-btn" type="submit">
            Login
            <LogIn size={18} />
          </button>
        </form>

        <p className="auth-switch ">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
