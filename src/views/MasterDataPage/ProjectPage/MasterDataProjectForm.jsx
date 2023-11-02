/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import "./projectform.css"
import FormPages from "../../../components/Content/FormPages/FormPages"
import Information from "../../../components/Content/Information/Information"

// eslint-disable-next-line react-refresh/only-export-components
const MasterDataProjectForm = () => {
     const boxInput = ["ID","Nama Project","No.Telepon","Kota","Latitude","Longitude","Biaya Reimburse","Jarak Maksimal","Total Jam Kerja","Jam Masuk","Jam Keluar"] 
     const textArea  = ["Alamat"]
     
     
    return <div className="projectform__container">
        <div className="content__container">
            <FormPages formTitle="Project Form" showMaps={true} boxInput={boxInput} textArea={textArea} to="/master-data/project-form/add"/>
            <Information informationText = "Set Location" showDropdown={false} showMaps={true} showInformationBottom={false}/>
        </div>        
       
    </div>
}

export default MasterDataProjectForm