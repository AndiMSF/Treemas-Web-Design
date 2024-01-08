/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import "./datakaryawan.css"
import BoxInput from "../../BoxInput/BoxInput"
import DropdownMenu from "../../../Elements/DropdownMenu/DropdownMenu.jsx"
import { useEffect, useState } from "react"
import { Form, FormControl } from "react-bootstrap"

const DataKaryawan = (props) => {
    const itemsJabatan = ["-"]
    const [jabatan, setJabatan] = useState("Pilih")
    const itemsProject = ["-"]
    const [project, setProject] = useState("Pilih")

    const [nik, setNik] = useState('')
    const [handsetImei, setHandsetImei] = useState('')
    const [tanggalBergabung, setTanggalBergabung] = useState('')
    const [hakCuti, setHakCuti] = useState('')
    const [isLeader, setIsLeader] = useState('')
    const [isKaryawan, setIsKaryawan] = useState('')

    const handleJabatan = (selectedItem) => {   
        setJabatan(selectedItem)
        props.onJabatanChange(selectedItem)
    }
    const handleProject = (selectedItem) => {
        setProject(selectedItem)    
        props.onProjectChange(selectedItem)
    }

    // DataKaryawan component
    const createJabatanItems = (jabatanData) => {
        return jabatanData.map((jabatan) => ({
            label: jabatan.namaJabatan,
            value: jabatan.jabatanId,
        }));
    };

    const createProjectItems = (projectData) => {
        return projectData.map((project) => ({
            label: project.namaProject,
            value: project.projectId,
        }));
    };

    

  return (
    <div className="data__karyawan__container">
        <div onClick={props.onClickKaryawan} className="section__header">
            <div className="section__header__top">
                <h1>Data Karyawan</h1>
                <i className={props.showChildrenKaryawan ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/>
            </div>
            <div className="section__bottom">
            </div>
        </div>

        {props.showChildrenKaryawan && (
            <div className="data__karyawan__children">
                <div className="form__row">
                    <div className="form__row__left">
                        <p>NIK <span style={{ color: 'red' }}>*</span></p>
                    </div>          
                    <div className="form__row__right">
                    <FormControl disabled={props.isKaryawanForm ? false : true} type="text" placeholder="NIK" value={props.onFormData.nik}
                    onChange={(e) => {
                        setNik(e.target.value)
                        props.onNikChange(e.target.value)
                    } }/>    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Android ID</p>
                    </div>          
                    <div className="form__row__right">
                    <FormControl type="text" placeholder="Android ID" value={props.onFormData.handsetImei}
                    onChange={(e) => {
                        setHandsetImei(e.target.value)
                        props.onHandsetImeiChange(e.target.value)
                    } }/>     
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Jabatan <span style={{ color: 'red' }}>*</span></p>
                    </div>         
                    <div className="form__row__right">
                        <DropdownMenu title={jabatan} onJabatanChange={handleJabatan} itemsJabatan={createJabatanItems(props.dataJabatan)} onFormData={props.onFormData} onSys={props.onSys}/>    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Project</p>
                    </div>         
                    <div className="form__row__right">
                        <DropdownMenu title={project} onProjectChange={handleProject} items={itemsProject}  itemsProject={createProjectItems(props.dataProject)} onFormData={props.onFormData}/>    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Tanggal Bergabung <span style={{ color: 'red' }}>*</span></p>
                    </div>          
                    <div className="form__row__right">
                    <FormControl type="text" placeholder="Tanggal Bergabung" value={props.onFormData.tanggalBergabung}
                    onChange={(e) => {
                        setTanggalBergabung(e.target.value)
                        props.onTanggalBergabungChange(e.target.value)
                    } }/>     
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Hak Cuti <span style={{ color: 'red' }}>*</span></p>
                    </div>          
                    <div className="form__row__right">
                    <FormControl type="text" placeholder="Hak Cuti" value={props.onFormData.hakCuti}
                    onChange={(e) => {
                        setHakCuti(e.target.value)
                        props.onHakCutiChange(e.target.value)
                    } }/>     
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Leader <span style={{ color: 'red' }}>*</span></p>
                    </div>
                    <div className="form__row__right__label">
                    <input type="radio" name="isLeader" id="Ya" onChange={() => {
                                        setIsLeader('1')
                                        props.onIsLeaderChange('1')
                                    } } checked={props.onFormData.isLeader === '1'}/>
                            <label htmlFor="Ya">Ya</label>
                        <input type="radio" name="isLeader" id="Tidak" onChange={() => {
                                        setIsLeader('0')
                                        props.onIsLeaderChange('0')
                                    } } checked={props.onFormData.isLeader === '0'}/>
                            <label htmlFor="Tidak">Tidak</label>
                    </div>

                    
                    
                </div>
                
                <div className="form__row">
                    <div className="form__row__left">
                        <p>Karyawan <span style={{ color: 'red' }}>*</span></p>
                    </div>
                    <div className="form__row__right__label">
                    <input type="radio" name="isKaryawan" id="Tetap" onChange={() => {
                                        setIsKaryawan('1')
                                        props.onIsKaryawanChange('1')
                                    } } checked={props.onFormData.isKaryawan === '1'}/>
                            <label htmlFor="Tetap">Tetap</label>
                        <input type="radio" name="isKaryawan" id="Kontrak" onChange={() => {
                                        setIsKaryawan('0')
                                        props.onIsKaryawanChange('0')
                                    } } checked={props.onFormData.isKaryawan === '0'}/>
                            <label htmlFor="Kontrak">Kontrak</label>
                    </div>

                    
                    
                </div>

            </div> //end children

        )}
    </div>
  )
}

export default DataKaryawan