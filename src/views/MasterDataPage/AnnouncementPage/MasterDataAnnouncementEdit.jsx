/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import "./announcementedit.css"
import { Form } from 'react-bootstrap';
import BoxInput from '../../../components/Elements/BoxInput/BoxInput';
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom/dist";
import axios from "axios";
import Button from "../../../components/Elements/Buttons/Button";
// SweetAlert
import Swal from 'sweetalert2'

const MasterDataAnnouncementEdit = () => {
    const [formData, setFormData] = useState({
      title: '',
      header: '',
      note: '',
      footer: '',
      image64: null,
      image: '',     
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

      const handleImageUpload = (e) => {
        const file = e.target.files[0]; // Mendapatkan file yang diunggah dari input
    
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            // Konversi gambar ke base64 dan simpan dalam state formData
            setFormData({ ...formData, image64: event.target.result, image: file.name });
          };
          reader.readAsDataURL(file);
        }
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
            title: formData.title,
            header: formData.header,
            note: formData.note,
            image64: formData.image64, // Gunakan data base64 yang telah diambil dari input file
            image: formData.image,
          }
    
          const response = await axios.put(`https://treemas-api-403500.et.r.appspot.com/api/master-data/announcement-form/edit/${id}`, 
            requestData,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
            });
    
            Swal.fire({
              title: "Success!",
              text: "Announcement Updated.",
              icon: "success"
            });
            navigate("/master-data/announcement-view");
            console.log('Response from API:', response.data);
          } catch (error) {
            // Jika tidak berhasil, tampilkan pesan error
            console.error('Failed to fetch data:');
            Swal.fire({
              title: "Error!",
              text: "Failed to update announcement.",
              icon: "error"
            });
          }
      }

      return (
        <div className="announcementform__container">
          <div className="content__container">
            <div className="form__container">
              {/* Form Container Top */}
              <div className="form__container__top">
                <h1>Announcement Edit</h1>
                <div className="horizontal__line"></div>
              </div>       
                <div className="form__row">
                  <div className="form__row__left">
                    <p>Title</p>
                  </div>
                  <div className="form__row__right">
                    <BoxInput placeholder="Title" value={formData.title} onChange={(e) => handleInputChange(e, 'title')}/>
                  </div>
                </div>
                <div className="form__row">
                  <div className="form__row__left">
                    <p>Header</p>
                  </div>
                  <div className="form__row__right">
                    <BoxInput placeholder="Header" value={formData.header} onChange={(e) => handleInputChange(e, 'header')}/>
                  </div>
                </div>
                <div className="form__row">
                  <div className="form__row__left">
                    <p>Footer</p>
                  </div>
                  <div className="form__row__right">
                    <BoxInput placeholder="Footer" value={formData.footer} onChange={(e) => handleInputChange(e, 'footer')}/>
                  </div>
                </div>
                <div className="form__row">
                  <div className="form__row__left">
                    <p>Body</p>
                  </div>
                  <div className="form__row__right">
                    <BoxInput placeholder="Body" value={formData.note} onChange={(e) => handleInputChange(e, 'note')}/>
                  </div>
                </div>
                <div className="form__row">
                  <Form.Group class="upload" controlId="formFile">
                    <div className="form__row__left">
                      <Form.Label>Gambar</Form.Label>
                    </div>
                    <div className="form__row__right">
                      <Form.Control type="file" onChange={handleImageUpload} />
                    </div>
                  </Form.Group>
                </div>
    
                {/* Form BOTTOM */}
                <div className="form__row__bottom">
                    <Link to="/master-data/announcement-view" className="cancel__button" text="Cancel">Cancel</Link>
                    <Button className="submit__button" text="Submit" onClick={handleSubmit}/>
                </div>
              
            </div>
          </div>
        </div>
      );
    };    

export default MasterDataAnnouncementEdit
