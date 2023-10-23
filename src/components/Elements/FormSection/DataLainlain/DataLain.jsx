/* eslint-disable react/prop-types */
import "./datalain.css"
import BoxInput from "../../BoxInput/BoxInput"
import TextArea from "../../TextArea/TextArea"

const DataLainlain = (props) => {
    
  return (
    <div className="data__lain__container">
        <div onClick={props.onClickLain} className="section__header">
            <div className="section__header__top">
                <h1>Data Lain-lain</h1>
                <i className={props.showChildrenLain ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/>
            </div>
            <div className="section__bottom">
                <div className="horizontal__line"></div>
            </div>
        </div>

        {props.showChildrenLain && (
            <div className="data__lain__children">
                <div className="form__row">
                    <div className="form__row__left">
                        <p>Kontak Darurat</p>
                    </div>          
                    <div className="form__row__right">
                        <BoxInput placeholder="Kontak Darurat" />    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Status Kontak</p>
                    </div>          
                    <div className="form__row__right">
                        <BoxInput placeholder="Status Kontak" />    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Alamat Kontak</p>
                    </div>          
                    <div className="form__row__right">
                        <TextArea placeholder="Alamat Kontak" />    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Telp. Darurat</p>
                    </div>          
                    <div className="form__row__right">
                        <BoxInput placeholder="Telp. Darurat" />    
                    </div>
                </div>

            </div>
        )}

    </div>
  )
}

export default DataLainlain