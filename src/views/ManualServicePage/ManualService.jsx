import "./manualservice.css"

import Navbar from "../../components/Content/Navbar/Navbar"
import Information from "../../components/Content/Information/Information"

const ManualService = () => {
    const infoTopFields = ["Nama Service", "Keterangan", "Tipe", "Jadwal", "Action"]

    return <div className="manualservice__container">
        <div className="content__container">
            <Navbar navbarText="Manual Service" />
                <div className="input__container">
                    <div className="left__container__input">

                    </div>
                    <div className="right__container__input">
                    </div>
                </div>
            <Information informationText="Manual Service" showDropdown={false} fields={infoTopFields}/>
        </div>
    </div>
}
export default ManualService 