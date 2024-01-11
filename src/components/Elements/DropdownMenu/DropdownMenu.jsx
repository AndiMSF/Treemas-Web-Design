 /* eslint-disable no-unused-vars */
/* DropdownMenu.jsx */
/* eslint-disable react/prop-types */
import { Dropdown } from 'react-bootstrap';
import "./dropdownmenu.css"
import { useEffect, useState } from 'react';

const DropdownMenu = (props) => {

  // State lokal untuk menyimpan nilai terpilih dari dropdown
  const [selectedJabatan, setSelectedJabatan] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedAgama, setSelectedAgama] = useState(null)
  const handleDropdownSelect = (selectedItem) => {
    if (props.onDropdownChange) {
      props.onDropdownChange(selectedItem)
    }
  }  

  const handleDropdownJabatan = (selectedJabatan) => {
    const selectedItem = props.itemsJabatan.find(item => item.label === selectedJabatan);

  // Send the value of the selected item (item.value) to the parent
    props.onJabatanChange(selectedItem.value);
    console.log(selectedItem.value);
    setSelectedJabatan(selectedJabatan)
  }

  const handleDropdownProject = (selectedProject) => {
    const selectedItem = props.itemsProject.find(item => item.label === selectedProject);

  // Send the value of the selected item (item.value) to the parent
    props.onProjectChange(selectedItem.value);
    setSelectedProject(selectedProject)
  }

  const handleDropdownAgama = (selectedAgama) => {
    props.onAgamaChange(selectedAgama)
    setSelectedProject(selectedAgama)
  }

  return (
    <div>
  {/* Project */}
  {props.itemsProject && (
    <Dropdown onSelect={handleDropdownProject}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
      {(selectedProject !== null && selectedProject) || (props.onFormData?.projectId?.namaProject) || props.title}
      </Dropdown.Toggle>

      <Dropdown.Menu className="karyawan__dropdown">
        {props.itemsProject.map((item, index) => (
          <Dropdown.Item key={index} eventKey={item.label}>
            {item.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )}

  {/* Jabatan */}
  {props.itemsJabatan && (
    <Dropdown onSelect={handleDropdownJabatan}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
      {(selectedJabatan !== null && selectedJabatan) || (props.onSys?.role?.namaJabatan) || props.title}
      </Dropdown.Toggle>

      <Dropdown.Menu id="karyawan__dropdown">
        {props.itemsJabatan.map((item, index) => (
          <Dropdown.Item key={index} eventKey={item.label}>
            {item.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )}

  {/* Agama */}
  {props.itemsAgama && (
    <Dropdown onSelect={handleDropdownAgama}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
      {(selectedAgama !== null && selectedAgama) || (props.onFormData?.agama) || props.title}
      </Dropdown.Toggle>

      <Dropdown.Menu id="karyawan__dropdown">
        {props.itemsAgama.map((item, index) => (
          <Dropdown.Item key={index} eventKey={item}>
            {item}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )}

  {/* Default Dropdown */}
  {!props.itemsProject && !props.itemsJabatan && !props.itemsAgama && (
    <Dropdown onSelect={handleDropdownSelect}>
      <Dropdown.Toggle variant="primary" id="standard__dropdown">
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
  )}
</div>
  )
}

export default DropdownMenu;
