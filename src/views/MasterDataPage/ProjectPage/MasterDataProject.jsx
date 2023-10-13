import "./project.css"
import Information from "../../../components/Content/Information/Information"
import Navbar from "../../../components/Content/Navbar/Navbar"
import BoxInput from "../../../components/Elements/BoxInput/BoxInput"
import Button from "../../../components/Elements/Buttons/Button"

const MasterDataProject = () => {
    const infoTopFields = ["ID", "Nama Project", "Alamat", "No. Telepon", "Reimburse", "Jarak", "Action"]

    return <div className="project__container">
        <div className="content__container">
            <Navbar navbarText="Master Data / Project" />
                <div className="input__container">
                    <div className="left__container__input">
                        <BoxInput placeholder="Nama Project" />
                        <Button text="Pencarian" className="search__button" />
                    </div>
                    <div className="right__container__input">
                        <Button text="Tambah" className="add__button" />
                    </div>
                </div>
            <Information informationText="Project" showDropdown={false} fields={infoTopFields}/>
        </div>
    </div>
}

export default MasterDataProject