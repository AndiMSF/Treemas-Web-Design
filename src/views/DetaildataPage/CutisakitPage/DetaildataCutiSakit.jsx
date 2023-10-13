/* eslint-disable no-unused-vars */
import "./cutisakit.css"
import Information from "../../../components/Content/Information/Information"
import BoxInput from "../../../components/Elements/BoxInput/BoxInput"
import Navbar from "../../../components/Content/Navbar/Navbar"
import Button from "../../../components/Elements/Buttons/Button"
import DropdownMenu from "../../../components/Elements/DropdownMenu/DropdownMenu"
import { useState } from "react"

const DetaildataCutiSakit = () => {
    const dropdownItems = ["Cuti", "Sakit"];
    const [ informationText, setInformationText] = useState("Cuti");
    const infoTopFields = ["NIK", "Nama Karyawan", "Tgl. Pengajuan", "Tgl. Cuti", "Tgl. Selesai", "Tgl. Masuk", "Jml. Cuti", "Keperluan Cuti", "Status", "Status Oleh", "Tgl. Status"]


    const handleDropdownChange = (selectedItem) => {
        setInformationText(selectedItem);
    }

    return <div className="cutisakit__container">
      <div className="content__container">
            <Navbar navbarText="Detail Data / Cuti Sakit" />
                <div className="input__container">
                    <div className="left__container__input">
                        <BoxInput placeholder="Tanggal Pengajuan"/>
                        <BoxInput placeholder="NIK"/>
                        <DropdownMenu title="Pilih Status" />
                        <Button text="Pencarian" className="search__button" />

                    </div>
                    <div className="right__container__input">
                    </div>
                </div>
            <Information onDropdownChange={handleDropdownChange} informationText={informationText} showDropdown={true} dropdownTitle={informationText} items={dropdownItems} fields={infoTopFields}/>
        </div>
    </div>
}

export default DetaildataCutiSakit