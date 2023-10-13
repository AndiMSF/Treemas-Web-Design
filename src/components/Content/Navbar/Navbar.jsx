/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import "./navbar.css"
import Profile from "../../../images/m header.png"
import Search from "../../Elements/Search/Search"
import { Dropdown } from "react-bootstrap"
import DropdownProfile from "../../Elements/DropdownProfile/DropdownProfile"
import { useState } from "react"

const Navbar = (props) => {
    // const [openProfile, setOpenProfile] = useState(false)

    return <div className="navbar__container">
        <div className="left__container__navbar">
            <h1>{props.navbarText}</h1>
        </div>

        <div className="right__container__navbar">
            <Search />
            <div className="vertikal__line"></div>
            <p>Jones Ferdinand</p>
            
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <img src={Profile} alt=""/>                
                </Dropdown.Toggle>

                <Dropdown.Menu style={{backgroundColor: "black"}}>
                    <Dropdown.Item id="dropdown__item__navbar" href="#/action-1">Profile</Dropdown.Item>
                    <Dropdown.Item id="dropdown__item__navbar" href="#/action-2">Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {/* {
                
                openProfile && (
                    <DropdownProfile />
                )
            } */}
            
        </div>
    </div>
}

export default Navbar
