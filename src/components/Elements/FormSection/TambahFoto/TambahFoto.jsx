/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import "./tambahfoto.css"
import Form from 'react-bootstrap/Form';


const TambahFoto = (props) => {


    const handleFotoUpload = (e) => {
        const file = e.target.files[0]; // Mendapatkan file yang diunggah dari input
       
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
      
      // Konversi gambar ke base64 dan simpan dalam state formData
      props.onFotoChange(event.target.result, file.name);
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
                    <Form.Label>Foto</Form.Label>
                    <Form.Control type="file" onChange={handleFotoUpload}/>
                </Form.Group>

                <Form.Group controlId="formFile">
                    <Form.Label>Foto KTP</Form.Label>
                    <Form.Control type="file" onChange={handleFotoKtpUpload}/>
                </Form.Group>

                <Form.Group controlId="formFile">
                    <Form.Label>Foto NPWP </Form.Label>
                    <Form.Control type="file" onChange={handleFotoNpwpUpload}/>
                </Form.Group>

                <Form.Group controlId="formFile">
                    <Form.Label>Foto KK</Form.Label>
                    <Form.Control type="file" onChange={handleFotoKkUpload}/>
                </Form.Group>

                <Form.Group controlId="formFile">
                    <Form.Label>Foto asuransi</Form.Label>
                    <Form.Control type="file" onChange={handleFotoAsuransiUpload}/>
                </Form.Group>
                
            </div>
        )}
    </div>
  )
}

export default TambahFoto