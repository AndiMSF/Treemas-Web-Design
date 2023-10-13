import "./general.css"
import Information from "../../../components/Content/Information/Information"
import Navbar from "../../../components/Content/Navbar/Navbar"
import BoxInput from "../../../components/Elements/BoxInput/BoxInput"
import Button from "../../../components/Elements/Buttons/Button"

const ParameterGeneral = () => {
    const infoTopFields = ["ID", "Keterangan", "Tipe Data", "Value", "Action"]

    return <div className="general__container">
        <div className="content__container">
            <Navbar navbarText="Parameter / General" />
                <div className="input__container">
                    <div className="left__container__input">
                        <BoxInput placeholder="Keterangan" />
                        <Button text="Pencarian" className="search__button" />
                    </div>
                    <div className="right__container__input">
                    </div>
                </div>
            <Information informationText="General" showDropdown={false} fields={infoTopFields}/>
        </div>
    </div>
}

export default ParameterGeneral