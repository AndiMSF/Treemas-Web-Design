/* eslint-disable react/prop-types */
import "./dataprofile.css"
import BoxInput from "../../BoxInput/BoxInput"
import { Form } from "react-bootstrap"
import DropdownMenu from "../../../Elements/DropdownMenu/DropdownMenu.jsx"
import { useState } from "react"

const DataProfile = (props) => {
    const itemsAgama = ["Islam","Kristen","Katolik","Buddha","Hindu","Konghucu"]
    const [agama, setAgama] = useState("Pilih")

    const handleAgama = (selectedItem) => {
        setAgama(selectedItem)
    }
  return (
    <div className="data__profile__container" >
        <div onClick={props.onClickProfile} className="section__header">
            <div className="section__header__top">
                <h1>Data Profile</h1>
                <i className={props.showChildrenProfile ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/>
            </div>
            <div className="section__bottom">
                <div className="horizontal__line"></div>
            </div>
        </div>

        {props.showChildrenProfile && (
            <div className="data__profile__children">
                <div className="form__row">
                    <div className="form__row__left">
                        <p>Nama Lengkap <span style={{ color: 'red' }}>*</span></p>
                    </div>          
                    <div className="form__row__right">
                        <BoxInput placeholder="Nama" />    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>No. KTP <span style={{ color: 'red' }}>*</span></p>
                    </div>          
                    <div className="form__row__right">
                        <BoxInput placeholder="No. KTP" />    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>No NPWP </p>
                    </div>          
                    <div className="form__row__right">
                        <BoxInput placeholder="No. NPWP" />    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Email <span style={{ color: 'red' }}>*</span></p>
                    </div>          
                    <div className="form__row__right">
                        <BoxInput placeholder="Email" />    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Tempat Lahir</p>
                    </div>          
                    <div className="form__row__right">
                        <BoxInput placeholder="Tempat Lahir" />    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Tanggal Lahir <span style={{ color: 'red' }}>*</span></p>
                    </div>          
                    <div className="form__row__right">
                        <BoxInput placeholder="Tanggal Lahir" />    
                    </div>
                </div>
                
                <div className="form__row">
                    <div className="form__row__left">
                        <p>Jenis Kelamin <span style={{ color: 'red' }}>*</span></p>
                    </div>
                    <div className="form__row__right__label">
                        {['checkbox'].map((type) => (
                            <div key={`L`}>
                                <Form.Check // prettier-ignore
                                    type={type}
                                    id={`L`}
                                    label={`L`}
                                />

                            </div>
                        ))}

                        {['checkbox'].map((type) => (
                            <div key={`P`}>
                                <Form.Check // prettier-ignore
                                    type={type}
                                    id={`P`}
                                    label={`P`}
                                />

                            </div>
                        ))}
                    </div>

                    
                    
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Golongan Darah</p>
                    </div>
                    <div className="form__row__right__label">
                        {['checkbox'].map((type) => (
                            <div key={`A`}>
                                <Form.Check // prettier-ignore
                                    type={type}
                                    id={`A`}
                                    label={`A`}
                                />

                            </div>
                        ))}

                        {['checkbox'].map((type) => (
                            <div key={`B`}>
                                <Form.Check // prettier-ignore
                                    type={type}
                                    id={`B`}
                                    label={`B`}
                                />

                            </div>
                        ))}

                        {['checkbox'].map((type) => (
                            <div key={`AB`}>
                                <Form.Check // prettier-ignore
                                    type={type}
                                    id={`AB`}
                                    label={`AB`}
                                />

                            </div>
                        ))}

                        {['checkbox'].map((type) => (
                            <div key={`O`}>
                                <Form.Check className="form__check" // prettier-ignore
                                    type={type}
                                    id={`O`}
                                    label={`O`}
                                />

                            </div>
                        ))}

                        
                    </div>
                                     
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Status Perkawinan</p>
                    </div>
                    <div className="form__row__right__label">
                        {['checkbox'].map((type) => (
                            <div key={`Menikah`}>
                                <Form.Check // prettier-ignore
                                    type={type}
                                    id={`Menikah`}
                                    label={`Menikah`}
                                />

                            </div>
                        ))}

                        {['checkbox'].map((type) => (
                            <div key={`Belum Menikah`}>
                                <Form.Check // prettier-ignore
                                    type={type}
                                    id={`Belum Menikah`}
                                    label={`Belum Menikah`}
                                />

                            </div>
                        ))}
                        
                    </div>

                                     
                </div>
                
                <div className="form__row">
                    <div className="form__row__left">
                        <p>Agama</p>
                    </div>         
                    <div className="form__row__right">
                        <DropdownMenu title={agama} onDropdownChange={handleAgama} items={itemsAgama} />    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Jenjang Pendidikan</p>
                    </div>
                    <div className="form__row__right__label">
                        {['checkbox'].map((type) => (
                            <div key={`SMK`}>
                                <Form.Check // prettier-ignore
                                    type={type}
                                    id={`SMK`}
                                    label={`SMK`}
                                />

                            </div>
                        ))}

                        {['checkbox'].map((type) => (
                            <div key={`SMA`}>
                                <Form.Check // prettier-ignore
                                    type={type}
                                    id={`SMA`}
                                    label={`SMA`}
                                />

                            </div>
                        ))}

                        {['checkbox'].map((type) => (
                            <div key={`D-1`}>
                                <Form.Check className="form__check" // prettier-ignore
                                    type={type}
                                    id={`D-1`}
                                    label={`D-1`}
                                />

                            </div>
                        ))}

                        {['checkbox'].map((type) => (
                            <div key={`D-2`}>
                                <Form.Check // prettier-ignore
                                    type={type}
                                    id={`D-2`}
                                    label={`D-2`}
                                />

                            </div>
                        ))}

                        {['checkbox'].map((type) => (
                            <div key={`D-3`}>
                                <Form.Check // prettier-ignore
                                    type={type}
                                    id={`D-3`}
                                    label={`D-3`}
                                />

                            </div>
                        ))}

                    {['checkbox'].map((type) => (
                            <div key={`S-1`}>
                                <Form.Check // prettier-ignore
                                    type={type}
                                    id={`S-1`}
                                    label={`S-1`}
                                />

                            </div>
                        ))}

                    {['checkbox'].map((type) => (
                            <div key={`S-2`}>
                                <Form.Check // prettier-ignore
                                    type={type}
                                    id={`S-2`}
                                    label={`S-2`}
                                />

                            </div>
                        ))}

                    {['checkbox'].map((type) => (
                            <div key={`S-3`}>
                                <Form.Check // prettier-ignore
                                    type={type}
                                    id={`S-3`}
                                    label={`S-3`}
                                />

                            </div>
                        ))}
                    </div>

                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>No Rekening</p>
                    </div>          
                    <div className="form__row__right">
                        <BoxInput placeholder="No. Rekening" />    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Kewarganegaraan</p>
                    </div>
                    <div className="form__row__right__label">
                        {['checkbox'].map((type) => (
                            <div key={`WNA`}>
                                <Form.Check // prettier-ignore
                                    type={type}
                                    id={`WNA`}
                                    label={`WNA`}
                                />

                            </div>
                        ))}

                        {['checkbox'].map((type) => (
                            <div key={`WNI`}>
                                <Form.Check // prettier-ignore
                                    type={type}
                                    id={`WNI`}
                                    label={`WNI`}
                                />

                            </div>
                        ))}
                    </div>

                    
                    
                </div>

            </div> // end children
              
                        
              
        )}
    </div>

  )
}

export default DataProfile