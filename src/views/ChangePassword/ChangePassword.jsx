/* eslint-disable react/no-unknown-property */
import Container from "react-bootstrap/Container"
import Treemas from "../../images/logo-treemas.png"
import { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Swal from "sweetalert2"
import Form from 'react-bootstrap/Form';
import axios from "axios"
import "./changepassword.css"

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState(''); // State untuk nilai NIK
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleLogin = async () => {
        const forgotData = {
          currentPassword : currentPassword,
          newPassword : newPassword,
          confirmPassword : confirmPassword
        };
            
        try {
          const response = await axios.put('https://treemas-api-405402.et.r.appspot.com/api/auth/change-password', 
          forgotData,
          {
            headers : {
                'Content-Type' : 'application/json',
            },
          });
          
          if (response.status === 200) {
              
              // Tangani login yang berhasil, misalnya, simpan token otentikasi di localStorage
              console.log('Berhasil masuk:', response);
            window.location.href = '/login';    

        } else {
            // Tangani kesalahan login di sini, mungkin menampilkan pesan kesalahan
            // Jika tidak berhasil, tampilkan pesan error

            Swal.fire({
              title: "Error!",
              text: "Failed to change.",
              icon: "error"
            });

            console.log(response.data.message);
          }
        } catch (error) {
          // Tangani kesalahan jaringan atau kesalahan server
          // Jika tidak berhasil, tampilkan pesan error
          console.error('Failed to fetch data:');
          Swal.fire({
            title: "Error!",
            text: "Failed to change.",
            icon: "error"
          });
        }   
      };

    
    return ( <Container fluid>
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
                <InputGroup.Text id="basic-addon1">
                  <i className="fas fa-lock"></i>
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Current Password"
                  aria-label="Current Password"
                  aria-describedby="basic-addon1"
                  value={currentPassword} 
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </InputGroup>
              <InputGroup className={`mb-3`}>
                <InputGroup.Text id="basic-addon2">
                  <i className="fas fa-lock"></i>
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="New Password"
                  aria-label="New Password"
                  aria-describedby="basic-addon2"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </InputGroup>
              <InputGroup className={`mb-3`}>
                <InputGroup.Text id="basic-addon3">
                  <i className="fas fa-lock"></i>
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  aria-label="Confirm Password"
                  aria-describedby="basic-addon3"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </InputGroup>
              <p>
                <a href="/login">Back to Login?</a>
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


export default ChangePassword