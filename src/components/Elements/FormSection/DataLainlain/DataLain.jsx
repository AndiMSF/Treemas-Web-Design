/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react"
import "./datalain.css"
import { FormControl } from "react-bootstrap"

const DataLainlain = (props) => {
    const [emergencyContact, setEmergencyContact] = useState('')
    const [statusEmergency, setStatusEmergency] = useState('')
    const [alamatEmergency, setAlamatEmergency] = useState('')
    const [telpEmergency, setTelpEmergency] = useState('')
    
  return (
    <div className="data__lain__container">
        <div onClick={props.onClickLain} className="section__header">
            <div className="section__header__top">
                <h1>Data Lain-lain</h1>
                <i className={props.showChildrenLain ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/>
            </div>
            <div className="section__bottom">
            </div>
        </div>

        {props.showChildrenLain && (
            <div className="data__lain__children">
                <div className="form__row">
                    <div className="form__row__left">
                        <p>Kontak Darurat</p>
                    </div>          
                    <div className="form__row__right">
                    <FormControl type="text" placeholder="Kontak Darurat" value={props.onFormData.emergencyContact}
                    onChange={(e) => {
                        setEmergencyContact(e.target.value)
                        props.onEmergencyContactChange(e.target.value)
                    } }/>    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Status Kontak</p>
                    </div>          
                    <div className="form__row__right">
                    <FormControl type="text" placeholder="Status Kontak" value={props.onFormData.statusEmergency}
                    onChange={(e) => {
                        setStatusEmergency(e.target.value)
                        props.onStatusEmergencyChange(e.target.value)
                    } }/>     
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Alamat Kontak</p>
                    </div>          
                    <div className="form__row__right">
                    <FormControl type="text" placeholder="Alamat Kontak" value={props.onFormData.alamatEmergency}
                    onChange={(e) => {
                        setAlamatEmergency(e.target.value)
                        props.onAlamatEmergencyChange(e.target.value)
                    } }/>    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Telp. Darurat</p>
                    </div>          
                    <div className="form__row__right">
                    <FormControl type="text" placeholder="Telepon Darurat" value={props.onFormData.telpEmergency}
                    onChange={(e) => {
                        setTelpEmergency(e.target.value)
                        props.onTelpEmergencyChange(e.target.value)
                    } }/>    
                    </div>
                </div>

            </div>
        )}

    </div>
  )
}

export default DataLainlain