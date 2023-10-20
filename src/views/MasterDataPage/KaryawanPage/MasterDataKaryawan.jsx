import "./karyawan.css"
import Information from "../../../components/Content/Information/Information"
import Navbar from "../../../components/Content/Navbar/Navbar"
import BoxInput from "../../../components/Elements/BoxInput/BoxInput"
import Button from "../../../components/Elements/Buttons/Button"
import { Link } from "react-router-dom"

const MasterDataKaryawan = () => {
    const infoTopFields = ["NIK", "Nama Karyawan", "Email", "No. Hp.", "No. Rekening"]

    return <div className="karyawan__container">
        <div className="content__container">
            <Navbar navbarText="Master Data / Karyawan" />
                <div className="input__container">
                    <div className="left__container__input">
                        <BoxInput placeholder="NIK Karyawan" />
                        <Button text="Pencarian" className="search__button" />
                    </div>
                    <div className="right__container__input">
                        <Link to="/master-data/karyawan-form/add" text="Tambah" className="add__button">Tambah</Link>
                    </div>
                </div>
            <Information informationText="Karyawan" showDropdown={false} fields={infoTopFields}/>
        </div>
    </div>
}

export default MasterDataKaryawan