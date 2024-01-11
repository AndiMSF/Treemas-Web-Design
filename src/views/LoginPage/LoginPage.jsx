/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
import Container from "react-bootstrap/Container";
import "./auth.css";
import Treemas from "../../images/logo-treemas.png";
import { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState(""); // State untuk nilai NIK
  const [password, setPassword] = useState(""); // State untuk nilai password
  const [passwordError, setPasswordError] = useState(""); // State for password error
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/");
    }
  });

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleLogin = async () => {
    const loginData = {
      nik: username,
      password: password,
      isWebAccess: "1",
    };

    try {
      const response = await axios.post(
        "http://localhost:8081/api/auth/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success === true) {
        // Tangani login yang berhasil, misalnya, simpan token otentikasi di localStorage
        console.log("Berhasil masuk:", response);
        const bearerToken = response.data.data.token;
        console.log(bearerToken);
        let nik = response.data.data.user.nik;
        console.log(nik);
        nik = localStorage.setItem("nik", nik);
        localStorage.setItem("authToken", bearerToken);

        if (response.data.data.user.is_pass_chg === "0") {
          navigate("/change-password");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      // Tangani kesalahan jaringan atau kesalahan server
      // Jika tidak berhasil, tampilkan pesan error

      if (error.response.data.error === "Bad credentials") {
        console.log(
          "Ini Buat Apa yak " + JSON.stringify(error.response.data, null, 2)
        );
        Swal.fire({
          title: "Error!",
          text: error.response.data.error,
          icon: "error",
        });
      } else if (error.response.data.message === "Account is Locked!") {
        console.log(
          "Ini Buat Account is Locked " +
            JSON.stringify(error.response.data, null, 2)
        );
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error",
        });
      } else {
        console.error("Ini buat user not found:", error.response);
        Swal.fire({
          title: "Error!",
          text: error.response.data,
          icon: "error",
        });
      }
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return; // Prevent further execution if there's an error
    } else {
      setPasswordError("");
    }
  };

  // ... (kode lainnya seperti render input dan tombol login)

  return (
    <Container fluid>
      <div className={`login__container row ${passwordError ? "error" : ""}`}>
        <div className="left__container col-sm-12 col-md-12 col-lg-6">
          <div className="logo">
            <img src={Treemas} alt="logo" />
          </div>
          <div className="login__form">
            <div className="login__form__header">
              <h1>Login</h1>
              <p>Enter your account details</p>
            </div>
            <form>
              <InputGroup
                className={`mb-3 ${passwordError ? "error-border" : ""}`}
              >
                <InputGroup.Text id="basic-addon1">
                  <i className="fas fa-user"></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="NIK"
                  aria-label="NIK"
                  aria-describedby="basic-addon1"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon2">
                  <i className="fas fa-lock"></i>
                </InputGroup.Text>
                <Form.Control
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* Add a button/icon to toggle password visibility */}
                <InputGroup.Text
                  id="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer" }}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </InputGroup.Text>
              </InputGroup>
              {/* Display the error message if it exists */}
              {passwordError && (
                <div className="error-message">{passwordError}</div>
              )}
              <p>
                <a className="forgot__password" onClick={handleForgotPassword}>
                  Forgot Password?
                </a>
              </p>
              <button
                className="login__button"
                type="button"
                onClick={handleLogin}
              >
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="right__container col-sm-12 col-md-12 col-lg-6">
          <div class="login__image__description">
            <h1>Welcome to</h1>
            <p class="treemas">Treemas</p>
            <p>Login to access your account</p>
          </div>
          <svg
            class="svg1"
            viewBox="0 0 763 616"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M467.006 132.596C583.471 80.0015 685.35 -14.6834 812.005 2.31091C960.633 22.2536 1115.18 93.659 1181.01 228.4C1246.57 362.608 1189.14 518.749 1131.66 656.613C1079.22 782.362 998.913 894.871 877.418 956.524C755.024 1018.63 617.337 1011.37 482.441 986.056C317.591 955.124 116.62 945.835 36.1559 798.67C-45.1052 650.048 24.3375 458.696 116.336 316.471C190.857 201.265 341.959 189.067 467.006 132.596Z"
              fill="#9C6FE4"
            />
          </svg>
          <svg
            class="svg2"
            viewBox="0 0 422 389"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M205.374 8.7358C261.752 10.383 323.63 -4.11215 366.368 32.694C410.935 71.0758 425.47 135.114 420.133 193.688C415.212 247.692 379.683 291.403 339.479 327.793C301.705 361.983 256.206 384.623 205.374 388.072C150.424 391.8 91.4587 385.477 51.7483 347.313C11.4882 308.621 6.04585 249.45 3.1127 193.688C-0.0469032 133.622 -9.70002 63.5939 34.6891 23.0034C78.4897 -17.0489 146.047 7.00245 205.374 8.7358Z"
              fill="#9C6FE4"
            />
          </svg>
          <svg
            class="svg3"
            width="297"
            height="222"
            viewBox="0 0 297 222"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M61.3073 -22.9417C88.2219 -45.5969 123.623 -50.6073 158.797 -51.2766C190.998 -51.8894 224.821 -48.4652 248.377 -26.5016C271.085 -5.32854 270.217 28.1533 276.577 58.5424C284.477 96.2891 308.691 135.757 289.316 169.101C268.574 204.799 223.355 219.04 182.12 221.108C142.251 223.108 106.28 204.102 74.5541 179.875C40.7509 154.062 2.99212 124.646 0.22008 82.2048C-2.5263 40.1561 29.0695 4.19431 61.3073 -22.9417Z"
              fill="#9C6FE4"
              fill-opacity="0.6"
            />
          </svg>
          <svg
            class="svg4"
            width="177"
            height="201"
            viewBox="0 0 177 201"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M105.811 4.5008C134.858 5.34946 166.738 -2.11863 188.758 16.8444C211.719 36.6192 219.208 69.6126 216.458 99.7907C213.923 127.614 195.618 150.135 174.904 168.883C155.442 186.498 132.001 198.163 105.811 199.94C77.5003 201.86 47.1208 198.603 26.6614 178.941C5.91888 159.006 3.1149 128.52 1.6037 99.7907C-0.0241652 68.8436 -4.99758 32.7644 17.8723 11.8517C40.439 -8.78384 75.2452 3.60776 105.811 4.5008Z"
              fill="#9C6FE4"
              fill-opacity="0.6"
            />
          </svg>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
