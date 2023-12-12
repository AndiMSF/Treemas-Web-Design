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
  {/* Project */}
  {props.itemsProject && (
    <Dropdown onSelect={handleDropdownSelect}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {props.title}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {props.itemsProject.map((item, index) => (
          <Dropdown.Item key={index} eventKey={item.value}>
            {item.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )}

  {/* Jabatan */}
  {props.itemsJabatan && (
    <Dropdown onSelect={handleDropdownSelect}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {props.title}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {props.itemsJabatan.map((item, index) => (
          <Dropdown.Item key={index} eventKey={item.value}>
            {item.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )}

  {/* Default Dropdown */}
  {!props.itemsProject && !props.itemsJabatan && (
    <Dropdown onSelect={handleDropdownSelect}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {props.onFormData.agama ? props.onFormData.agama : props.title}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {props.itemsAgama && props.itemsAgama.map((item, index) => (
          <Dropdown.Item key={index} eventKey={item}>
            {item}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )}
</div>
  )
}

export default DropdownMenu;
