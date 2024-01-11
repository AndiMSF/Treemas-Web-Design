/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import Container from "react-bootstrap/Container";
import Treemas from "../../images/logo-treemas.png";
import { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "./changepassword.css";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(""); // State for password error
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  const navigate = useNavigate();

  const handleChangePassword = async () => {
    const token = localStorage.getItem("authToken");
    const changeData = {
      newPassword: newPassword,
      confPassword: confirmPassword,
    };

    try {
      if (token) {
        const response = await axios.put(
          "http://localhost:8081/api/auth/change-password",
          changeData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.data.success === true) {
          // Tangani login yang berhasil, misalnya, simpan token otentikasi di localStorage
          console.log("Berhasil masuk:", response);
          navigate("/login");
        } else {
          // Tangani kesalahan login di sini, mungkin menampilkan pesan kesalahan
          // Jika tidak berhasil, tampilkan pesan error

          Swal.fire({
            title: "Error!",
            text: response.data.message,
            icon: "error",
          });

          console.log(response.data.message);
        }
      } else {
        navigate("/");
      }
    } catch (error) {
      // Tangani kesalahan jaringan atau kesalahan server
      // Jika tidak berhasil, tampilkan pesan error
      console.error("Failed to fetch data:");
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
      });
    }
  };

  return (
    <Container fluid>
      <div className={`changepass__container row`}>
        <div className="left__container__change">
          <div className="logo">
            <img src={Treemas} alt="logo" />
          </div>
          <div className="login__form">
            <div className="login__form__header">
              <h1>Change Password</h1>
              <p>Enter your password</p>
            </div>
            <form>
              <InputGroup className={`mb-3`}>
                <InputGroup.Text id="basic-addon2">
                  <i className="fas fa-lock"></i>
                </InputGroup.Text>
                <Form.Control
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  aria-label="New Password"
                  aria-describedby="basic-addon2"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {/* Add a button/icon to toggle password visibility */}
                <InputGroup.Text
                  id="toggle-password"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  style={{ cursor: "pointer" }}
                >
                  <FontAwesomeIcon
                    icon={showNewPassword ? faEye : faEyeSlash}
                  />
                </InputGroup.Text>
              </InputGroup>
              <InputGroup className={`mb-3`}>
                <InputGroup.Text id="basic-addon3">
                  <i className="fas fa-lock"></i>
                </InputGroup.Text>
                <Form.Control
                  type={showConfPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  aria-label="Confirm Password"
                  aria-describedby="basic-addon3"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {/* Add a button/icon to toggle password visibility */}
                <InputGroup.Text
                  id="toggle-password"
                  onClick={() => setShowConfPassword(!showConfPassword)}
                  style={{ cursor: "pointer" }}
                >
                  <FontAwesomeIcon
                    icon={showConfPassword ? faEye : faEyeSlash}
                  />
                </InputGroup.Text>
              </InputGroup>
              <p>
                <a onClick={() => navigate("/login")}>Back to Login?</a>
              </p>
              <button
                className="login__button"
                type="button"
                onClick={handleChangePassword}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ChangePassword;
