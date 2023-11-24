/* eslint-disable no-unused-vars */
import "./claimedit.css"
import BoxInput from '../../../components/Elements/BoxInput/BoxInput';
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom/dist";
import axios from "axios";
import Button from "../../../components/Elements/Buttons/Button";
// SweetAlert
import Swal from 'sweetalert2'

const MasterDataClaimEdit = () => {
    const [formData, setFormData] = useState({
        id: '',
        nominal: '',
        keterangan: ''
      })
      const navigate = useNavigate();
      const [isToken, setIstoken] = useState('')
  
      // Data dari params
      const { id } = useParams();

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
            id: formData.id,
            nominal: formData.nominal,
            keterangan: formData.keterangan
          }
    
          const response = await axios.put(`https://treemas-api-403500.et.r.appspot.com/api/master-data/claim-form/edit/${id}`, 
            requestData,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
            });
    
            Swal.fire({
              title: "Success!",
              text: "Claim Updated.",
              icon: "success"
            });
            navigate("/master-data/claim-view");
            console.log('Response from API:', response.data);
          } catch (error) {
            // Jika tidak berhasil, tampilkan pesan error
            console.error('Failed to fetch data:');
            Swal.fire({
              title: "Error!",
              text: "Failed to update claim.",
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
                <p>ID</p>
              </div>
              <div className="form__row__right">
                <BoxInput placeholder="ID" value={formData.id} onChange={(e) => handleInputChange(e, 'id')}/>
              </div>
            </div>
            <div className="form__row">
              <div className="form__row__left">
                <p>Nominal</p>
              </div>
              <div className="form__row__right">
                <BoxInput placeholder="Nominal" value={formData.nominal} onChange={(e) => handleInputChange(e, 'nominal')}/>
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

export default MasterDataClaimEdit