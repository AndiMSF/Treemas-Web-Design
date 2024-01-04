/* eslint-disable no-unused-vars */
import "./apk.css"
import Navbar from "../../../components/Content/Navbar/Navbar"
import Button from "../../../components/Elements/Buttons/Button"
import Form from 'react-bootstrap/Form';
//*import Form from 'react-bootstrap/Form';

const UploadApk = () => {
    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("authToken");
    }

    return <div className="content__container">            
            <Navbar navbarText="Upload / Apk" />
                <div className="container__ap">
                    <div className="input__container">
                        
                        <div className="left__container__input__apk">
                            <p>Upload .Apk</p>                      
                            <Form.Group controlId="formFile">                              
                            <Form.Control type="file" />
                            </Form.Group>            
                        </div>
    
                        <div className="form__row__bottom">                
                        <Button className="submit__button" text="Submit" onClick={handleSubmit}/>
                        </div>   

                    </div>
                </div>   
        </div>
   
}

export default UploadApk