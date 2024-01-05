/* eslint-disable no-unused-vars */
import "./absen.css"
import Information from "../../../components/Content/Information/Information"
import Navbar from "../../../components/Content/Navbar/Navbar"
import BoxInput from "../../../components/Elements/BoxInput/BoxInput"
import Button from "../../../components/Elements/Buttons/Button"
import Form from 'react-bootstrap/Form';
import { useState } from "react"
import { EXCEL_FILE_BASE64 } from "../../../../constants"
import FileSaver from "file-saver"

const UploadAbsen = () => {
    const infoTopFields = ["NIK", "Nama Lengkap", "Tanggal", "Project", "Status"]
    const [selectedFile, setSelectedFile] = useState(null);
    // on change states
    const [excelFile, setExcelFile]=useState(null);
    const [excelFileError, setExcelFileError]=useState(null);  
    
    // submit
    const [excelData, setExcelData]=useState(null);

    const fileType=['application/vnd.ms-excel'];
    const handleFileChange = (e) => {
        // Update the selectedFile state when the file input changes
        setSelectedFile(e.target.files[0]);
        console.log(e.target.files[0]);

        let selectedFile = e.target.files[0];
        if(selectedFile){
        // console.log(selectedFile.type);
        if(selectedFile&&fileType.includes(selectedFile.type)){
            let reader = new FileReader();
            reader.readAsArrayBuffer(selectedFile);
            reader.onload=(e)=>{
            setExcelFileError(null);
            setExcelFile(e.target.result);
            } 
        }
        else{
            setExcelFileError('Please select only excel file types');
            setExcelFile(null);
        }
        }
        else{
        console.log('Please select your file');
        }
      };

      const handleFileUpload = (e) => {
        e.preventDefault();
        if (selectedFile) {
          // Create a FormData object and append the selected file
          const formData = new FormData();
          formData.append('xlsxFile', selectedFile);
    
          // TODO: Make a request to the server to handle the file upload
          // Example using fetch:
          // fetch('your-backend-endpoint', {
          //   method: 'POST',
          //   body: formData,
          // })
          //   .then(response => response.json())
          //   .then(data => {
          //     console.log('Success:', data);
          //   })
          //   .catch(error => {
          //     console.error('Error:', error);
          //   });
    
          // For demonstration purposes, log the file details
          console.log('File details:', selectedFile);
        } else {
          console.log('No file selected');
        }
      };

      const handleDownload = () => {
        let sliceSize = 1024;
        let byteCharacters = atob(EXCEL_FILE_BASE64);
        let bytesLength = byteCharacters.length;
        let slicesCount = Math.ceil(bytesLength / sliceSize);
        let byteArrays = new Array(slicesCount);
        for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
          let begin = sliceIndex * sliceSize;
          let end = Math.min(begin + sliceSize, bytesLength);
          let bytes = new Array(end - begin);
          for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
          }
          byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        FileSaver.saveAs(
          new Blob(byteArrays, { type: "application/vnd.ms-excel" }),
          "Template_Treemas_Absent.xlsx"
        );
      };

      
    return <div className="content__container">
            <Navbar navbarText="Upload / Absen" />
                <div className="input__container">
                    <div className="left__container__input__absen">
                        <div className="top__container__input">
                            <div className="top__container__input__left">
                            <Form.Group controlId="formFile">
                                <Form.Label>File Xlsx {excelFileError&&<div className='text-danger'
                                style={{marginTop:5+'px'}}>{excelFileError}</div>}</Form.Label>
                                <Form.Control type="file" onChange={handleFileChange}/>
                            </Form.Group>
                                
                                </div>
                            <div className="top__container__input__right">
                                <Button text="Submit" className="unggah__button" onClick={handleFileUpload}/>
                                <Button text="Unggah Template" className="unggah__button" onClick={handleDownload}/>
                            </div>
                            
                        </div>
                        <div className="bottom__container__input__absen">
                            <BoxInput placeholder="Nama" />
                            <BoxInput placeholder="Tanggal" />
                            <Button text="Pencarian" className="search__button" />
                        </div>
                        
                    </div>
                    <div className="right__container__input">
                       
                    </div>
                </div>
            <Information informationText="Absen" showDropdown={false} fields={infoTopFields}/>
        </div>

}

export default UploadAbsen