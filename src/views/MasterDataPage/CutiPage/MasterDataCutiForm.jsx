/* eslint-disable react/jsx-no-undef */
import "./cutiform.css"
import BoxInput from '../../../components/Elements/BoxInput/BoxInput';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom/dist";
import axios from "axios";
import Button from "../../../components/Elements/Buttons/Button";
import { Alert } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const MasterDataCutiForm = () => {
  const [showAlert, setShowAlert] = useState(false)
    const [formData, setFormData] = useState({
        id: '',
        value: '',
        cutiDesc: ''
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
    
        try {
          const requestData = {
            id: formData.id,
            value: formData.value,
            cutiDesc: formData.cutiDesc
          }
    
          const response = await axios.post(
            'https://treemas-api-403500.et.r.appspot.com/api/master-data/cuti-form/add',
            requestData,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+isToken
              }
            }
          )
          console.log('Response from API:', response.data);
          setShowAlert(true);

          setTimeout(() => {
            setShowAlert(false);
            navigate("/master-data/cuti-view", { state: { showAlert } });
          },3000);

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
                        <Alert.Heading>Cuti Created</Alert.Heading>
                      </Alert>
                    )}
                <div className="form__container">
                    <div className="form__container__top">
                        <h1>Cuti Form</h1>
                        <div className="horizontal__line"></div>
                    </div>
                    <form>
                    <div className="form__row">
              <div className="form__row__left">
                <p>ID <span style={{ color: 'red' }}>*</span></p>
              </div>
              <div className="form__row__right">
                <BoxInput placeholder="ID" value={formData.id} onChange={(e) => handleInputChange(e, 'id')}/>
              </div>
            </div>
            <div className="form__row">
              <div className="form__row__left">
                <p>Jumlah <span style={{ color: 'red' }}>*</span></p>
              </div>
              <div className="form__row__right">
              <InputGroup className="mb-3">
              <Form.Control
                placeholder="Jumlah"
                aria-label="Jumlah"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Text id="basic-addon2">Hari</InputGroup.Text>
            </InputGroup>
              </div>
            </div>
            <div className="form__row">
              <div className="form__row__left">
                <p>Keterangan</p>
              </div>
              <div className="form__row__right">
                <BoxInput placeholder="Keterangan" value={formData.cutiDesc} onChange={(e) => handleInputChange(e, 'cutiDesc')}/>
              </div>
            </div> 
            <div className="form__row__bottom">
                <Link to="/master-data/cuti-view" className="cancel__button" text="Cancel">Cancel</Link>
                <Button className="submit__button" text="Submit" onClick={handleSubmit}/>
            </div>
                    </form>
                </div>
            </div>
        </div>
      )

}

export default MasterDataCutiForm

