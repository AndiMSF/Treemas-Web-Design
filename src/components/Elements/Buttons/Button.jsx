/* eslint-disable react/prop-types */
import "./button.css"

const Button = (props) => {
    return <>
        <button type="submit" className={props.className} onClick={props.onClick}>{props.text}</button>
    </>
}

export default Button