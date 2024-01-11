/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./informationTop.css"
import { useState } from "react"
import DropdownMenu from "../../../Elements/DropdownMenu/DropdownMenu"

const InformationTop = (props) => {
    const [active, setActive] = useState(false)

    const handleClick = () => {
        return setActive(!active)
    }

    return <div className="information__top">
        <div className="information__top__top">
            <div className="information__top__left">
                {props.showDropdown ? <DropdownMenu items={props.items} title={props.dropdownTitle} onDropdownChange={props.onDropdownChange}/> : <h1>{props.informationText}</h1>}
            </div>
            <div className="information__top__right">
                <div className="sort" onClick={handleClick}>
                    <i className={active ? "fa fa-sort-amount-desc" : "fa fa-sort-amount-asc"} aria-hidden="true"></i>
                    <h1>Sort</h1>
                    </div>
                <div className="filter">
                    <i className="fa fa-filter" aria-hidden="true"></i>
                    <h1>Filter</h1>
                </div>
            </div>  
        </div>
        <div className="information__top__bottom">
            <div className="information__top__bottom__fields">
                {props.fields && props.fields.map((field, index) => (
                    <p key={index}>{field}</p>
                ))}
            </div>
            <div className="horizontal__line"></div>
        </div>
    </div>
}

export default InformationTop