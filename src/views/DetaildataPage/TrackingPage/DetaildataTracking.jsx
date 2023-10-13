/* eslint-disable no-unused-vars */
import "./tracking.css"
import Information from "../../../components/Content/Information/Information"
import BoxInput from "../../../components/Elements/BoxInput/BoxInput"
import Navbar from "../../../components/Content/Navbar/Navbar"
import Button from "../../../components/Elements/Buttons/Button"

const DetaildataTracking = () => {
    return <div className="tracking__container">
        <div className="content__container">
            <Navbar navbarText="Detail Data / Tracking" />
                <div className="input__container">
                    <div className="left__container__input">
                        <BoxInput placeholder="Tanggal"/>
                        <BoxInput placeholder="NIK"/>
                        <Button text="Pencarian" className="search__button" />

                    </div>
                    <div className="right__container__input">
                    </div>
                </div>
            <Information informationText="Tracking" showDropdown={false}/>
        </div>
    </div>
}

export default DetaildataTracking