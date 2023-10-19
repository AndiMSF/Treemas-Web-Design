import "./jabatan.css"
import Information from "../../../components/Content/Information/Information"
import Navbar from "../../../components/Content/Navbar/Navbar"
import BoxInput from "../../../components/Elements/BoxInput/BoxInput"
import Button from "../../../components/Elements/Buttons/Button"
import { Link } from "react-router-dom"

const MasterDataJabatan = () => {
    const infoTopFields = ["ID", "Nama Jabatan", "Action"]

    return <div className="jabatan__container">
        <div className="content__container">
            <Navbar navbarText="Master Data / Jabatan" />
                <div className="input__container">
                    <div className="left__container__input">
                        <BoxInput placeholder="Nama Jabatan" />
                        <Button text="Pencarian" className="search__button" />
                    </div>
                    <div className="right__container__input">
                    <Link to="/master-data/jabatan-form/add" text="Tambah" className="add__button">Tambah</Link>
                    </div>
                </div>
            <Information informationText="Jabatan" showDropdown={false} fields={infoTopFields}/>
        </div>
        </div>
}

export default MasterDataJabatan