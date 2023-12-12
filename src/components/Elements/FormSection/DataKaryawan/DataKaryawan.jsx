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
    const [androidId, setAndroidId] = useState('')
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
                    <FormControl type="text" placeholder="NIK" value={nik}
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
                    <FormControl type="text" placeholder="Android ID" value={androidId}
                    onChange={(e) => {
                        setAndroidId(e.target.value)
                        props.onAndroidIdChange(e.target.value)
                    } }/>     
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Jabatan <span style={{ color: 'red' }}>*</span></p>
                    </div>         
                    <div className="form__row__right">
                        <DropdownMenu title={jabatan} onDropdownChange={handleJabatan} itemsJabatan={createJabatanItems(props.dataJabatan)}/>    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Project</p>
                    </div>         
                    <div className="form__row__right">
                        <DropdownMenu title={project} onDropdownChange={handleProject} items={itemsProject}  itemsProject={createProjectItems(props.dataProject)}/>    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Tanggal Bergabung <span style={{ color: 'red' }}>*</span></p>
                    </div>          
                    <div className="form__row__right">
                    <FormControl type="text" placeholder="Tanggal Bergabung" value={tanggalBergabung}
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
                    <FormControl type="text" placeholder="Hak Cuti" value={hakCuti}
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
                                        setIsLeader('Ya')
                                        props.onIsLeaderChange('Ya')
                                    } } />
                            <label htmlFor="Ya">Ya</label>
                        <input type="radio" name="isLeader" id="Tidak" onChange={() => {
                                        setIsLeader('Tidak')
                                        props.onIsLeaderChange('Tidak')
                                    } } />
                            <label htmlFor="Tidak">Tidak</label>
                    </div>

                    
                    
                </div>
                
                <div className="form__row">
                    <div className="form__row__left">
                        <p>Karyawan <span style={{ color: 'red' }}>*</span></p>
                    </div>
                    <div className="form__row__right__label">
                    <input type="radio" name="isKaryawan" id="Tetap" onChange={() => {
                                        setIsKaryawan('Tetap')
                                        props.onIsKaryawanChange('Tetap')
                                    } } />
                            <label htmlFor="Tetap">Tetap</label>
                        <input type="radio" name="isKaryawan" id="Kontrak" onChange={() => {
                                        setIsKaryawan('Kontrak')
                                        props.onIsKaryawanChange('Kontrak')
                                    } } />
                            <label htmlFor="Kontrak">Kontrak</label>
                    </div>

                    
                    
                </div>

            </div> //end children

        )}
    </div>
  )
}

export default DataKaryawan