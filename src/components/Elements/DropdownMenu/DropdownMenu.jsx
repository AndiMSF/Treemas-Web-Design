/* eslint-disable no-unused-vars */
/* DropdownMenu.jsx */
/* eslint-disable react/prop-types */
import { Dropdown } from 'react-bootstrap';
import "./dropdownmenu.css"

const DropdownMenu = (props) => {
  const handleDropdownSelect = (selectedItem) => {
    if (props.onDropdownChange) {
      props.onDropdownChange(selectedItem)
    }
  }  

  return (
    <div>
      {/* Dropdown */}
      <Dropdown onSelect={handleDropdownSelect}>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {props.title}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {props.items && props.items.map((item, index) => (
            <Dropdown.Item key={index} eventKey={item}>
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default DropdownMenu;
