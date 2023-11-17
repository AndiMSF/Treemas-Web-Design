import "./generalform.css"
import BoxInput from "../../../components/Elements/BoxInput/BoxInput"
import TextArea from "../../../components/Elements/TextArea/TextArea"
import Button from "../../../components/Elements/Buttons/Button"
import axios from "axios";
import {Link, useNavigate} from "react-router-dom/dist";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { Form } from "react-bootstrap";

const ParameterGeneralForm = () => {
    const [showAlert, setShowAlert] = useState(false)
    const [formData, setFormData] = useState({
        id: '',
        tipeData: '',
        value: '',
        keterangan: ''
    })
    const navigate = useNavigate();
    const [isToken, setIstoken] = useState('')

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
        const {value} =event.target
        setFormData({...formData, [field]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const requestData = {
                id: formData.id,
                tipeData: formData.tipeData,
                value: formData.value,
                keterangan: formData.keterangan
            }

            const response = await axios.post(
                '', 
                requestData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer '+isToken
                    }
                }
                )
                console.log('Response from API:',response.data);
                setShowAlert(true);

                setTimeout(() => {
                    setShowAlert(false);
                    navigate("/parameter/general-view", { state: { showAlert } });
                },3000);

            } catch (error) {
                console.log("Failed To Create Announcement "+error);
            }   
        }

        return (
            <div className="general__container">
                <div className="content__container">
                {/* Display the alert if showAlert is true */}
                {showAlert && (
                        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                            <Alert.Heading>General Created</Alert.Heading>
                        </Alert>
                        )}
                    <div className="form__container">
                        <div className="form__container__top">
                            <h1>General Form</h1>
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
                    <p>Tipe Data <span style={{ color: 'red' }}>*</span></p>
                </div>
              <div className="form__row__right__label">
                        {['checkbox'].map((type) => (
                            <div key={`character`}>
                                <Form.Check // prettier-ignore
                                    type={type}
                                    id={`Character`}
                                    label={`character`}
                                />

                            </div>
                        ))}

                        {['checkbox'].map((type) => (
                            <div key={`Numeric`}>
                                <Form.Check // prettier-ignore
                                    type={type}
                                    id={`Numeric`}
                                    label={`Numeric`}
                                />

                            </div>
                        ))}
                    </div>                                    
                </div>

                <div className="form__row">
                <div className="form__row__left">
                    <p>Value</p>
                </div>
                <div className="form__row__right">
                    <BoxInput placeholder="Value" value={formData.value} onChange={(e) => handleInputChange(e, 'value')}/>
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
                    <Link to="/parameter/general-form/edit" className="cancel__button" text="Cancel">Cancel</Link>
                    <Button className="submit__button" text="Submit" onClick={handleSubmit}/>
                </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    
export default ParameterGeneralForm 