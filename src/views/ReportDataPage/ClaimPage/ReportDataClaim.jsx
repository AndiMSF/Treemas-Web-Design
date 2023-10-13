import "./claim.css"
import Information from "../../../components/Content/Information/Information"
import Navbar from "../../../components/Content/Navbar/Navbar"
import BoxInput from "../../../components/Elements/BoxInput/BoxInput"
import Button from "../../../components/Elements/Buttons/Button"

const ReportDataClaim = () => {
    const infoTopFields = ["NIK", "Nama Karyawan", "Tanggal", "Nominal", "Keterangan", "Tipe"]

    return <div className="claim__container">
        <div className="content__container">
            <Navbar navbarText="Report Data / Claim" />
                <div className="input__container">
                    <div className="left__container__input">
                        <BoxInput placeholder="Nama" />
                        <BoxInput placeholder="Tanggal" />
                        <Button text="Pencarian" className="search__button" />
                    </div>
                    <div className="right__container__input">
                    </div>
                </div>
            <Information informationText="Claim" showDropdown={false} fields={infoTopFields}/>
        </div>
    </div>
}

export default ReportDataClaim