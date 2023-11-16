/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import "./projectform.css"
import FormPages from "../../../components/Content/FormPages/FormPages"
import Information from "../../../components/Content/Information/Information"
import { useEffect, useState } from "react";


// eslint-disable-next-line react-refresh/only-export-components
const MasterDataProjectForm = () => {


     const boxInput = [
        "ID *",
        "Nama Project *",
        "No.Telepon",
        "Kota",
        "Latitude *",
        "Longitude *",
        "Biaya Reimburse *",
        "Jarak Maksimal",
        "Total Jam Kerja",
     ] 

     const label = ["Jam Masuk","Jam keluar"]
        
     const textArea  = ["Alamat *"]
     
        return (
            <div className="projectform__container">
                <div className="content__container">
                    <FormPages
                        formTitle="Project Form"
                        showMaps={true}
                        boxInput={boxInput}
                        textArea={textArea}
                        to="/master-data/project-form/add"                          
                    />          
                    <Information
                        informationText="Set Location"
                        showDropdown={false}
                        showMaps={true}
                        showInformationBottom={false}
                    />
                </div>        
            </div>
        );
    }

export default MasterDataProjectForm