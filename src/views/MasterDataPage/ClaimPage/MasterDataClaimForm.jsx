/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import "./claimform.css"
import BoxInput from '../../../components/Elements/BoxInput/BoxInput';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom/dist";
import axios from "axios";
import Button from "../../../components/Elements/Buttons/Button";
import Alert from 'react-bootstrap/Alert';

const MasterDataClaimForm = () => {
  const [showAlert, setShowAlert] = useState(false); // State to manage alert visibility
    const [formData, setFormData] = useState({
        namaClaim: '',
        valueClaim: '',
        keterangan: ''
      })
      const navigate = useNavigate();
      const [isToken, setIstoken] = useState('')
    
      // Check siapa yang akses
      useEffect(() => {
        const token = localStorage.getItem("authToken")
        if (token) {
          setIstoken(token)
          
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
    
        try {
          const requestData = {
            namaClaim: formData.namaClaim,
            valueClaim: formData.valueClaim,
            keterangan: formData.keterangan
          }
    
          const response = await axios.post(
            'https://treemas-api-403500.et.r.appspot.com/api/master-data/claim-form/add',
            requestData,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+isToken
              }
            }
          )
          console.log('Response from API:', response.data);
          // Display the alert
          setShowAlert(true);

          // Hide the alert after a few seconds (adjust the timeout as needed)
          setTimeout(() => {
            setShowAlert(false);
            navigate("/master-data/claim-view", { state: { showAlert } });

          }, 3000);
          
        } catch (error) {
          console.log("Failed To Create Announcement "+error);
        }
      }

      return (
        <div className="claim__container">
            <div className="content__container">
               {/* Display the alert if showAlert is true */}
               {showAlert && (
                      <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                        <Alert.Heading>Claim Created</Alert.Heading>
                      </Alert>
                    )}
                <div className="form__container">
                    <div className="form__container__top">
                        <h1>Claim Form</h1>
                        <div className="horizontal__line"></div>
                    </div>
                    <form>
                    <div className="form__row">
              <div className="form__row__left">
              <p>ID <span style={{ color: 'red' }}>*</span></p>
              </div>
              <div className="form__row__right">
                <BoxInput placeholder="ID" value={formData.id} onChange={(e) => handleInputChange(e, 'namaClaim')}/>
              </div>
            </div>
            <div className="form__row">
              <div className="form__row__left">
                <p>Nominal <span style={{ color: 'red' }}>*</span></p>
              </div>
              <div className="form__row__right">
                <BoxInput placeholder="Nominal" value={formData.nominal} onChange={(e) => handleInputChange(e, 'valueClaim')}/>
              </div>
            </div>
            <div className="form__row">
              <div className="form__row__left">
                <p>Keterangan</p>
              </div>
              <div className="form__row__right">
                <BoxInput placeholder="Keterangan" value={formData.keterangan} onChange={(e) => handleInputChange(e, 'keterangan')}/>
              </div>
            </div> 
            <div className="form__row__bottom">
                <Link to="/master-data/claim-view" className="cancel__button" text="Cancel">Cancel</Link>
                <Button className="submit__button" text="Submit" onClick={handleSubmit}/>
            </div>
                    </form>

                </div>
            </div>
        </div>
      )

}

export default MasterDataClaimForm