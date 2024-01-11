/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./dataprofile.css"
import BoxInput from "../../BoxInput/BoxInput"
import { Form } from "react-bootstrap"
import DropdownMenu from "../../../Elements/DropdownMenu/DropdownMenu.jsx"
import { useEffect, useState } from "react"
import { FormControl } from 'react-bootstrap';


const DataProfile = (props) => {
    const itemsAgama = ["Islam","Kristen","Katolik","Buddha","Hindu","Konghucu"]
    const [agama, setAgama] = useState("Pilih")
    const [namaLengkap, setNamaLengkap] = useState('');
    const [noKtp, setNoKtp] = useState('');
    const [noNpwp, setNoNpwp] = useState('');
    const [email, setEmail] = useState('');
    const [tempatLahir, setTempatLahir] = useState('');
    const [tanggalLahir, setTanggalLahir] = useState('');
    const [jenisKelamin, setJenisKelamin] = useState('');
    const [golDarah, setGolDarah] = useState('');
    const [statusPerkawinan, setStatusPerkawinan] = useState('');
    const [jenjangPendidikan, setJenjangPendidikan] = useState('');
    const [kewarganegaraan, setKewarganegaraan] = useState('');
    const [noRekening, setNoRekening] = useState('');
    const [noHp, setNoHp] = useState('')

    const handleAgama = (selectedItem) => {
        setAgama(selectedItem)
        props.onAgamaChange(selectedItem)
    }

  return (
    <div className="data__profile__container" >
        <div onClick={props.onClickProfile} className="section__header">
            <div className="section__header__top">
                <h1>Data Profile</h1>
                <i className={props.showChildrenProfile ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/>
            </div>
            <div className="section__bottom">
            </div>
        </div>

        {props.showChildrenProfile && (
            <div className="data__profile__children">
                <div className="form__row">
                    <div className="form__row__left">
                        <p>Nama Lengkap <span style={{ color: 'red' }}>*</span></p>
                    </div>          
                    <div className="form__row__right">
                    <FormControl type="text" placeholder="Nama" value={props.onFormData.nama}
                    onChange={(e) => {
                        setNamaLengkap(e.target.value)
                        props.onNamaLengkapChange(e.target.value)
                    } }/>    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>No. KTP <span style={{ color: 'red' }}>*</span></p>
                    </div>          
                    <div className="form__row__right">
                        <FormControl type="text" placeholder="No KTP" value={props.onFormData.nomorKtp}
                    onChange={(e) => {
                        setNoKtp(e.target.value)
                        props.onNoKtpChange(e.target.value)
                    } }/>       
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>No NPWP </p>
                    </div>          
                    <div className="form__row__right">
                    <FormControl type="text" placeholder="No NPWP" value={props.onFormData.noNpwp}
                    onChange={(e) => {
                        setNoNpwp(e.target.value)
                        props.onNoNpwpChange(e.target.value)
                    } }/>       
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>No HP </p>
                    </div>          
                    <div className="form__row__right">
                    <FormControl type="text" placeholder="No HP" value={props.onFormData.noHp}
                    onChange={(e) => {
                        setNoHp(e.target.value)
                        props.onNoHpChange(e.target.value)
                    } }/>       
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Email <span style={{ color: 'red' }}>*</span></p>
                    </div>          
                    <div className="form__row__right">
                    <FormControl type="text" placeholder="Email" value={props.onFormData.email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                        props.onEmailChange(e.target.value)
                    } }/>      
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Tempat Lahir</p>
                    </div>          
                    <div className="form__row__right">
                    <FormControl type="text" placeholder="Tempat Lahir" value={props.onFormData.tempatLahir}
                    onChange={(e) => {
                        setTempatLahir(e.target.value)
                        props.onTempatLahirChange(e.target.value)
                    } }/>        
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Tanggal Lahir <span style={{ color: 'red' }}>*</span></p>
                    </div>          
                    <div className="form__row__right">
                    <FormControl type="text" placeholder="YYYY-MM-DD" value={props.onFormData.tanggalLahir}
                    onChange={(e) => {
                        setTanggalLahir(e.target.value)
                        props.onTanggalLahirChange(e.target.value)
                    } }/>        
                    </div>
                </div>
                
                <div className="form__row">
                    <div className="form__row__left">
                        <p>Jenis Kelamin <span style={{ color: 'red' }}>*</span></p>
                    </div>
                    <div className="form__row__right__label">
                        <input type="radio" name="jenis_kelamin" id="L" onChange={() => {
                                        setJenisKelamin('Laki-Laki')
                                        props.onJenisKelaminChange('Laki-Laki')
                                    } } checked={props.onFormData.jenisKelamin === 'Laki-Laki'} />
                            <label htmlFor="L">L</label>
                        <input type="radio" name="jenis_kelamin" id="P" onChange={() => {
                                        setJenisKelamin('Perempuan')
                                        props.onJenisKelaminChange('Perempuan')
                                    } } checked={props.onFormData.jenisKelamin === 'Perempuan'}/>
                            <label htmlFor="P">P</label>
                    </div>                  
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Golongan Darah</p>
                    </div>
                    <div className="form__row__right__label">
                        <input type="radio" name="golDarah" id="A" onChange={() => {
                                        setGolDarah('A')
                                        props.onGolDarahChange('A')
                                    } } checked={props.onFormData.golonganDarah === 'A'}/>
                        <label htmlFor="A">A</label>
                        <input type="radio" name="golDarah" id="B" onChange={() => {
                                        setGolDarah('B')
                                        props.onGolDarahChange('B')
                                    } } checked={props.onFormData.golonganDarah === 'B'}/>
                        <label htmlFor="B">B</label>
                        <input type="radio" name="golDarah" id="AB" onChange={() => {
                                        setGolDarah('AB')
                                        props.onGolDarahChange('AB')
                                    } } checked={props.onFormData.golonganDarah === 'AB'}/>
                        <label htmlFor="AB">AB</label>
                        <input type="radio" name="golDarah" id="O" onChange={() => {
                                        setGolDarah('O')
                                        props.onGolDarahChange('O')
                                    } } checked={props.onFormData.golonganDarah === 'O'}/>
                        <label htmlFor="O">O</label>
                    </div>                  
                </div>


                <div className="form__row">
                    <div className="form__row__left">
                        <p>Status Perkawinan</p>
                    </div>
                    <div className="form__row__right__label">
                    <input type="radio" name="statusPerkawinan" id="Menikah" onChange={() => {
                                        setStatusPerkawinan('Menikah')
                                        props.onStatusPerkawinanChange('Menikah')
                                    } } checked={props.onFormData.statusPerkawinan === 'Menikah'}/>
                        <label htmlFor="Menikah">Menikah</label>
                        <input type="radio" name="statusPerkawinan" id="Belum Menikah" onChange={() => {
                                        setStatusPerkawinan('Belum Menikah')
                                        props.onStatusPerkawinanChange('Belum Menikah')
                                    } } checked={props.onFormData.statusPerkawinan === 'Belum Menikah'}/>
                        <label htmlFor="Belum Menikah">Belum Menikah</label>            
                    </div>        
                </div>
                
                <div className="form__row">
                    <div className="form__row__left">
                        <p>Agama</p>
                    </div>         
                    <div className="form__row__right">
                        <DropdownMenu title={agama} onAgamaChange={handleAgama} itemsAgama={itemsAgama} onFormData={props.onFormData}/>    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Jenjang Pendidikan</p>
                    </div>
                    <div className="form__row__right__label">
                    <input type="radio" name="jenjangPendidikan" id="SMK" onChange={() => {
                                        setJenjangPendidikan('SMK')
                                        props.onJenjangPendidikanChange('SMK')
                                    } } checked={props.onFormData.jenjangPendidikan === 'SMK'}/>
                        <label htmlFor="SMK">SMK</label>
                        <input type="radio" name="jenjangPendidikan" id="SMA" onChange={() => {
                                        setJenjangPendidikan('SMA')
                                        props.onJenjangPendidikanChange('SMA')
                                    } } checked={props.onFormData.jenjangPendidikan === 'SMA'}/>
                        <label htmlFor="SMA">SMA</label>
                        <input type="radio" name="jenjangPendidikan" id="D-1" onChange={() => {
                                        setJenjangPendidikan('D-1')
                                        props.onJenjangPendidikanChange('D-1')
                                    } } checked={props.onFormData.jenjangPendidikan === 'D-1'}/>
                        <label htmlFor="D-1">D-1</label>
                        <input type="radio" name="jenjangPendidikan" id="D-2" onChange={() => {
                                        setJenjangPendidikan('D-2')
                                        props.onJenjangPendidikanChange('D-2')
                                    } } checked={props.onFormData.jenjangPendidikan === 'D-2'}/>
                        <label htmlFor="D-2">D-2</label>
                        <input type="radio" name="jenjangPendidikan" id="D-3" onChange={() => {
                                        setJenjangPendidikan('D-3')
                                        props.onJenjangPendidikanChange('D-3')
                                    } } checked={props.onFormData.jenjangPendidikan === 'D-3'}/>
                        <label htmlFor="D-3">D-3</label>
                        <input type="radio" name="jenjangPendidikan" id="S-1" onChange={() => {
                                        setJenjangPendidikan('S-1')
                                        props.onJenjangPendidikanChange('S-1')
                                    } } checked={props.onFormData.jenjangPendidikan === 'S-1'}/>
                        <label htmlFor="S-1">S-1</label>    
                        <input type="radio" name="jenjangPendidikan" id="S-2" onChange={() => {
                                        setJenjangPendidikan('S-2')
                                        props.onJenjangPendidikanChange('S-2')
                                    } } checked={props.onFormData.jenjangPendidikan === 'S-2'}/>
                        <label htmlFor="S-2">S-2</label>   
                        <input type="radio" name="jenjangPendidikan" id="S-3" onChange={() => {
                                        setJenjangPendidikan('S-3')
                                        props.onJenjangPendidikanChange('S-3')
                                    } } checked={props.onFormData.jenjangPendidikan === 'S-3'}/>
                        <label htmlFor="S-3">S-3</label>   
                    </div>

                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>No Rekening</p>
                    </div>          
                    <div className="form__row__right">
                    <FormControl type="text" placeholder="No Rekening" value={props.onFormData.noRek}
                    onChange={(e) => {
                        setNoRekening(e.target.value)
                        props.onNoRekeningChange(e.target.value)
                    } }/>     
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Kewarganegaraan</p>
                    </div>
                    <div className="form__row__right__label">
                    <input type="radio" name="kewarganegaraan" id="WNA" onChange={() => {
                                        setKewarganegaraan('WNA')
                                        props.onKewarganegaraanChange('WNA')
                                    } } checked={props.onFormData.kewarganegaraan === 'WNA'}/>
                        <label htmlFor="WNA">WNA</label>
                        <input type="radio" name="kewarganegaraan" id="WNI" onChange={() => {
                                        setKewarganegaraan('WNI')
                                        props.onKewarganegaraanChange('WNI')
                                    } } checked={props.onFormData.kewarganegaraan === 'WNI'}/>
                        <label htmlFor="WNI">WNI</label>    
                    </div>

                    
                    
                </div>

            </div> // end children
              
                        
              
        )}
    </div>

  )
}

export default DataProfile