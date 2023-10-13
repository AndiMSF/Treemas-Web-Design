import "./user.css"
import Information from "../../../components/Content/Information/Information"
import Navbar from "../../../components/Content/Navbar/Navbar"
import BoxInput from "../../../components/Elements/BoxInput/BoxInput"
import Button from "../../../components/Elements/Buttons/Button"

const ManagementUser = () => {
    const infoTopFields = ["ID Pengguna", "Nama Karyawan", "Terakhir Login", "Login", "Terkunci"]

    return <div className="userpage__container">
        <div className="content__container">
            <Navbar navbarText="Detail Data / Absen" />
                <div className="input__container">
                    <div className="left__container__input">
                        <BoxInput placeholder="ID" />
                        <Button text="Pencarian" className="search__button" />
                    </div>
                    <div className="right__container__input">
                    </div>
                </div>
            <Information informationText="Data User" showDropdown={false} fields={infoTopFields}/>
        </div>
    </div>
}

export default ManagementUser