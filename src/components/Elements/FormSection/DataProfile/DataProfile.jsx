import "./dataprofile.css"
import BoxInput from "../../BoxInput/BoxInput"
import { Form } from "react-bootstrap"

const DataProfile = (props) => {

  return (
    <div className="data__profile__container" >
        <div onClick={props.onClick} className="data_profile__header">
            <div className="data__profile__header__top">
                <h1>Data Profile</h1>
                <i className={props.showChildrenProfile ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/>
            </div>
            <div className="data__profile__header__bottom">
                <div className="horizontal__line"></div>
            </div>
            
        </div>


        {props.showChildrenProfile && (
            <div className="data__profile__children">
                <div className="form__row">
                    <div className="form__row__left">
                        <p>Nama Lengkap</p>
                    </div>          
                    <div className="form__row__right">
                        <BoxInput placeholder="Nama" />    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>No. KTP</p>
                    </div>          
                    <div className="form__row__right">
                        <BoxInput placeholder="No. KTP" />    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>No NPWP</p>
                    </div>          
                    <div className="form__row__right">
                        <BoxInput placeholder="No. NPWP" />    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Email</p>
                    </div>          
                    <div className="form__row__right">
                        <BoxInput placeholder="Email" />    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Tempat Lahir</p>
                    </div>          
                    <div className="form__row__right">
                        <BoxInput placeholder="Tempat Lahir" />    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Tanggal Lahir</p>
                    </div>          
                    <div className="form__row__right">
                        <BoxInput placeholder="Tanggal Lahir" />    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Jenis Kelamin</p>
                    </div>
                    <div className="form__row__right__label">
                        {['checkbox'].map((type) => (
                            <div key={`L`}>
                                <Form.Check // prettier-ignore
                                    type={type}
                                    id={`L`}
                                    label={`L`}
                                />

                            </div>
                        ))}

                        {['checkbox'].map((type) => (
                            <div key={`P`}>
                                <Form.Check // prettier-ignore
                                    type={type}
                                    id={`P`}
                                    label={`P`}
                                />

                            </div>
                        ))}
                    </div>

                    
                    
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>Golongan Darah</p>
                    </div>
                    <div className="form__row__right__label">
                        {['checkbox'].map((type) => (
                            <div key={`A`}>
                                <Form.Check // prettier-ignore
                                    type={type}
                                    id={`A`}
                                    label={`A`}
                                />

                            </div>
                        ))}

                        {['checkbox'].map((type) => (
                            <div key={`B`}>
                                <Form.Check // prettier-ignore
                                    type={type}
                                    id={`B`}
                                    label={`B`}
                                />

                            </div>
                        ))}

                        {['checkbox'].map((type) => (
                            <div key={`AB`}>
                                <Form.Check // prettier-ignore
                                    type={type}
                                    id={`AB`}
                                    label={`AB`}
                                />

                            </div>
                        ))}

                        {['checkbox'].map((type) => (
                            <div key={`O`}>
                                <Form.Check className="form__check" // prettier-ignore
                                    type={type}
                                    id={`O`}
                                    label={`O`}
                                />

                            </div>
                        ))}
                    </div>

                    
                    
                </div>
                
            </div>
            
        )}
    </div>

  )
}

export default DataProfile