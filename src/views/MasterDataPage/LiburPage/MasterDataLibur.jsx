import "./libur.css"
import Information from "../../../components/Content/Information/Information"
import Navbar from "../../../components/Content/Navbar/Navbar"
import BoxInput from "../../../components/Elements/BoxInput/BoxInput"
import Button from "../../../components/Elements/Buttons/Button"
import { Link } from "react-router-dom"

const MasterDataLibur = () => {
    const infoTopFields = ["Tanggal", "Keterangan", "Action"]

    return <div className="libur__container">
        <div className="content__container">
            <Navbar navbarText="Master Data / Libur" />
                <div className="input__container">
                    <div className="left__container__input">
                        <BoxInput placeholder="Keterangan Libur" />
                        <Button text="Pencarian" className="search__button" />
                    </div>
                    <div className="right__container__input">
                    <Link to="/master-data/libur-form/add" text="Tambah" className="add__button">Tambah</Link>
                    </div>
                </div>
            <Information informationText="Libur" showDropdown={false} fields={infoTopFields}/>
        </div>
    </div>
}

export default MasterDataLibur