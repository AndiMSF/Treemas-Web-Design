import "./reimburse.css"
import Information from "../../../components/Content/Information/Information"
import Navbar from "../../../components/Content/Navbar/Navbar"
import BoxInput from "../../../components/Elements/BoxInput/BoxInput"
import Button from "../../../components/Elements/Buttons/Button"

const ParameterReimburse = () => {
    const infoTopFields = ["ID", "Name", "Nominal", "Note", "Action"]

    return <div className="reimburse__container">
        <div className="content__container">
            <Navbar navbarText="Parameter / Reimburse" />
                <div className="input__container">
                    <div className="left__container__input">
                        <BoxInput placeholder="Nama Reimburse" />
                        <Button text="Pencarian" className="search__button" />
                    </div>
                    <div className="right__container__input">
                    </div>
                </div>
            <Information informationText="Reimburse" showDropdown={false} fields={infoTopFields}/>
        </div>
    </div>
}

export default ParameterReimburse