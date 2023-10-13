/* eslint-disable no-unused-vars */
import "./useraccess.css"
import Information from "../../../components/Content/Information/Information"
import Navbar from "../../../components/Content/Navbar/Navbar"
import { useState } from "react"
import DropdownMenu from "../../../components/Elements/DropdownMenu/DropdownMenu"

const ManagementUserAccess = () => {
    const dropdownItems = ["Karyawan", "HRD", "Atasan", "Jabatan", "Monitoring"]
    const [ jabatan, setJabatan ] = useState("Pilih Jabatan")
    const infoTopFields = ["Button","Menu", "Sub Menu"]

    const handleJabatan = (selectedItem) => {
        setJabatan(selectedItem)
    }

    return <div className="useraccess__container">
        <div className="content__container">
            <Navbar navbarText="Management / User Access" />
                <div className="input__container">
                    <div className="left__container__input">
                        <DropdownMenu title={jabatan} onDropdownChange={handleJabatan} items={dropdownItems} />
                    </div>
                    <div className="right__container__input">
                    </div>
                </div>
            <Information informationText="Data User Access" showDropdown={false} fields={infoTopFields}/>
        </div>
    </div>
}

export default ManagementUserAccess