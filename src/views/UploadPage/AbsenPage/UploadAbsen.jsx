import "./absen.css"
import Information from "../../../components/Content/Information/Information"
import Navbar from "../../../components/Content/Navbar/Navbar"
import BoxInput from "../../../components/Elements/BoxInput/BoxInput"
import Button from "../../../components/Elements/Buttons/Button"
import Form from 'react-bootstrap/Form';


const UploadAbsen = () => {
    const infoTopFields = ["NIK", "Nama Lengkap", "Tanggal", "Project", "Status"]

    return <div className="absen__container">
        <div className="content__container">
            <Navbar navbarText="Upload / Absen" />
                <div className="input__container">
                    <div className="left__container__input__absen">
                        <div className="top__container__input">
                            <Form.Group controlId="formFile">
                                <Form.Label>File Xlsx</Form.Label>
                                <Form.Control type="file" />
                            </Form.Group>
                        </div>
                        <div className="bottom__container__input__absen">
                            <BoxInput placeholder="Nama" />
                            <BoxInput placeholder="Tanggal" />
                            <Button text="Pencarian" className="search__button" />
                        </div>
                        
                    </div>
                    <div className="right__container__input">
                        <Button text="Unduh" className="add__button" />
                    </div>
                </div>
            <Information informationText="Absen" showDropdown={false} fields={infoTopFields}/>
        </div>
    </div>
}

export default UploadAbsen