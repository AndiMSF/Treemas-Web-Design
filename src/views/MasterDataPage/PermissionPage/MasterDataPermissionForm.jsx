/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import "./permissionform.css"
import BoxInput from '../../../components/Elements/BoxInput/BoxInput';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom/dist";
import axios from "axios";
import Button from "../../../components/Elements/Buttons/Button";
import  Alert from 'react-bootstrap/Alert';
// SweetAlert
import Swal from 'sweetalert2'

const MasterDataPermissionForm = () => {
  const [showAlert, setShowAlert] = useState(false);
    const [formData, setFormData] = useState({
        namaPermission: ''
      })
      const navigate = useNavigate();
      const [isToken, setIstoken] = useState('')
    
      // Check siapa yang akses
      useEffect(() => {
        const token = localStorage.getItem("authToken")
        if (token) {
          setIstoken(token)
          console.log('Token: '+token);
        }else{
          navigate("/login");
        }
      }, [navigate])
    
      const handleInputChange = (event, field) => {
        const {value} = event.target
        setFormData({...formData, [field]: value})
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("authToken");

          if (!token) {
            console.error('Token is not available');
            return navigate("/login");
          }

        try {
          const requestData = {
            namaPermission: formData.namaPermission
          }
    
          const response = await axios.post(
            'https://treemas-api-405402.et.r.appspot.com/api/master-data/permission-form/add',
            requestData,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
            });
          Swal.fire({
            title: "Success!",
            text: "Permission Added.",
            icon: "success"
          });
          navigate("/master-data/permission-view");
          console.log('Response from API:', response.data);
        } catch (error) {
          // Jika tidak berhasil, tampilkan pesan error
          console.error('Failed to fetch data:', data.message);
          Swal.fire({
            title: "Error!",
            text: "Failed to add permission.",
            icon: "error"
          });
        }
      }
      
      return (
            <div className="content__container">
              {/* Display the alert if showAlert is true */}
              {showAlert && (
                      <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                        <Alert.Heading>Permission Created</Alert.Heading>
                      </Alert>
                    )}
                <div className="form__container">
                    <div className="form__container__top">
                        <h1>Permission Form</h1>
                        <div className="horizontal__line"></div>
                    </div>
                    <form>
                    <div className="form__row">
              <div className="form__row__left">
                <p>Nama Permission <span style={{ color: 'red' }}>*</span></p>
              </div>
              <div className="form__row__right">
                <BoxInput placeholder="Nama Permission" value={formData.namaPermission} onChange={(e) => handleInputChange(e, 'namaPermission')}/>
              </div>
            </div>
            <div className="form__row__bottom">
                <Link to="/master-data/permission-view" className="cancel__button" text="Cancel">Cancel</Link>
                <Button className="submit__button" text="Submit" onClick={handleSubmit}/>
            </div>
                    </form>
                </div>
            </div>
      )

}


export default MasterDataPermissionForm