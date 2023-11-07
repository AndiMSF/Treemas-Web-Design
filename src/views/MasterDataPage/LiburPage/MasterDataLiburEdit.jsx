import "./liburedit.css"
import BoxInput from "../../../components/Elements/BoxInput/BoxInput"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom/dist";
import axios from "axios";
import Button from "../../../components/Elements/Buttons/Button";

const MasterDataLiburEdit = () => {
    const [formData, setFormData] = useState({
        tanggalLibur: '',
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
    
        try {
          const requestData = {
            tanggalLibur: formData.tanggalLibur,
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
          console.log('Response from API:', response.data);
        } catch (error) {
          console.log("Failed To Create Announcement "+error);
        }
      }

      return (
        <div className="claim__container">
            <div className="content__container">
                <div className="form__container">
                    <div className="form__container__top">
                        <h1>Libur Form</h1>
                        <div className="horizontal__line"></div>
                    </div>
                    <form>
                    <div className="form__row">
              <div className="form__row__left">
                <p>Tanggal Libur</p>
              </div>
              <div className="form__row__right">
                <BoxInput placeholder="Tanggal Libur" value={formData.tanggalLibur} onChange={(e) => handleInputChange(e, 'title')}/>
              </div>
            </div>
            <div className="form__row">
              <div className="form__row__left">
                <p>Keterangan</p>
              </div>
              <div className="form__row__right">
                <BoxInput placeholder="Keterangan" value={formData.keterangan} onChange={(e) => handleInputChange(e, 'header')}/>
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

export default MasterDataLiburEdit