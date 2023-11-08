/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import "./datakaryawan.css"
import BoxInput from "../../BoxInput/BoxInput"
import DropdownMenu from "../../../Elements/DropdownMenu/DropdownMenu.jsx"
import { useState } from "react"
import { Form } from "react-bootstrap"

const DataKaryawan = (props) => {
    const itemsJabatan = ["-"]
    const [jabatan, setJabatan] = useState("Pilih")
    const itemsProject = ["-"]
    const [project, setProject] = useState("Pilih")

    const handleJabatan = (selectedItem) => {
        setJabatan(selectedItem)
    }
    const handleProject = (selectedItem) => {
        setProject(selectedItem)    
    }

  return (
    <div className="data__karyawan__container">
        <div onClick={props.onClickKaryawan} className="section__header">
            <div className="section__header__top">
                <h1>Data Karyawan</h1>
                <i className={props.showChildrenKaryawan ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/>
            </div>
            <div className="section__bottom">
                <div className="horizontal__line"></div>
            </div>
        </div>

        {props.showChildrenKaryawan && (
            <div className="data__karyawan__children">
                <div className="form__row">
                    <div className="form__row__left">
                        <p>NIK <span style={{ color: 'red' }}>*</span></p>
                    </div>          
                    <div className="form__row__right">
                        <BoxInput placeholder="NIK" />    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Android ID</p>
                    </div>          
                    <div className="form__row__right">
                        <BoxInput placeholder="Android ID" />    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Jabatan <span style={{ color: 'red' }}>*</span></p>
                    </div>         
                    <div className="form__row__right">
                        <DropdownMenu title={jabatan} onDropdownChange={handleJabatan} items={itemsJabatan} />    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Project</p>
                    </div>         
                    <div className="form__row__right">
                        <DropdownMenu title={project} onDropdownChange={handleProject} items={itemsProject} />    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Tanggal Bergabung <span style={{ color: 'red' }}>*</span></p>
                    </div>          
                    <div className="form__row__right">
                        <BoxInput placeholder="Tanggal Bergabung" />    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Hak Cuti <span style={{ color: 'red' }}>*</span></p>
                    </div>          
                    <div className="form__row__right">
                        <BoxInput placeholder="Hak Cuti" />    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Leader <span style={{ color: 'red' }}>*</span></p>
                    </div>
                    <div className="form__row__right__label">
                        {['checkbox'].map((type) => (
                            <div key={`Ya`}>
                                <Form.Check // prettier-ignore
                                    type={type}
                                    id={`Ya`}
                                    label={`Ya`}
                                />

                            </div>
                        ))}

                        {['checkbox'].map((type) => (
                            <div key={`Tidak`}>
                                <Form.Check // prettier-ignore
                                    type={type}
                                    id={`Tidak`}
                                    label={`Tidak`}
                                />

                            </div>
                        ))}
                    </div>

                    
                    
                </div>
                
                <div className="form__row">
                    <div className="form__row__left">
                        <p>Karyawan <span style={{ color: 'red' }}>*</span></p>
                    </div>
                    <div className="form__row__right__label">
                        {['checkbox'].map((type) => (
                            <div key={`Tetap`}>
                                <Form.Check // prettier-ignore
                                    type={type}
                                    id={`Tetap`}
                                    label={`Tetap`}
                                />

                            </div>
                        ))}

                        {['checkbox'].map((type) => (
                            <div key={`Kontrak`}>
                                <Form.Check // prettier-ignore
                                    type={type}
                                    id={`Kontrak`}
                                    label={`Kontrak`}
                                />

                            </div>
                        ))}
                    </div>

                    
                    
                </div>

            </div> //end children

        )}
    </div>
  )
}

export default DataKaryawan