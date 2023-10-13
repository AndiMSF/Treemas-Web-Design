/* eslint-disable no-unused-vars */
import "./absen.css"
import Information from "../../../components/Content/Information/Information"
import BoxInput from "../../../components/Elements/BoxInput/BoxInput"
import Navbar from "../../../components/Content/Navbar/Navbar"
import Button from "../../../components/Elements/Buttons/Button"
import DropdownMenu from "../../../components/Elements/DropdownMenu/DropdownMenu"
import { useState } from "react"

const DetaildataAbsen = () => {
    const [status, setStatus] = useState("Pilih Status")
    const [jam, setJam] = useState("Pilih Total Jam")
    const infoTopFields = ["NIK", "Nama Karyawan", "Tanggal", "Project", "Lokasi Masuk", "Jam Masuk", "Lokasi Pulang", "Jam Pulang", "Catatan Terlambat", "Total Jam Kerja"]


    const handleStatus = (selectedItem) => {
        setStatus(selectedItem)
    }

    const handleJam = (selectedItem) => {
        setJam(selectedItem)
    }


    return <div className="absen__container">
        <div className="content__container">
            <Navbar navbarText="Detail Data / Absen" />
                <div className="input__container">
                    <div className="left__container__input">
                        <BoxInput placeholder="Tanggal"/>
                        <BoxInput placeholder="NIK"/>
                        <BoxInput placeholder="Nama"/>
                        <DropdownMenu onDropdownChange={handleStatus} items={["Cuti", "Other", "Sakit", "WFH"]} title={status} />
                        <DropdownMenu onDropdownChange={handleJam} items={["Lembur", "Tidak Lembur"]} title={jam}/>
                        <DropdownMenu title="Pilih Project"/>
                    </div>
                    <div className="right__container__input">
                        <Button text="Tambah" className="add__button" />
                    </div>
                </div>
            <Information informationText="Absen" showDropdown={false} fields={infoTopFields}/>
        </div>
    </div>

}

export default DetaildataAbsen
