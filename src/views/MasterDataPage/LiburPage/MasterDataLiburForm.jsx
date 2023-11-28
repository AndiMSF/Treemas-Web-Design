import "./liburform.css"
import BoxInput from "../../../components/Elements/BoxInput/BoxInput"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom/dist";
import axios from "axios";
import Button from "../../../components/Elements/Buttons/Button";
import Alert from 'react-bootstrap/Alert';

        
const MasterDataLiburForm = () => {
  const [showAlert, setShowAlert] = useState(false);
    const [formData, setFormData] = useState({
        tglLibur: '',
        keterangan: ''
      })
      const [cutiBersama, setCutiBersama] = useState(false); // State untuk checkbox Cuti Bersama  

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
            tglLibur: formData.tanggalLibur,
            keterangan: formData.keterangan
          }
    
          const response = await axios.post(
            'https://treemas-api-403500.et.r.appspot.com/api/master-data/libur-form/add',
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
            navigate("/master-data/libur-view", { state: { showAlert } });

          }, 3000);

        } catch (error) {
          console.log("Failed To Create Announcement "+error);
        }
      }

      return (
        <div className="libur__container">
            <div className="content__container">
               {/* Display the alert if showAlert is true */}
               {showAlert && (
                      <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                        <Alert.Heading>Libur Created</Alert.Heading>
                      </Alert>
                    )}
                <div className="form__container">
                    <div className="form__container__top">
                        <h1>Libur Form</h1>
                        <div className="horizontal__line"></div>
                    </div>
                    <form>
                    <div className="form__row">
              <div className="form__row__left">
                <p>Tanggal Libur<span style={{ color: 'red' }}>*</span></p>
              </div>
              <div className="form__row__right">
              <BoxInput placeholder="Tanggal Libur" value={formData.idLibur} onChange={(e) => handleInputChange(e, 'idLibur')}/>
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
            <div className="form__row">
              <div className="form__row__left">
                <p>Cuti Bersama</p>
              </div>
              <div className="form__row__right">
                <input
                  type="checkbox"
                  checked={cutiBersama}
                  onChange={(e) => setCutiBersama(e.target.checked)}
                />
              </div>
            </div>
            <div className="form__row__bottom">
                <Link to="/master-data/libur-view" className="cancel__button" text="Cancel">Cancel</Link>
                <Button className="submit__button" text="Submit" onClick={handleSubmit}/>
            </div>
                    </form>
                </div>
            </div>
        </div>
      )

}

export default MasterDataLiburForm