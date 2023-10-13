import "./permission.css"
import Information from "../../../components/Content/Information/Information"
import Navbar from "../../../components/Content/Navbar/Navbar"
import BoxInput from "../../../components/Elements/BoxInput/BoxInput"
import Button from "../../../components/Elements/Buttons/Button"

const MasterDataPermission = () =>{
    const infoTopFields = ["ID", "Nama Permission", "Action"]

    return <div className="permission__container">
        <div className="content__container">
            <Navbar navbarText="Master Data / Permission" />
                <div className="input__container">
                    <div className="left__container__input">
                        <BoxInput placeholder="Nama Permission" />
                        <Button text="Pencarian" className="search__button" />
                    </div>
                    <div className="right__container__input">
                        <Button text="Tambah" className="add__button" />
                    </div>
                </div>
            <Information informationText="Permission" showDropdown={false} fields={infoTopFields}/>
        </div>
    </div>
}

export default MasterDataPermission