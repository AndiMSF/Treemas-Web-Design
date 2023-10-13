import "./usermember.css"
import DropdownMenu from "../../../components/Elements/DropdownMenu/DropdownMenu"
import Navbar from "../../../components/Content/Navbar/Navbar"
import Information from "../../../components/Content/Information/Information"
import { useState } from "react"


const ManagementUserMember = () => {
    const dropdownItems = ["110621 - WIRA HADINATA"]
    const [ userData, setUserData ] = useState("Pilih User")
    const infoTopFields = ["Button", "NIK", "Nama Karyawan"]


    const handleUserData = (selectedItem) => {
        setUserData(selectedItem)
    }
    return <div className="usermember__container">
        <div className="content__container">
            <Navbar navbarText="Management / User Member" />
                <div className="input__container">
                    <div className="left__container__input">
                        <DropdownMenu title={userData} onDropdownChange={handleUserData} items={dropdownItems} />
                    </div>
                    <div className="right__container__input">
                    </div>
                </div>
            <Information informationText="Data User Member" showDropdown={false} fields={infoTopFields}/>
        </div>
    </div>
}

export default ManagementUserMember