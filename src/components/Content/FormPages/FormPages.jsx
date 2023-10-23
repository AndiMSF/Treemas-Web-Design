/* eslint-disable react/prop-types */
import "./form.css"
import BoxInput from "../../Elements/BoxInput/BoxInput.jsx"
import TextArea from "../../Elements/TextArea/TextArea"
import Button from "../../Elements/Buttons/Button.jsx"
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import DataProfile from "../../Elements/FormSection/DataProfile/DataProfile";
import DataKaryawan from "../../Elements/FormSection/DataKaryawan/DataKaryawan";
import TambahFoto from "../../Elements/FormSection/TambahFoto/TambahFoto";
import DataLain from "../../Elements/FormSection/DataLainlain/DataLain";
import DataAlamat from "../../Elements/FormSection/DataAlamat/DataAlamat";

const FormPages = (props) => {
       

  return (
    <div className="form__container">
        <div className="form__container__top">
            <h1>{props.formTitle}</h1>
            <div className="horizontal__line"></div>
        </div>
        <div className={`${!(props.showDataProfile || props.showDataKaryawan || props.showTambahFoto || props.showDataAlamat) ? 'form__container__middle' : 'form__flex__section'}`}>
            {props.boxInput && props.boxInput.map((boxInput, index) => (
                <div className="form__row" key={index}>
                    <div className="form__row__left">
                        <p>{boxInput}</p>
                    </div>          
                    <div className="form__row__right">
                        <BoxInput placeholder={boxInput} />    
                    </div>
                </div>
            ))}

            {props.textArea && props.textArea.map((textArea, index) => (
                <div className="form__row" key={index}>
                    <div className="form__row__left">
                        <p>{textArea}</p>
                    </div>          
                    <div className="form__row__right">
                        <TextArea placeholder={textArea} />    
                    </div>
                </div>
            ))}
            
            {props.showUpload && props.image.map((image, index) => (
                <div className="form__row" key={index}>
                    <Form.Group class="upload" controlId="formFile">
                        <div className="form__row__left">
                            <Form.Label>{image}</Form.Label>
                        </div>
                        <div className="form__row__right">
                            <Form.Control type="file" />
                        </div>
                    </Form.Group>
                </div>
            ))}

            <div className="middle__left">
                {/* Kalau Show Data Profile true */}
                {props.showDataProfile && <DataProfile showChildrenProfile={props.showChildrenProfile} onClickProfile={props.onClickProfile} />}
                
                {/* Kalau Show Data Data Alamat true */}
                {props.showDataAlamat && <DataAlamat showChildrenAlamat={props.showChildrenAlamat} onClickAlamat={props.onClickAlamat}/>}
                
                 {/* Kalau Show Data Lain-Lain true */}
                {props.showDataLain && <DataLain showChildrenLain={props.showChildrenLain} onClickLain={props.onClickLain} />}
            </div>
            
            <div className="middle__right">
                {/* Kalau Show Data Karyawan true */}
                {props.showDataKaryawan && <DataKaryawan showChildrenKaryawan={props.showChildrenKaryawan} onClickKaryawan={props.onClickKaryawan} />}

               {/* Kalau Show Data Tambah Foto true */}
               {props.showTambahFoto && <TambahFoto showChildrenFoto={props.showChildrenFoto} onClickFoto={props.onClickFoto} />}
            </div>
            
        </div>
        <div className="form__row__bottom">
            <Link to={props.to} className="cancel__button" text="Cancel">Cancel</Link>
            <Button className="submit__button" text="Submit"/>
        </div>
    </div>
  )
}

export default FormPages