/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import "./jabatanform.css"
import BoxInput from '../../../components/Elements/BoxInput/BoxInput';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom/dist";
import axios from "axios";
import Button from "../../../components/Elements/Buttons/Button";
import Alert from 'react-bootstrap/Alert';
// SweetAlert
import Swal from 'sweetalert2'

const MasterDataJabatanForm = () => {
  const [showAlert, setShowAlert] = useState(false); 
    const [formData, setFormData] = useState({
        jabatanId: '',
        namaJabatan: ''
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
            jabatanId: formData.jabatanId,
            namaJabatan: formData.namaJabatan
          }
    
          const response = await axios.post(
            'https://treemas-api-403500.et.r.appspot.com/api/master-data/jabatan-form/add',
            requestData,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
            });
          Swal.fire({
            title: "Success!",
            text: "Jabatan Added.",
            icon: "success"
          });
          navigate("/master-data/jabatan-view");
          console.log('Response from API:', response.data);
        } catch (error) {
          // Jika tidak berhasil, tampilkan pesan error
          console.error('Failed to fetch data:', data.message);
          Swal.fire({
            title: "Error!",
            text: "Failed to add jabatan.",
            icon: "error"
          });
        }
      }

      return (
        <div className="claim__container">
            <div className="content__container">
              {/* Display the alert if showAlert is true */}
              {showAlert && (
                      <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                        <Alert.Heading>Jabatan Created</Alert.Heading>
                      </Alert>
                    )}
                <div className="form__container">
                    <div className="form__container__top">
                        <h1>Jabatan Form</h1>
                        <div className="horizontal__line"></div>
                    </div>
                    <form>
                    <div className="form__row">
              <div className="form__row__left">
                <p>ID <span style={{ color: 'red' }}>*</span></p>
              </div>
              <div className="form__row__right">
                <BoxInput placeholder="ID" value={formData.jabatanId} onChange={(e) => handleInputChange(e, 'jabatanId')}/>
              </div>
            </div>
            <div className="form__row">
              <div className="form__row__left">
                <p>Nama Jabatan</p>
              </div>
              <div className="form__row__right">
                <BoxInput placeholder="Nama Jabatan " value={formData.namaJabatan} onChange={(e) => handleInputChange(e, 'namaJabatan')}/>
              </div>
            </div>
            <div className="form__row__bottom">
                <Link to="/master-data/jabatan-view" className="cancel__button" text="Cancel">Cancel</Link>
                <Button className="submit__button" text="Submit" onClick={handleSubmit}/>
            </div>
                    </form>
                </div>
            </div>
        </div>
      )

}

export default MasterDataJabatanForm