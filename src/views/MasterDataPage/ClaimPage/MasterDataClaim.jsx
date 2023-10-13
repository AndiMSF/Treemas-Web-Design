import "./claim.css"
import Information from "../../../components/Content/Information/Information"
import Navbar from "../../../components/Content/Navbar/Navbar"
import BoxInput from "../../../components/Elements/BoxInput/BoxInput"
import Button from "../../../components/Elements/Buttons/Button"
import { Link } from "react-router-dom"

const MasterDataClaim = () => {
    const infoTopFields = ["ID", "Keterangan", "Nominal", "Action"]

    return <div className="claim__container">
        <div className="content__container">
            <Navbar navbarText="Master Data / Claim" />
                <div className="input__container">
                    <div className="left__container__input">
                        <BoxInput placeholder="Keterangan Claim" />
                        <Button text="Pencarian" className="search__button" />
                    </div>
                    <div className="right__container__input">
                        <Link to="/master-data/claim-form/add" text="Tambah" className="add__button">Tambah</Link>
                    </div>
                </div>
            <Information informationText="Claim" showDropdown={false} fields={infoTopFields} />
        </div>
    </div>
}

export default MasterDataClaim