/* eslint-disable react/prop-types */
import "./content.css"
import Information from "./Information/Information"
import Input from "./Input/Input"
import Navbar from "./Navbar/Navbar"

const Content = (props) => {
    return <div className="content__container">
        <Navbar navbarText={props.navbarText} />
        <Input text={props.text}/>
        <Information informationText={props.informationText}/>
    </div>
}

export default Content