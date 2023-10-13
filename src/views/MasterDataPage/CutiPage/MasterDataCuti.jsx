import "./cuti.css"
import Information from "../../../components/Content/Information/Information"
import Navbar from "../../../components/Content/Navbar/Navbar"
import BoxInput from "../../../components/Elements/BoxInput/BoxInput"
import Button from "../../../components/Elements/Buttons/Button"

const MasterDataCuti = () => {
    const infoTopFields = ["ID", "Keterangan", "Jumlah", "Action"]

    return <div className="cuti__container">
        <div className="content__container">
            <Navbar navbarText="Master Data / Cuti" />
                <div className="input__container">
                    <div className="left__container__input">
                        <BoxInput placeholder="Keterangan Cuti" />
                        <Button text="Pencarian" className="search__button" />
                    </div>
                    <div className="right__container__input">
                        <Button text="Tambah" className="add__button" />
                    </div>
                </div>
            <Information informationText="Cuti" showDropdown={false} fields={infoTopFields}/>
        </div>
    </div>
}

export default MasterDataCuti