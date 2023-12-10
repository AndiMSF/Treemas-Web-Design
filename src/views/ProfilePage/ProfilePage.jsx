/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import './profilepage.css'
import BoxInput from "../../components/Elements/BoxInput/BoxInput.jsx"
import { Form } from "react-bootstrap"
import DropdownMenu from "../../components/Elements/DropdownMenu/DropdownMenu.jsx"
import { useState } from "react"
import Swal from 'sweetalert2'
import axios from "axios";
import Alert from 'react-bootstrap/Alert';


const ProfilePage = () => { z
    const itemsAgama = ["Islam","Kristen","Katolik","Buddha","Hindu","Konghucu"]
    const [agama, setAgama] = useState("Pilih")


    const handleAgama = (selectedItem) => {
        setAgama(selectedItem)
    }

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



    const [condition, setCondition] = useState(true);



    return (
    <div className="profilepage__container" >
        <div className="content__container">
             
                <div className="form__container">
                    <div className="form__container__top">
                            <h1>Profile Edit</h1>
                            <div className="horizontal__line"></div>        
                    </div>

                <form>
          

                <div className="data__profile__children">
                    <div className="section__header">
                        <div className="section__header__top">
                            <h1>Data Profile</h1>
                            <i className={condition ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"
                        }/>
                            
                        </div>
                        <div className="section__bottom">
                            <div className="horizontal__line"></div>
                        </div>
                    </div>

                    
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
                        </div> 
                </div>

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

                </div> 


                    
                </form>
            </div> 
         </div>
    </div>
  )  
}

export default ProfilePage
