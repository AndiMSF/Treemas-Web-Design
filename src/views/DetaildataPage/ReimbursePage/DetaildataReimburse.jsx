/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import "./reimburse.css"
import Information from "../../../components/Content/Information/Information"
import BoxInput from "../../../components/Elements/BoxInput/BoxInput"
import Navbar from "../../../components/Content/Navbar/Navbar"
import Button from "../../../components/Elements/Buttons/Button"
import { useEffect, useState } from "react"
import DropdownMenu from "../../../components/Elements/DropdownMenu/DropdownMenu"
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component"
import SortIcon from "@material-ui/icons/ArrowDownward";
import { useNavigate } from "react-router-dom"
import { Dropdown } from "react-bootstrap";

const DetaildataReimburse = () => {
    const navigate = useNavigate();
    const dropdownItems = ["Data Diri", "Data Member"];
    const infoTopFields = ["NIK", "Nama Karyawan", "Hari", "Tanggal", "Project", "Jam Masuk", "Jam Pulang", "Uang Makan", "Transport"]
    const [ informationText, setInformationText] = useState("Data Diri");
    const [totalJamText, setTotalJamText] = useState("Pilih Total Jam")   
    const [apiData, setApiData] = useState([])    

    const handleDropdownChange = (selectedItem) => {
      setInformationText(selectedItem);
  }

    const handleTotalJam = (selectedItem) => {
        setTotalJamText(selectedItem)
    }
    
    let api;

    useEffect(() => {
      const token = localStorage.getItem("authToken")
      const fetchData = async () => {
        try {
          const response = await fetch(api, {
          method: 'GET', // Sesuaikan metode sesuai kebutuhan (GET, POST, dll.)
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Sertakan token di sini
          },
        });
        // Tambahkan penanganan kesalahan di sini
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
          const data = await response.json();
          console.log(data);
          if (data.success === true) {
            setApiData(data.data);
            console.log("LAH");
            console.log(data.data);
            
          }
        } catch (error) {
          if (error.message.includes('HTTP error!')) {
            const statusCode = parseInt(error.message.split(' ').pop());
            console.log("Status Code:", statusCode);
        
            if (statusCode === 401) {
              console.log("Masuk 401");
              // Token expired, remove token from local storage and redirect to login
              localStorage.removeItem("authToken");
            } else {
              console.log("Gak Masuk 401");
            }
          }
        }
      }
      if (token) {
          fetchData(); // Panggil fungsi fetchData setelah mendapatkan token
          console.log('Token: ' + token);
        } else {
          navigate("/login");
        }
      }, [navigate, dropdownItems]);


  let columns;
  let dataTable;

  if( informationText === "Data Diri") {
      api = 'https://treemas-api-405402.et.r.appspot.com/api/rekap/get-rekap-reimburse'
      console.log("INI DATA DIRI");
  // Data
    const nik = localStorage.getItem("nik")
    const userName = localStorage.getItem("userName")

    columns = [
        {
            name: "NIK",
            selector: (row) => nik || '-',
            cellExport: (row) => nik || '-',
            sortable: true
        },
        {
            name: "Nama Karyawan",
            selector: (row) => userName || '-',
            cellExport: (row) => userName|| '-',
            sortable: true
        },
        {
            name: "Hari",
            selector: (row) => row.hari || '-',
            cellExport: (row) => row.hari || '-',
            sortable: true
        },  
        {
            name: "Tanggal",
            selector: (row) => row.tanggal || '-',
            cellExport: (row) => row.tanggal || '-',
            sortable: true
        },  
        {
            name: "Project",
            selector: (row) => row.namaProject || '-',
            cellExport: (row) => row.namaProject || '-',
            sortable: true
        },  
        {
            name: "Jam Masuk",
            selector: (row) => row.jamMsk || '-',
            cellExport: (row) => row.jamMsk || '-',
            sortable: true
        },
        {
          name: "Jam Pulang",
          selector: (row) => row.jamPlg || '-',
          cellExport: (row) => row.jamPlg || '-',
          sortable: true
        },
        {
          name: "Uang Makan",
          selector: (row) => row.uangMakan + ' m' || '-',
          cellExport: (row) => row.uangMakan || '-',
          sortable: true
        },
        {
          name: "Transport",
          selector: (row) => row.transport || '-',
          cellExport: (row) => row.transport || '-',
          sortable: true
        }
      ];
    
      const dataTable = {
        columns,
        data: apiData
      };

    return(
    <div className="content__container">
        <Navbar navbarText="Detail Data / Reimburse" />
        <div className="input__container">
            <Dropdown onSelect={handleDropdownChange}>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {(informationText) || (dropdownItems)}
                </Dropdown.Toggle>
  
                <Dropdown.Menu>
                  {dropdownItems.map((item, index) => (
                    <Dropdown.Item key={index} eventKey={item}>
                      {item}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>       

        <div className="table__container">
            <DataTableExtensions {...dataTable}>
            <DataTable
           columns={columns}
            data={apiData}
            noHeader
            defaultSortField="nik"
            sortIcon={<SortIcon />}
            defaultSortAsc={true}
            pagination
            highlightOnHover
            dense
            />
            </DataTableExtensions>
        </div>        
    </div>
)
}}

export default DetaildataReimburse