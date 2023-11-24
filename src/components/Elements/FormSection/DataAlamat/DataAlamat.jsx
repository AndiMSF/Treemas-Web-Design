/* eslint-disable react/prop-types */
import "./dataalamat.css"
import TextArea from "../../TextArea/TextArea"
import BoxInput from "../../BoxInput/BoxInput"

const DataAlamat = (props) => {
    
  return (
    <div className="data__alamat__container">
        <div onClick={props.onClickAlamat} className="section__header">
            <div className="section__header__top">
                <h1>Data Alamat</h1>
                <i className={props.showChildrenAlamat ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/>
            </div>
            <div className="section__bottom">
                <div className="horizontal__line"></div>
            </div>
        </div>

        {props.showChildrenAlamat && (
            <div className="data__alamat__children">
                <div className="form__row">
                    <div className="form__row__left">
                        <p>Alamat KTP</p>
                    </div>          
                    <div className="form__row__right">
                        <TextArea placeholder="Alamat KTP" />    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Alamat Sekarang</p>
                    </div>          
                    <div className="form__row__right">
                        <TextArea placeholder="Alamat Sekarang" />    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Kode Pos</p>
                    </div>          
                    <div className="form__row__right">
                        <BoxInput placeholder="Kode Pos" />    
                    </div>
                </div>

            </div>
        )}
    </div>
  )
}

export default DataAlamat