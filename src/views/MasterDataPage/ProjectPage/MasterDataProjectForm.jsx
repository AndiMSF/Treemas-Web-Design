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
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';


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
        setSelectedMap({...formData, [field]: value})
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
            'https://treemas-api-405402.et.r.appspot.com/api/master-data/project-form/add',
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

        const libraries = ['places'];
        const mapContainerStyle = {
            width: "100%", // Lebar peta
            height: "100%", // Tinggi peta
        };

        const [ selectedMap, setSelectedMap ] = useState({
            lat: -6.245112751100955, // default latitude
            lng: 106.67130365294516, // default longitude, 
            address: 'Jl. Boulevard Graha Raya No.9, Pd. Jagung, Kec. Serpong Utara, Kota Tangerang Selatan, Banten 15326, Indonesia'
        })
        const infoMiddleStyles = {
            position: "relative",
            width: "100%", // Lebar information__middle
            height: "700px", // Tinggi information__middle
          };

          const { isLoaded, loadError } = useLoadScript({
            googleMapsApiKey: "AIzaSyBF6HLnBEPixHrgDUsq8p90K3rVZYgiN_I",
            libraries,
          });
        
          if (loadError) {
            return <div>Error loading maps</div>;
          }
        
          if (!isLoaded) {
            return <div>Loading maps</div>;
          }

          const handleMapClick = (e) => {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();

              // Buat URL Geocoding API dengan kunci API dan koordinat latitude-longitude
            const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyA1tH4Nq364y6knELo5DwSWIwyvxNRF2b8`;


              // Lakukan permintaan ke API Geocoding
            fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "OK" && data.results.length > 0) {
                const address = data.results[0].formatted_address;
                setSelectedMap({
                    lat,
                    lng,
                    address,
                });

                console.log("CLICK MAP:", {
                    lat,
                    lng,
                    address,
                });
                } else {
                console.error("Failed to retrieve address from Geocoding API");
                }
            })
            .catch((error) => {
                console.error("Error fetching Geocoding API:", error);
            });
          }

        return (
        <div className="content__container project__container">    
            <div className="form__container project_form__container">
                <div className="form__container__top form__container__top__project">
                        <h1>Project Form</h1>
                        <div className="horizontal__line"></div>        
                </div>

                <div className="form__container__middle">
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
                                <TextArea placeholder="Alamat" value={selectedMap.address} onChange={(e) => handleInputChange(e, 'address')}/>
                            </div>
                        </div> 

                            <div className="form__row">
                                <div className="form__row__left">
                                    <p>Latitude <span style={{ color: 'red' }}>*</span></p>
                                </div>
                                <div className="form__row__right">
                                <BoxInput placeholder="Latitude" value={selectedMap.lat} onChange={(e) => handleInputChange(e, 'lat')}/>
                            </div>
                        </div> 

                            <div className="form__row">
                                <div className="form__row__left">
                                    <p>Longitude <span style={{ color: 'red' }}>*</span></p>
                                </div>
                                <div className="form__row__right">
                                <BoxInput placeholder="Longitude" value={selectedMap.lng} onChange={(e) => handleInputChange(e, 'lng')}/>
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
                </div>             

                <div className="form__row__bottom">
                            <Link to="/master-data/claim-view" className="cancel__button" text="Cancel">Cancel</Link>
                            <Button className="submit__button" text="Submit" onClick={handleSubmit}/>                           
                </div>
            </div>
            <div className="map__container" style={infoMiddleStyles}>
                <div className="map__container__top">
                    <h1>Set Location</h1>
                    <div className="horizontal__line"></div>
                </div>
                    {isLoaded && (
                        <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={10}
                        center={selectedMap}
                        onClick={(e) => handleMapClick(e)}
                        >
                        <MarkerF position={selectedMap} onClick={(e) => handleMapClick(e)}/>
                        </GoogleMap>
                    )}
                
            </div>          
        </div>        
            
        );
    }

export default MasterDataProjectForm