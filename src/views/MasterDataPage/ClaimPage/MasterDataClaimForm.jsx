/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import "./claimform.css"
import BoxInput from '../../../components/Elements/BoxInput/BoxInput';
import TextArea from '../../../components/Elements/TextArea/TextArea';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom/dist";
import axios from "axios";
import Button from "../../../components/Elements/Buttons/Button";
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
// SweetAlert
import Swal from 'sweetalert2'

const MasterDataClaimForm = () => {
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


        try {
          const requestData = {
            namaClaim: formData.namaClaim,
            valueClaim: formData.valueClaim,
            keterangan: formData.keterangan
          }
    
          const response = await axios.post(
            'https://treemas-api-405402.et.r.appspot.com/api/master-data/claim-form/add',
            requestData,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            }
          )
          Swal.fire({
            title: "Success!",
            text: "Claim Added.",
            icon: "success"
          });
          navigate("/master-data/claim-view");
          console.log('Response from API:', response.data);
        } catch (error) {
          // Jika tidak berhasil, tampilkan pesan error
          console.error('Failed to fetch data:', data.message);
          Swal.fire({
            title: "Error!",
            text: "Failed to add claim.",
            icon: "error"
          });
        }
      }

      return (
        <div className="claim__container">
            <div className="content__container">
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
              <InputGroup>
                <InputGroup.Text id="basic-addon1">Rp.</InputGroup.Text>
                <Form.Control
                  placeholder="Nominal"
                  aria-label="Jumlah"
                  aria-describedby="basic-addon1"
                  value={formData.valueClaim} 
                  onChange={(e) => handleInputChange(e, 'valueClaim')}
                />
                </InputGroup>
              </div>
            </div>
            <div className="form__row">
              <div className="form__row__left">
                <p>Keterangan</p>
              </div>
              <div className="form__row__right">
                <TextArea placeholder="Keterangan" value={formData.keterangan} onChange={(e) => handleInputChange(e, 'keterangan')}/>
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