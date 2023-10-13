/* eslint-disable no-unused-vars */
import "./timesheet.css"
import Information from "../../../components/Content/Information/Information"
import BoxInput from "../../../components/Elements/BoxInput/BoxInput"
import Navbar from "../../../components/Content/Navbar/Navbar"
import Button from "../../../components/Elements/Buttons/Button"
import { useState } from "react"
import DropdownMenu from "../../../components/Elements/DropdownMenu/DropdownMenu"

const DetaildataTimesheet = () => {
    const dropdownItems = ["Data Diri", "Data Member"];
    const [ informationText, setInformationText] = useState("Data Diri");
    const [totalJamText, setTotalJamText] = useState("Pilih Total Jam");
    const infoTopFields = ["NIK", "Nama Karyawan", "Hari", "Tanggal", "Project", "Jam Masuk", "Jam Pulang", "Total Jam Kerja", "Overtime", "Catatan"];

    const handleDropdownChange = (selectedItem) => {
        setInformationText(selectedItem);
    }

    const handleTotalJam = (selectedItem) => {
        setTotalJamText(selectedItem)
    }

    let boxInputComponent;

    if( informationText === "Data Diri") {
        boxInputComponent = (
        <div className="input__container">
        <div className="left__container__input">
            <BoxInput placeholder="Tanggal"/>
            <Button text="Pencarian" className="search__button" />

        </div>
        <div className="right__container__input">
        <Button text="Unduh" className="add__button" />
        </div>
    </div>)
    } else if ( informationText === "Data Member") {
        boxInputComponent = (
            <div className="input__container">
                    <div className="left__container__input">
                        <BoxInput placeholder="Tanggal"/>
                        <BoxInput placeholder="NIK"/>
                        <BoxInput placeholder="Nama Karyawan"/>
                        <DropdownMenu title={totalJamText} items={["Lembur", "Tidak Lembur"]} onDropdownChange={handleTotalJam}/>
                        <DropdownMenu title="Pilih Project" />

                        <Button text="Pencarian" className="search__button" />

                    </div>
                    <div className="right__container__input">
                    </div>
                </div>
        )
    }
    return <div className="timesheet__container">
        <div className="content__container">
            <Navbar navbarText="Detail Data / Timesheet" />
                {boxInputComponent}
            <Information onDropdownChange={handleDropdownChange} informationText={informationText} showDropdown={true} dropdownTitle={informationText} items={dropdownItems} fields={infoTopFields}/>
        </div>
    </div>
}

export default DetaildataTimesheet