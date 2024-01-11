/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import "./cutiform.css"
import BoxInput from '../../../components/Elements/BoxInput/BoxInput';
import TextArea from '../../../components/Elements/TextArea/TextArea';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom/dist";
import axios from "axios";
import Button from "../../../components/Elements/Buttons/Button";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Swal from "sweetalert2";
import HashLoader from "react-spinners/HashLoader";

const MasterDataCutiForm = () => {
    const [formData, setFormData] = useState({
        id: '',
        value: '',
        cutiDesc: ''
      })
      const navigate = useNavigate();
      const [isToken, setIstoken] = useState('')
      const [loading, setLoading] = useState(false);

      // Check local storage for the loading state when the component mounts
    useEffect(() => {
      const storedLoadingState = localStorage.getItem("loadingState");
      if (storedLoadingState) {
          setLoading(JSON.parse(storedLoadingState));
      }
    }, []);

    // Save the loading state to local storage whenever it changes
    useEffect(() => {
      localStorage.setItem("loadingState", JSON.stringify(loading));
    }, [loading]);

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
        setLoading(true);

        try {
          const requestData = {
            id: formData.id,
            value: formData.value,
            cutiDesc: formData.cutiDesc
          }
    
          const response = await axios.post(
            'https://treemas-api-405402.et.r.appspot.com/api/master-data/cuti-form/add',
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
            text: "Cuti Added.",
            icon: "success"
          });
          navigate("/master-data/cuti-view");
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
            <div className="content__container">
              {loading && (
              <div className="loading-overlay">
                  <HashLoader loading={loading} size={90} color="#d6e0de"/>
              </div>
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
              <InputGroup>
              <Form.Control
                placeholder="Jumlah"
                aria-label="Jumlah"
                aria-describedby="basic-addon2"
                value={formData.value} 
                onChange={(e) => handleInputChange(e, 'value')}
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
                <TextArea placeholder="Keterangan" value={formData.cutiDesc} onChange={(e) => handleInputChange(e, 'cutiDesc')}/>
              </div>
            </div> 
            <div className="form__row__bottom">
                <Link to="/master-data/cuti-view" className="cancel__button" text="Cancel">Cancel</Link>
                <Button className="submit__button" text="Submit" onClick={handleSubmit}/>
            </div>
                    </form>
                </div>
            </div>
      )

}

export default MasterDataCutiForm

