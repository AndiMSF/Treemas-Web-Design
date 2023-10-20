import "./dataprofile.css"
import BoxInput from "../../BoxInput/BoxInput"
import { Form } from "react-bootstrap"

const DataProfile = (props) => {

  return (
    <div className="data__profile__container" >
        <h1 onClick={props.onClick}>Data Profile</h1>
        <div className="horizontal__line"></div>

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
                            <div key={`default-${type}`}>
                                <Form.Check // prettier-ignore
                                    type={type}
                                    id={`default-${type}`}
                                    label={`default ${type}`}
                                />

                            </div>
                        ))}

                        {['checkbox'].map((type) => (
                            <div key={`default-${type}`}>
                                <Form.Check // prettier-ignore
                                    type={type}
                                    id={`default-${type}`}
                                    label={`default ${type}`}
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