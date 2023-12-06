/* eslint-disable no-unused-vars */
import "./reimburse.css"
import Information from "../../../components/Content/Information/Information"
import BoxInput from "../../../components/Elements/BoxInput/BoxInput"
import Navbar from "../../../components/Content/Navbar/Navbar"
import Button from "../../../components/Elements/Buttons/Button"
import { useState } from "react"
import DropdownMenu from "../../../components/Elements/DropdownMenu/DropdownMenu"

const DetaildataReimburse = () => {
    const dropdownItems = ["Data Diri", "Data Member"];
    const infoTopFields = ["NIK", "Nama Karyawan", "Hari", "Tanggal", "Project", "Jam Masuk", "Jam Pulang", "Uang Makan", "Transport"]
    const [ informationText, setInformationText] = useState("Data Diri");
    const [totalJamText, setTotalJamText] = useState("Pilih Total Jam")

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
            <BoxInput placeholder="Tanggal Reimburse"/>
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
                        <BoxInput placeholder="Tanggal Reimburse"/>
                        <BoxInput placeholder="NIK"/>
                        <BoxInput placeholder="Nama Karyawan"/>
                        <DropdownMenu title={totalJamText} items={["Lembur", "Tidak Lembur"]} onDropdownChange={handleTotalJam}/>
                        <DropdownMenu title="Pilih Project" />

                        <Button text="Pencarian" className="search__button" />

                    </div>
                    <div className="right__container__input">
                    <Button text="Unduh" className="add__button" />
                    </div>
                </div>
        )
    }

    return <div className="reimburse__container">
        <div className="content__container">
            <Navbar navbarText="Detail Data / Reimburse" />
                {boxInputComponent}
            <Information onDropdownChange={handleDropdownChange} informationText={informationText} showDropdown={true} dropdownTitle={informationText} items={dropdownItems} fields={infoTopFields}/>
        </div>
    </div>
}

export default DetaildataReimburse