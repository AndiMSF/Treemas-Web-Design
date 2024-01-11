/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./password.css"
import { useState } from "react"
import { FormControl } from "react-bootstrap"

const Password = (props) => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')

  return (
    <div className="password__container">
        <div onClick={props.onClickPassword} className="section__header">
            <div className="section__header__top">
                <h1>Ganti Password</h1>
                <i className={props.showChildrenPassword ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/>
            </div>
            <div className="section__bottom">
            </div>
        </div>

        {props.showChildrenPassword && (
            <div className="password__children">
                <div className="form__row">
                    <div className="form__row__left">
                        <p>Old Password</p>
                    </div>          
                    <div className="form__row__right">
                    <FormControl type="text" placeholder="Old Password" value={props.onFormData.sqlPassword}
                    onChange={(e) => {
                        setOldPassword(e.target.value)
                        props.onOldPasswordChange(e.target.value)
                    } }/>       
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__row__left">
                        <p>New Password</p>
                    </div>          
                    <div className="form__row__right">
                    <FormControl type="text" placeholder="New Password" value={props.onFormData.newPassword}
                    onChange={(e) => {
                        setNewPassword(e.target.value)
                        props.onNewPasswordChange(e.target.value)
                    } }/>
                    </div>
                </div>


                <div className="form__row">
                    <div className="form__row__left">
                        <p>Confirm Password</p>
                    </div>          
                    <div className="form__row__right">
                    <FormControl type="text" placeholder="Confirm Password" value={props.onFormData.confPassword}
                    onChange={(e) => {
                        setConfPassword(e.target.value)
                        props.onConfPasswordChange(e.target.value)
                    } }/>
                    </div>
                </div>

            </div>
        )}

    </div>
  )
}

export default Password