/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react"
import "./dataalamat.css"
import { Form, FormControl } from "react-bootstrap"

const DataAlamat = (props) => {

    const [alamatKtp, setAlamatKtp] = useState('');
    const [alamatSekarang, setAlamatSekarang] = useState('');
    const [kodePos, setKodePos] = useState('');    
  return (
    <div className="data__alamat__container">
        <div onClick={props.onClickAlamat} className="section__header">
            <div className="section__header__top">
                <h1>Data Alamat</h1>
                <i className={props.showChildrenAlamat ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/>
            </div>
            <div className="section__bottom">
            </div>
        </div>

        {props.showChildrenAlamat && (
            <div className="data__alamat__children">
                <div className="form__row">
                    <div className="form__row__left">
                        <p>Alamat KTP</p>
                    </div>          
                    <div className="form__row__right">
                    <Form.Control 
                    value={props.onFormData.alamatKtp} 
                    onChange={(e) => {
                        setAlamatKtp(e.target.value)
                        props.onAlamatKtpChange(e.target.value)
                    }} 
                    as="textarea" 
                    aria-label="With textarea" 
                    placeholder="Alamat KTP"
                    />    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Alamat Sekarang</p>
                    </div>          
                    <div className="form__row__right">
                    <Form.Control 
                    value={props.onFormData.alamatSekarang} 
                    onChange={(e) => {
                        setAlamatSekarang(e.target.value)
                        props.onAlamatSekarangChange(e.target.value)
                    }} 
                    as="textarea" 
                    aria-label="With textarea" 
                    placeholder="Alamat Sekarang"
                    />    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Kode Pos</p>
                    </div>          
                    <div className="form__row__right">
                    <FormControl type="text" placeholder="Kode Pos" value={props.onFormData.kodePos}
                    onChange={(e) => {
                        setKodePos(e.target.value)
                        props.onKodePosChange(e.target.value)
                    } }/>       
                    </div>
                </div>

            </div>
        )}
    </div>
  )
}

export default DataAlamat