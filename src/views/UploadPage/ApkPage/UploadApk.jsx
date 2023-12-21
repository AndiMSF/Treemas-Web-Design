import "./apk.css"
import Navbar from "../../../components/Content/Navbar/Navbar"
import Button from "../../../components/Elements/Buttons/Button"
//*import Form from 'react-bootstrap/Form';

const UploadApk = () => {
    return <div className="content__container">            
            <Navbar navbarText="Upload / Apk" />
                <div className="container__ap">
                    <div className="input__container">
                        
                        <div className="left__container__input__apk">
                                <input className="form__control" type="file"></input>
                                <Button text="Submit" className="add__button" />                      
                        </div>
    
                    </div>
                </div>   
        </div>
   
}

export default UploadApk