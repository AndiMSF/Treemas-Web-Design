/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

const DropdownMenu = (props) => {
    return <li className={props.isActive ? "color dropdown__item" : "non_color dropdown__item"} onClick={props.onClick}>
        <div className={props.isActive ? "active" : "non_active"}></div>
        <Link to={props.link}>{props.text}</Link>
    </li>
}

export default DropdownMenu