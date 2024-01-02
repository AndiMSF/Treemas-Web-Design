/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import "./useraccess.css"
import Navbar from "../../../components/Content/Navbar/Navbar"
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useNavigate } from "react-router-dom/dist";
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
// Switch
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// SweetAlert
import Swal from 'sweetalert2'
import { Dropdown } from "react-bootstrap";

const ManagementUserAccess = () => {
    const navigate = useNavigate();
    const [isToken, setIstoken] = useState('');
    const [dropdownTitle, setDropdownTitle] = useState("Pilih Jabatan");
    const [dropdownData, setDropdownData] = useState([])

    useEffect(() => {
      const fetchData = async () => {
          try {
            const response = await fetch('https://treemas-api-405402.et.r.appspot.com/api/master-data/jabatan-view', {
            method: 'GET', // Sesuaikan metode sesuai kebutuhan (GET, POST, dll.)
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // Sertakan token di sini
            },
          });
            const data = await response.json();
            if (data.status === 'Success') {
              setDropdownData(data.data);
              console.log(data);
              
            } else {
              setError('Failed to fetch data');
            }
          } catch (error) {
            setError(`Error fetching data: ${error.message}`);
          } 
        };

      const token = localStorage.getItem("authToken")
      if (token) {
        setIstoken(token)
        fetchData(); // Panggil fungsi fetchData setelah mendapatkan token

        // request ke server setiap 5detik untuk memperbarui data secara otomatis tapi bisa memperlambat server?
      //   const intervalId = setInterval(fetchData, 5000); // Polling setiap 5 detik (5000 milidetik)

      //   // Bersihkan interval saat komponen di-unmount
      //   return () => {
      //     clearInterval(intervalId);
      //   };
      }else{
        navigate("/login");
      }
    }, [navigate])

    const handleDropdownSelect = (selectedItem) => {
      setDropdownTitle(selectedItem);
      console.log(selectedItem);
    };

    // Switch
    const [checked, setChecked] = useState(true);

    const handleChange = (event) => {
      setChecked(event.target.checked);
      console.log(event.target.checked);
    };
    const Android12Switch = styled(Switch)(({ theme }) => ({
      padding: 8,
      '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 16,
          height: 16,
        },
        '&::before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
            theme.palette.getContrastText(theme.palette.primary.main),
          )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
          left: 12,
        },
        '&::after': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
            theme.palette.getContrastText(theme.palette.primary.main),
          )}" d="M19,13H5V11H19V13Z" /></svg>')`,
          right: 12,
        },
      },
      '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
      },
    }));


    return <div className="content__container">
        <Navbar navbarText="Management / Data User Access" />            
            <div className="table__container">
              <div className="user__access__top">
                <h1>Data User Access</h1>
              </div>
              <div className="horizontal__line"></div>
              <div className="user__access__middle">
                <div className="user__access__middle__top">
                <Dropdown onSelect={handleDropdownSelect} className="user__access__dropdown">
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {dropdownTitle}
                </Dropdown.Toggle>
  
                <Dropdown.Menu>
                  {dropdownData.map((item, index) => (
                    <Dropdown.Item key={index} eventKey={item.namaJabatan}>
                      {item.namaJabatan}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
                </div>
                <div className="user__access__middle__bottom">
                  <div className="access__row">
                    <div className="access__row__left">
                    <FormControlLabel
                      control={<Android12Switch />}
                      label="Menu"
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                    </div>
                    <div className="access__row__right">
                      <h1>Sub Menu</h1>
                    </div>
                  </div>
                  <div className="access__row">
                    <div className="access__row__left">
                      <FormControlLabel
                        control={<Android12Switch />}
                        label="Dashboard"
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </div>
                    <div className="access__row__right">
                      
                    </div>
                  </div>
                  <div className="access__row">
                    <div className="access__row__left">
                      <FormControlLabel
                          control={<Android12Switch />}
                          label="Detail Data"
                          checked={checked}
                          onChange={handleChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </div>
                    <div className="access__row__right__parent">
                      <div className="access__row__right">
                        <FormControlLabel
                              control={<Android12Switch />}
                              label="Absen"
                              checked={checked}
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                      </div>
                      <div className="access__row__right">
                        <FormControlLabel
                              control={<Android12Switch />}
                              label="Cuti/Sakit"
                              checked={checked}
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                      </div>
                      <div className="access__row__right">
                        <FormControlLabel
                              control={<Android12Switch />}
                              label="Reimburse"
                              checked={checked}
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                      </div>
                      <div className="access__row__right">
                        <FormControlLabel
                              control={<Android12Switch />}
                              label="Timesheet"
                              checked={checked}
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                      </div>
                      <div className="access__row__right">
                        <FormControlLabel
                              control={<Android12Switch />}
                              label="Tracking"
                              checked={checked}
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                      </div>
                    </div>
                  </div>
                  <div className="access__row">
                    <div className="access__row__left">
                      <FormControlLabel
                          control={<Android12Switch />}
                          label="Management"
                          checked={checked}
                          onChange={handleChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </div>
                    <div className="access__row__right__parent">
                      <div className="access__row__right">
                        <FormControlLabel
                              control={<Android12Switch />}
                              label="User"
                              checked={checked}
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                      </div>
                      <div className="access__row__right">
                        <FormControlLabel
                              control={<Android12Switch />}
                              label="User Access"
                              checked={checked}
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                      </div>
                      <div className="access__row__right">
                        <FormControlLabel
                              control={<Android12Switch />}
                              label="User Member"
                              checked={checked}
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                      </div>
                    </div>
                  </div>
                  <div className="access__row">
                    <div className="access__row__left">
                      <FormControlLabel
                          control={<Android12Switch />}
                          label="Manual Service"
                          checked={checked}
                          onChange={handleChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </div>
                  </div>
                  <div className="access__row">
                    <div className="access__row__left">
                      <FormControlLabel
                          control={<Android12Switch />}
                          label="Master Data"
                          checked={checked}
                          onChange={handleChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </div>
                    <div className="access__row__right__parent">
                      <div className="access__row__right">
                        <FormControlLabel
                              control={<Android12Switch />}
                              label="Announcement"
                              checked={checked}
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                      </div>
                      <div className="access__row__right">
                        <FormControlLabel
                              control={<Android12Switch />}
                              label="Claim"
                              checked={checked}
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                      </div>
                      <div className="access__row__right">
                        <FormControlLabel
                              control={<Android12Switch />}
                              label="Cuti"
                              checked={checked}
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                      </div>
                      <div className="access__row__right">
                        <FormControlLabel
                              control={<Android12Switch />}
                              label="Jabatan"
                              checked={checked}
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                      </div>
                      <div className="access__row__right">
                        <FormControlLabel
                              control={<Android12Switch />}
                              label="Karyawan"
                              checked={checked}
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                      </div>
                      <div className="access__row__right">
                        <FormControlLabel
                              control={<Android12Switch />}
                              label="Libur"
                              checked={checked}
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                      </div>
                      <div className="access__row__right">
                        <FormControlLabel
                              control={<Android12Switch />}
                              label="Permission"
                              checked={checked}
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                      </div>
                      <div className="access__row__right">
                        <FormControlLabel
                              control={<Android12Switch />}
                              label="Project"
                              checked={checked}
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                      </div>
                    </div>
                  </div>
                  <div className="access__row">
                    <div className="access__row__left">
                      <FormControlLabel
                          control={<Android12Switch />}
                          label="Parameter"
                          checked={checked}
                          onChange={handleChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </div>
                    <div className="access__row__right__parent">
                      <div className="access__row__right">
                        <FormControlLabel
                              control={<Android12Switch />}
                              label="General"
                              checked={checked}
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                      </div>                   
                      <div className="access__row__right">
                        <FormControlLabel
                              control={<Android12Switch />}
                              label="Reimburse"
                              checked={checked}
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                      </div>
                    </div>
                  </div>
                  <div className="access__row">
                    <div className="access__row__left">
                      <FormControlLabel
                          control={<Android12Switch />}
                          label="Report Data"
                          checked={checked}
                          onChange={handleChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </div>
                    <div className="access__row__right__parent">
                      <div className="access__row__right">
                        <FormControlLabel
                              control={<Android12Switch />}
                              label="Claim"
                              checked={checked}
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                      </div>     
                      <div className="access__row__right">
                        <FormControlLabel
                              control={<Android12Switch />}
                              label="Detail"
                              checked={checked}
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                      </div>                   
                      <div className="access__row__right">
                        <FormControlLabel
                              control={<Android12Switch />}
                              label="Summary"
                              checked={checked}
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                      </div>
                    </div>
                  </div>
                  <div className="access__row">
                    <div className="access__row__left">
                      <FormControlLabel
                          control={<Android12Switch />}
                          label="Upload"
                          checked={checked}
                          onChange={handleChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </div>
                    <div className="access__row__right__parent">
                      <div className="access__row__right">
                        <FormControlLabel
                              control={<Android12Switch />}
                              label="Absen"
                              checked={checked}
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                      </div>                   
                      <div className="access__row__right">
                        <FormControlLabel
                              control={<Android12Switch />}
                              label="Apk"
                              checked={checked}
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="user__access__bottom">

              </div>
            </div>

        </div>
}

export default ManagementUserAccess