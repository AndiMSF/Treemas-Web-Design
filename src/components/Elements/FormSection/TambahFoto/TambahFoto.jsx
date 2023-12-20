/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./tambahfoto.css"
import Form from 'react-bootstrap/Form';


const TambahFoto = (props) => {


    const handleFotoUpload = (e) => {
        const file = e.target.files[0]; // Mendapatkan file yang diunggah dari input
       
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
      
            const imageData = event.target.result;
            const commaIndex = imageData.indexOf(",");
            const base64Data = imageData.slice(commaIndex + 1);

            console.log(imageData);
            console.log("BASE 64 INI "+base64Data);
      
            // Konversi gambar ke base64 dan simpan dalam state formData
            props.onFotoChange(base64Data, file.name);
        };
          reader.readAsDataURL(file);
        }
      }

      const handleFotoKtpUpload = (e) => {
        const file = e.target.files[0]; // Mendapatkan file yang diunggah dari input
    
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            // Konversi gambar ke base64 dan simpan dalam state formData
            props.onFotoKtpChange(event.target.result, file.name)
          };
          reader.readAsDataURL(file);
        }
      }

      const handleFotoNpwpUpload = (e) => {
        const file = e.target.files[0]; // Mendapatkan file yang diunggah dari input
    
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            // Konversi gambar ke base64 dan simpan dalam state formData
            props.onFotoNpwpChange(event.target.result, file.name)
          };
          reader.readAsDataURL(file);
        }
      }

      const handleFotoKkUpload = (e) => {
        const file = e.target.files[0]; // Mendapatkan file yang diunggah dari input
    
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            // Konversi gambar ke base64 dan simpan dalam state formData
            props.onFotoKkChange(event.target.result, file.name)
          };
          reader.readAsDataURL(file);
        }
      }

      const handleFotoAsuransiUpload = (e) => {
        const file = e.target.files[0]; // Mendapatkan file yang diunggah dari input
    
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            // Konversi gambar ke base64 dan simpan dalam state formData
            props.onFotoAsuransiChange(event.target.result, file.name)
          };
          reader.readAsDataURL(file);
        }
      }

      useEffect(() => {
        console.log("Tambah Foto "+JSON.stringify(props.onFormData, null, 2));
      }, [props.onFormData])
  return (
    <div className="tambah__foto__container">
        <div onClick={props.onClickFoto} className="section__header">
            <div className="section__header__top">
                <h1>Tambah Foto</h1>
                <i className={props.showChildrenFoto ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/>
            </div>
            <div className="section__bottom">
                <div className="horizontal__line"></div>
            </div>
        </div>

        {props.showChildrenFoto && (
            <div className="tambah__foto__children">
                <Form.Group controlId="formFile">
                    <Form.Label>Foto : <span style={{ color: 'green' }}> {props.onFormData.fotoPath != null && props.onFormData.fotoPath}</span></Form.Label>
                    <Form.Control className="tambah_foto" type="file" onChange={handleFotoUpload}/>
                </Form.Group>

                <Form.Group controlId="formFile">
                    <Form.Label>Foto KTP</Form.Label>
                    <Form.Control className="tambah_foto" type="file" onChange={handleFotoKtpUpload}/>
                </Form.Group>

                <Form.Group controlId="formFile">
                    <Form.Label>Foto NPWP </Form.Label>
                    <Form.Control className="tambah_foto" type="file" onChange={handleFotoNpwpUpload}/>
                </Form.Group>

                <Form.Group controlId="formFile">
                    <Form.Label>Foto KK</Form.Label>
                    <Form.Control className="tambah_foto" type="file" onChange={handleFotoKkUpload}/>
                </Form.Group>

                <Form.Group controlId="formFile">
                    <Form.Label>Foto asuransi</Form.Label>
                    <Form.Control className="tambah_foto" type="file" onChange={handleFotoAsuransiUpload}/>
                </Form.Group>
                
            </div>
        )}
    </div>
  )
}

export default TambahFoto