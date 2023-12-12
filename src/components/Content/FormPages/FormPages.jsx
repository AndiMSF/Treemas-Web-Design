/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
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
import Password from "../../Elements/FormSection/Password/Password";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom/dist";
import axios from "axios";
// SweetAlert
import Swal from 'sweetalert2'

const FormPages = (props) => {

  const handleNamaLengkapChange = (newNamaLengkap) => {
    setFormData(((prevFormData) => ({
      ...prevFormData,
      nama: newNamaLengkap
    })))
  };

  const handleNoKtpChange = (newNoKtp) => {
    setFormData(((prevFormData) => ({
      ...prevFormData,
      nomorKtp: newNoKtp
    })))
  };

  const handleNoNpwpChange = (newNoNpwp) => {
    setFormData(((prevFormData) => ({
      ...prevFormData,
      noNpwp: newNoNpwp
    })))
  };

  const handleEmailChange = (newEmail) => {
    setFormData(((prevFormData) => ({
      ...prevFormData,
      email: newEmail
    })))
  };

  const handleTempatLahirChange = (newTempatLahir) => {
    setFormData(((prevFormData) => ({
      ...prevFormData,
      tempatLahir: newTempatLahir
    })))
  };

  const handleTanggalLahirChange = (newTanggalLahir) => {
    setFormData(((prevFormData) => ({
      ...prevFormData,
      tanggalLahir: newTanggalLahir
    })))
  };

  const handleJenisKelaminChange = (newJenisKelamin) => {
    setFormData(((prevFormData) => ({
      ...prevFormData,
      jenisKelamin: newJenisKelamin
    })))
  }

  const handleGolDarahChange = (newGolDarah) => {
    setFormData(((prevFormData) => ({
      ...prevFormData,
      golonganDarah: newGolDarah
    })))
  }

  const handleStatusPerkawinan = (newStatusPerkawinan) => {
    setFormData(((prevFormData) => ({
      ...prevFormData,
      statusPerkawinan: newStatusPerkawinan
    })))
  }

  const handleJenjangPendidikan = (newJenjangPendidikan) => {
    setFormData(((prevFormData) => ({
      ...prevFormData,
      jenjangPendidikan: newJenjangPendidikan
    })))
  }

  const handleKewarganegaraan = (newKewarganegaraan) => {
    setFormData(((prevFormData) => ({
      ...prevFormData,
      kewarganegaraan: newKewarganegaraan
    })))
  }

  const handleAgama = (newAgama) => {
    setFormData(((prevFormData) => ({
      ...prevFormData,
      agama: newAgama
    })))
  }

  const handleNoRekening = (newNoRekening) => {
    setFormData(((prevFormData) => ({
      ...prevFormData,
      noRek: newNoRekening
    })))
  }
    const [formData, setFormData] = useState({
        nama: '',
        noNpwp: '',
        noHp: '',
        email: '',
        tempatLahir: '',
        tanggalLahir: '',
        jenisKelamin: '',
        agama: '',
        noRek: '',
        kewarganegaraan: '',
        nik: '',
        kodePos: '',
        alamatKtp: '',
        jenjangPendidikan: '',
        tanggalBergabung: '',
        alamatSekarang: '',
        statusPerkawinan: '',
        golonganDarah: '',
        nomorKtp: '',
        emergencyContact: '',
        statusEmergency: '',
        alamatEmergency: '',
        telpEmergency: '',
        projectId: '', // get dari api project web
        divisi: '',
        isLeader: '',
        androidId: '',
        jabatanId: '',
        isKaryawan: '',
        foto:    '',
        fotoPath: '',
        fotoKtp: '',
        fotoKtpPath: '',
        fotoNpwp: '',
        fotoNpwpPath: '',
        fotoKk: '',
        fotoKkPath: '',
        fotoAsuransi: '',
        fotoAsuransiPath: ''       
      })
      const navigate = useNavigate();
      const [isToken, setIstoken] = useState('')
      const [apiDataJabatan, setApiDataJabatan] = useState([]);
      const [apiDataProject, setApiDataProject] = useState([]);
      const [error, setError] = useState(null);
      const [isLoading, setIsLoading] = useState(true);
    // Handle API GET and POST
    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch('https://treemas-api-403500.et.r.appspot.com/api/master-data/jabatan-view', {
              method: 'GET', // Sesuaikan metode sesuai kebutuhan (GET, POST, dll.)
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Sertakan token di sini
              },
            });
              const data = await response.json();
              if (data.status === 'Success') {
                setApiDataJabatan(data.data);
                console.log(apiDataJabatan);
                
              } else {
                setError('Failed to fetch data');
              }
            } catch (error) {
              setError(`Error fetching data: ${error.message}`);
            } finally {
              setIsLoading(false);
            }
          };

        const token = localStorage.getItem("authToken")
        if (token) {
          setIstoken(token)
          fetchData(); // Panggil fungsi fetchData setelah mendapatkan token

          // request ke server setiap 5detik untuk memperbarui data secara otomatis tapi bisa memperlambat server?
        //   const intervalId = setInterval(fetchData, 5000); // Polling setiap 5 detik (5000 milidetik)

        //   // Bersihkan interval saat komponen di-unmount
        //   return () => {
        //     clearInterval(intervalId);
        //   };
        }else{
          navigate("/login");
        }
      }, [navigate])

      useEffect(() => {
        const fetchDataProject = async () => {
            try {
              const response = await fetch('https://treemas-api-403500.et.r.appspot.com/api/master-data/project-view', {
              method: 'GET', // Sesuaikan metode sesuai kebutuhan (GET, POST, dll.)
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Sertakan token di sini
              },
            });
              const data = await response.json();
              if (data.status === 'Success') {
                setApiDataProject(data.data);
                console.log(apiDataProject);
                
              } else {
                setError('Failed to fetch data');
              }
            } catch (error) {
              setError(`Error fetching data: ${error.message}`);
            } finally {
              setIsLoading(false);
            }
          };

        const token = localStorage.getItem("authToken")
        if (token) {
          setIstoken(token)
          fetchDataProject(); // Panggil fungsi fetchData setelah mendapatkan token

          // request ke server setiap 5detik untuk memperbarui data secara otomatis tapi bisa memperlambat server?
        //   const intervalId = setInterval(fetchData, 5000); // Polling setiap 5 detik (5000 milidetik)

        //   // Bersihkan interval saat komponen di-unmount
        //   return () => {
        //     clearInterval(intervalId);
        //   };
        }else{
          navigate("/login");
        }
      }, [navigate])


      const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formData);
        const token = localStorage.getItem("authToken");
    
          if (!token) {
            console.error('Token is not available');
            return navigate("/login");
          }
    
        try {
            const requestData = {
                jabatanId: formData.jabatanId,
                namaJabatan: formData.namaJabatan,
                nama: formData.nama,
                noNpwp: formData.noNpwp,
                noHp: formData.noHp,
                email: formData.email,
                tempatLahir: formData.tempatLahir,
                tanggalLahir: formData.tanggalLahir,
                jenisKelamin: formData.jenisKelamin,
                agama: formData.agama,
                noRek: formData.noRek,
                kewarganegaraan: formData.kewarganegaraan,
                nik: formData.nik,
                kodePos: formData.kodePos,
                alamatKtp: formData.alamatKtp,
                jenjangPendidikan: formData.jenjangPendidikan,
                tanggalBergabung: formData.tanggalBergabung,
                alamatSekarang: formData.alamatSekarang,
                statusPerkawinan: formData.statusPerkawinan,
                golonganDarah: formData.golonganDarah,
                nomorKtp: formData.nomorKtp,
                emergencyContact: formData.emergencyContact,
                statusEmergency: formData.statusEmergency,
                alamatEmergency: formData.alamatEmergency,
                telpEmergency: formData.telpEmergency,
                projectId: formData.projectId,
                divisi: formData.divisi,
                isLeader: formData.isLeader,
                androidId: formData.androidId,
                isKaryawan: formData.isKaryawan,
                foto: formData.foto,
                fotoPath: formData.fotoPath,
                fotoKtp: formData.fotoKtp,
                fotoKtpPath: formData.fotoKtpPath,
                fotoNpwp: formData.fotoNpwp,
                fotoNpwpPath: formData.fotoNpwpPath,
                fotoKk: formData.fotoKk,
                fotoKkPath: formData.fotoKkPath,
                fotoAsuransi: formData.fotoAsuransi,
                fotoAsuransiPath: formData.fotoAsuransiPath,
              };
              
    
          const response = await axios.post(
            props.api,
            requestData,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
            });
          Swal.fire({
            title: "Success!",
            text: "Karyawan Added.",
            icon: "success"
          });
          navigate("/master-data/karyawan-view");
          console.log('Response from API:', response.data);
        } catch (error) {
          // Jika tidak berhasil, tampilkan pesan error
          console.error('Failed to fetch data:', error);
          Swal.fire({
            title: "Error!",
            text: "Failed to add Karyawan.",
            icon: "error"
          });
        }
      }

    // 
       
    // const handleImageUpload = (e) => {
    //     const file = e.target.files[0];
    //     setImage(file);
    //   };
    
    //   const handleSubmit = () => {
    //     props.handleAnnouncement();
    //   };
    
    
      
  return (
    <div className="form__container">
        <div className="form__container__top">
            <h1>{props.formTitle}</h1>
            <div className="horizontal__line"></div>
        </div>
        <form>
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
                    {props.showDataProfile && <DataProfile showChildrenProfile={props.showChildrenProfile} onClickProfile={props.onClickProfile} onNamaLengkapChange={handleNamaLengkapChange}  onNoKtpChange={handleNoKtpChange} onNoNpwpChange={handleNoNpwpChange} onEmailChange={handleEmailChange} onTempatLahirChange={handleTempatLahirChange} onTanggalLahirChange={handleTanggalLahirChange} onJenisKelaminChange={handleJenisKelaminChange} onGolDarahChange={handleGolDarahChange} onStatusPerkawinanChange={handleStatusPerkawinan} onJenjangPendidikanChange={handleJenjangPendidikan} onKewarganegaraanChange={handleKewarganegaraan} onAgamaChange={handleAgama} onNoRekeningChange={handleNoRekening}/>}
                    
                    {/* Kalau Show Data Alamat true */}
                    {props.showDataAlamat && <DataAlamat showChildrenAlamat={props.showChildrenAlamat} onClickAlamat={props.onClickAlamat}/>}
                    
                    {/* Kalau Show Data Lain-Lain true */}
                    {props.showDataLain && <DataLain showChildrenLain={props.showChildrenLain} onClickLain={props.onClickLain} />}
                </div>
                
                <div className="middle__right">
                    {/* Kalau Show Data Karyawan true */}
                    {props.showDataKaryawan && <DataKaryawan showChildrenKaryawan={props.showChildrenKaryawan} onClickKaryawan={props.onClickKaryawan} dataJabatan={apiDataJabatan} dataProject={apiDataProject}/>}

                {/* Kalau Show Data Tambah Foto true */}
                {props.showTambahFoto && <TambahFoto showChildrenFoto={props.showChildrenFoto} onClickFoto={props.onClickFoto} />}

                {/* Kalau Show Data Password true */}
                {props.showPassword && <Password showChildrenPassword={props.showChildrenPassword} onClickPassword={props.onClickPassword} />}
                </div>
                
            </div>
            <div className="form__row__bottom">
                <Link to={props.to} className="cancel__button" text="Cancel">Cancel</Link>
                <Button className="submit__button" text="Submit" onClick={handleSubmit}/>
            </div>
        </form>
    </div>
  )
}

export default FormPages