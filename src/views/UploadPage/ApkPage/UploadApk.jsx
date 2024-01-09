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
            <div className="form__container__apk">
                    <div className="form__container__top__apk">
                        <h1>File .apk</h1>
                        <div className="horizontal__line"></div>
                    </div> 
                       
                <form>
                <div className="form__row">
                <div className="form__row__left">
                    <p>File .apk</p>
                </div>

                <div className="form__row__right">
                <Form.Group controlId="formFile">                              
                <Form.Control type="file" />
                </Form.Group>   
                </div>
                </div>

                <div className="form__row__bottom">
                    <Button className="submit__button" text="Submit" onClick={handleSubmit}/>
                 </div>
                </form>
                
            </div>  
        </div>          
        
}

export default UploadApk