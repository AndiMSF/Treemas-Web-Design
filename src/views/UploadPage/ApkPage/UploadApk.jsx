import "./apk.css"
import Information from "../../../components/Content/Information/Information"
import Navbar from "../../../components/Content/Navbar/Navbar"
import Button from "../../../components/Elements/Buttons/Button"
import Form from 'react-bootstrap/Form';

const UploadApk = () => {
    return <div className="apk__container">
        <div className="content__container">
            <Navbar navbarText="Upload / Apk" />
                <div className="input__container">
                    <div className="left__container__input__apk">
                            <Form.Group controlId="formFile">
                                <Form.Label>File .apk</Form.Label>
                                <Form.Control type="file" />
                            </Form.Group>
                            <Button text="Submit" className="add__button" />                      
                    </div>
                    <div className="right__container__input">
                    </div>
                </div>
            <Information informationText="Apk" showDropdown={false}/>
        </div>
    </div>
}

export default UploadApk