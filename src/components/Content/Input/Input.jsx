import "./input.css"
import Button from "../../Elements/Buttons/Button"
import BoxInput from "../../Elements/BoxInput/BoxInput"

const Input = () => {
    return <div className="input__container">
        <div className="left__container__input">
            <BoxInput placeholder="Tanggal"/>
            <BoxInput placeholder="Nik"/>
            <BoxInput placeholder="Nama"/>

        </div>
        <div className="right__container__input">
            <Button text="Tambah" className="add__button" />
        </div>
        
    </div>
}

export default Input