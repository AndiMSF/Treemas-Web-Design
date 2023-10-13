/* eslint-disable react/prop-types */
import "./information.css"
import InformationTop from "./information_top/informationTop"
import InformationMiddle from "./information_middle/InformationMiddle"
import InformationBottom from "./information_bottom/InformationBottom"

const Information = (props) => {

    return <div className="information__container">
        <InformationTop fields={props.fields} informationText={props.informationText} dropdownTitle={props.dropdownTitle} showDropdown={props.showDropdown} items={props.items} onDropdownChange={props.onDropdownChange}/>
        <InformationMiddle />
        <InformationBottom />
    </div>
}

export default Information