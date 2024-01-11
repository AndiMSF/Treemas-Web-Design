/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Treemas from "../../images/logo-treemas.png";
import "./auth.css";
import { useNavigate } from "react-router-dom";

const ForgotPass = () => {
  const [email, setEmail] = useState(""); // State untuk nilai NIK
  const navigate = useNavigate();

  const handleLogin = async () => {
    const forgotData = {
      email: email,
    };

    try {
      const response = await axios.put(
        "http://localhost:8081/api/auth/forgot-password",
        forgotData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Tangani login yang berhasil, misalnya, simpan token otentikasi di localStorage
        console.log("Berhasil masuk:", response);
        window.location.href = "/login";
      } else {
        // Tangani kesalahan login di sini, mungkin menampilkan pesan kesalahan
        // Jika tidak berhasil, tampilkan pesan error

        Swal.fire({
          title: "Error!",
          text: "Failed to change.",
          icon: "error",
        });

        console.log(response.data.message);
      }
    } catch (error) {
      // Tangani kesalahan jaringan atau kesalahan server
      // Jika tidak berhasil, tampilkan pesan error
      console.error("Failed to fetch data:");
      Swal.fire({
        title: "Error!",
        text: "Failed to change.",
        icon: "error",
      });
    }
  };

  return (
    <Container fluid>
      <div className={`forgotpass__container row`}>
        <div className="left__container col-sm-12 col-md-12 col-lg-6">
          <div className="logo">
            <img src={Treemas} alt="logo" />
          </div>
          <div className="login__form">
            <div className="login__form__header">
              <h1>Forgot Password</h1>
              <p>Enter your email details</p>
            </div>
            <form>
              <InputGroup className={`mb-3`}>
                <InputGroup.Text id="basic-addon1">
                  <i className="fas fa-envelope"></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="basic-addon1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
              <p>
                <a
                  onClick={() => navigate("/login")}
                  className="forgot__password"
                >
                  Back to Login?
                </a>
              </p>
              <button
                className="login__button"
                type="button"
                onClick={handleLogin}
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

export default ForgotPass;
