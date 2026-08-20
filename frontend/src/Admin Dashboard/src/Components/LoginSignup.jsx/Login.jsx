import React, { useState } from "react";
import "./Login.css";

const API_URL =
  "https://a9vqiga5na.execute-api.ap-south-1.amazonaws.com/prod/login";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    /* ==============================
       VALIDATION
    ============================== */

    if (!username.trim()) {
      setError("Please enter your username.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      /* ==============================
         LOGIN API
      ============================== */

      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username: username.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      console.log("LOGIN RESPONSE:", data);

      /* ==============================
         LOGIN FAILED
      ============================== */

      if (!response.ok || !data.success) {
        setError(
          data.message ||
            "Invalid username or password."
        );

        return;
      }

      /* ==============================
         LOGIN SUCCESS
      ============================== */

      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      localStorage.setItem(
        "adminUser",
        JSON.stringify(data.user)
      );

      /* ==============================
         GO TO ADMIN
      ============================== */

      window.location.href = "/admin";

    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      setError(
        "Unable to connect to the login server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        {/* ==============================
            HEADER
        ============================== */}

        <div className="login-header">

          <h1>
            Admin Login
          </h1>

          <p>
            Login to access the Admin Dashboard
          </p>

        </div>

        {/* ==============================
            FORM
        ============================== */}

        <form
          onSubmit={handleLogin}
          className="login-form"
        >

          {/* ==============================
              USERNAME
          ============================== */}

          <div className="form-group">

            <label>
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              autoComplete="username"
              disabled={loading}
            />

          </div>

          {/* ==============================
              PASSWORD
          ============================== */}

          <div className="form-group">

            <label>
              Password
            </label>

            <div className="password-wrapper">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                autoComplete="current-password"
                disabled={loading}
              />

              <button
                type="button"
                className="show-password"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>

            </div>

          </div>

          {/* ==============================
              ERROR
          ============================== */}

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          {/* ==============================
              LOGIN BUTTON
          ============================== */}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default Login;