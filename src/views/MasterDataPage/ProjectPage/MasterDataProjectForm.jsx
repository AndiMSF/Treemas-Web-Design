/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import "./projectform.css"
import BoxInput from '../../../components/Elements/BoxInput/BoxInput';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom/dist";
import axios from "axios";
import Button from "../../../components/Elements/Buttons/Button";
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import TextArea from "../../../components/Elements/TextArea/TextArea";
import Information from "../../../components/Content/Information/Information"


// eslint-disable-next-line react-refresh/only-export-components
const MasterDataProjectForm = () => {

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
            'https://treemas-api-405402.et.r.appspot.com/api/master-data/claim-form/add',
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
            <div className="projectform__container">
                <div className="content__container">    
                 {/* Display the alert if showAlert is true */}
               {showAlert && (
                      <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                        <Alert.Heading>Project Created</Alert.Heading>
                      </Alert>
                    )}

            <div className="form__container">
                <div className="form__container__top">
                        <h1>Project Form</h1>
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
                                <p>Nama Project <span style={{ color: 'red' }}>*</span></p>
                            </div>
                            <div className="form__row__right">
                            <BoxInput placeholder="Nama Project" value={formData.namaProject} onChange={(e) => handleInputChange(e, 'namaProject')}/>
                        </div>
                     </div>

                        <div className="form__row">
                            <div className="form__row__left">
                                <p>No Telepon</p>
                            </div>
                            <div className="form__row__right">
                            <BoxInput placeholder="No Telepon" value={formData.noTelepon} onChange={(e) => handleInputChange(e, 'noTelepon')}/>
                        </div>
                    </div> 

                        <div className="form__row">
                            <div className="form__row__left">
                                <p>Kota</p>
                            </div>
                            <div className="form__row__right">
                            <BoxInput placeholder="Kota" value={formData.kota} onChange={(e) => handleInputChange(e, 'kota')}/>
                        </div>
                    </div> 

                        <div className="form__row">
                            <div className="form__row__left">
                                <p>Alamat <span style={{ color: 'red' }}>*</span></p>
                            </div>
                            <div className="form__row__right">
                            <TextArea placeholder="Alamat" value={formData.alamat} onChange={(e) => handleInputChange(e, 'alamat')}/>
                        </div>
                    </div> 

                        <div className="form__row">
                            <div className="form__row__left">
                                <p>Latitude <span style={{ color: 'red' }}>*</span></p>
                            </div>
                            <div className="form__row__right">
                            <BoxInput placeholder="Latitude" value={formData.latitude} onChange={(e) => handleInputChange(e, 'latitude')}/>
                        </div>
                    </div> 

                        <div className="form__row">
                            <div className="form__row__left">
                                <p>Longitude <span style={{ color: 'red' }}>*</span></p>
                            </div>
                            <div className="form__row__right">
                            <BoxInput placeholder="Longitude" value={formData.longitude} onChange={(e) => handleInputChange(e, 'longitude')}/>
                        </div>
                    </div> 

                    <div className="form__row">
                        <div className="form__row__left">
                            <p>Biaya Reimburse  <span style={{ color: 'red' }}>*</span></p>
                        </div>
                        <div className="form__row__right">
                        <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Rp.</InputGroup.Text>
                        <Form.Control
                            placeholder="Jumlah"
                            aria-label="Jumlah"
                            aria-describedby="basic-addon1"
                        />
                        </InputGroup>
                        </div>
                    </div> 

                    <div className="form__row">
                        <div className="form__row__left">
                            <p>Jarak Maksimal</p>
                        </div>
                        <div className="form__row__right">
                        <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Jumlah"
                            aria-label="Jumlah"
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Text id="basic-addon2">Meter</InputGroup.Text>
                        </InputGroup>
                        </div>
                    </div> 

                    <div className="form__row">
                        <div className="form__row__left">
                            <p>Total Jam Kerja</p>
                        </div>
                        <div className="form__row__right">
                        <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Jumlah"
                            aria-label="Jumlah"
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Text id="basic-addon2">Jam/Hari</InputGroup.Text>
                        </InputGroup>
                        </div>
                    </div> 

                    <div className="form__row">
                        <div className="form__row__left">
                            <p>Jam Masuk</p>
                        </div>
                        <div className="form__row__right">
                    <Form.Control
                        type="time"
                        placeholder="Jam Masuk"
                        value={formData.jamMasuk}
                        onChange={(e) => handleInputChange(e, 'jamMasuk')}
                    />
                    </div>                        
                    </div> 

                    <div className="form__row">
                        <div className="form__row__left">
                            <p>Jam Keluar</p>
                        </div>
                        <div className="form__row__right">
                    <Form.Control
                        type="time"
                        placeholder="Jam Keluar"
                        value={formData.jamKeluar}
                        onChange={(e) => handleInputChange(e, 'jamKeluar')}
                    />
                  </div>
                    </div>             

                        <div className="form__row__bottom">
                            <Link to="/master-data/claim-view" className="cancel__button" text="Cancel">Cancel</Link>
                            <Button className="submit__button" text="Submit" onClick={handleSubmit}/>                           
                        </div>

                        <Information
                        informationText="Set Location"
                        showDropdown={false}
                        showMaps={true}
                        showInformationBottom={false}
                    />
                    </form>
                </div>
                  
                </div>        
            </div>
        );
    }

export default MasterDataProjectForm