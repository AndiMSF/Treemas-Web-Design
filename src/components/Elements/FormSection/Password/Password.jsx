/* eslint-disable react/prop-types */
import "./password.css"
import BoxInput from "../../BoxInput/BoxInput"

const Password = (props) => {

  return (
    <div className="password__container">
        <div onClick={props.onClickPassword} className="section__header">
            <div className="section__header__top">
                <h1>Password</h1>
                <i className={props.showChildrenPassword ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/>
            </div>
            <div className="section__bottom">
                <div className="horizontal__line"></div>
            </div>
        </div>

        {props.showChildrenPassword && (
            <div className="password__children">
                <div className="form__row">
                    <div className="form__row__left">
                        <p>Old Password</p>
                    </div>          
                    <div className="form__row__right">
                        <BoxInput placeholder="Old Password" />    
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>New Password</p>
                    </div>          
                    <div className="form__row__right">
                        <BoxInput placeholder="New Password" />    
                    </div>
                </div>


                <div className="form__row">
                    <div className="form__row__left">
                        <p>Confirm Password</p>
                    </div>          
                    <div className="form__row__right">
                        <BoxInput placeholder="Confirm Password" />    
                    </div>
                </div>

            </div>
        )}

    </div>
  )
}

export default Password