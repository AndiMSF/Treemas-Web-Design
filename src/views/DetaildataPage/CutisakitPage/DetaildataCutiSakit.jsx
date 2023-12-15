/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import { useNavigate } from "react-router-dom/dist";
import { Dropdown } from "react-bootstrap";
import BoxInput from "../../../components/Elements/BoxInput/BoxInput";
import Button from "../../../components/Elements/Buttons/Button";
import Navbar from "../../../components/Content/Navbar/Navbar";
import "../../../components/Elements/DropdownMenu/dropdownmenu.css";
import "./cutisakit.css"

const DetaildataCutiSakit = (props) => {
  const [dropdownItems, setDropdownItems] = useState("Cuti");
  const [informationText, setInformationText] = useState("Cuti");
  const [isToken, setIstoken] = useState("");
  const [apiData, setApiData] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleDropdownSelect = (selectedItem) => {
    setDropdownItems(selectedItem);
  };

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        let response;
        if (dropdownItems === "Cuti") {
            response = await fetch('https://treemas-api-405402.et.r.appspot.com/api/detail-data/cuti-view', {
            method: 'GET', // Sesuaikan metode sesuai kebutuhan (GET, POST, dll.)
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Sertakan token di sini
            },
        });
        }  else if (dropdownItems === "Sakit") {
            response = await fetch('https://treemas-api-405402.et.r.appspot.com/api/detail-data/sakit-view', {
            method: 'GET', // Sesuaikan metode sesuai kebutuhan (GET, POST, dll.)
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Sertakan token di sini
            },
        });
        } else {
            response = await fetch('https://treemas-api-405402.et.r.appspot.com/api/detail-data/cuti-view', {
            method: 'GET', // Sesuaikan metode sesuai kebutuhan (GET, POST, dll.)
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Sertakan token di sini
            },
        });
        }
        // Tambahkan penanganan kesalahan di sini
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.status === 'Success') {
          // Menggabungkan data setujuAtauTolak dan menunggu ke dalam satu variabel
            if (dropdownItems === "Cuti") {
               // Menggabungkan data setujuAtauTolak dan menunggu ke dalam satu variabel
                let combinedData = data.data.setujuAtauTolak.concat(data.data.menunggu);
                console.log(combinedData);
                // Mengganti nilai isApproved menjadi string yang sesuai
                combinedData = combinedData.map(item => ({
                    ...item,
                    status: item.isApproved === "1" ? "Disetujui" : item.isApproved === "0" ? "Ditolak" : "Menunggu",
                }));

              setApiData(combinedData);
              } else if (dropdownItems === "Sakit") {
              // Menggabungkan data setujuAtauTolak dan menunggu ke dalam satu variabel
              let combinedData = data.data.setujuAtauTolak.concat(data.data.menunggu);
                console.log(combinedData);              
              // Mengganti nilai isApproved menjadi string yang sesuai
              combinedData = combinedData.map(item => ({
                  ...item,
                  status: item.isApproved === "1" ? "Disetujui" : item.isApproved === "0" ? "Ditolak" : "Menunggu",
              }));

              setApiData(combinedData);
              }
            } else {
              setError("Failed to fetch data");
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
            setError(`Error fetching data: ${error.message}`);
          }
        } else {
          console.log("Gak Masuk 401");
          setError(`Error fetching data: ${error.message}`);
        }
      }
    };

    const token = localStorage.getItem("authToken");
    if (token) {
      setIstoken(token);
      fetchData(); // Panggil fungsi fetchData setelah mendapatkan token
      console.log('Token: ' + token);
    } else {
      navigate("/login");
    }
  }, [navigate, dropdownItems]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const columns = [
    {
      name: "NIK",
      selector: (row) => row.nik  || '-',
      sortable: true,
    },
    {
      name: "Nama Karyawan",
      selector: (row) => row.namaKaryawan || '-',
      sortable: true,
    },
    {
      name: "Tgl. Pengajuan",
      selector: (row) => row.tglMulai  || '-',
      sortable: true,
    },
    {
      name: "Tgl. Selesai",
      selector: (row) => row.tglSelesai || '-',
      sortable: true,
    },
    {
      name: "Tgl. Masuk",
      selector: (row) => row.tglMasuk || '-',
      sortable: true,
    },
    {
      name: "Jml. Cuti",
      selector: (row) => row.jmlCuti  || '-',
      sortable: true,
    },
    {
      name: "Keperluan Cuti",
      selector: (row) => row.keperluanCuti || '-',
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status || '-',
      sortable: true,
    },
    {
      name: "Status Oleh",
      selector: (row) => row.usrapp || '-',
      sortable: true,
    },
    {
      name: "Tgl. Status",
      selector: (row) => row.dtmapp || '-',
      sortable: true,
    },
  ];

  const dataTable = {
    columns,
    data: apiData,
  };

  return (
    <div className="cutisakit__container">
      <div className="content__container">
        <Navbar navbarText="Detail Data / Cuti Sakit" />
        <div className="input__container">
          <div className="left__container__input">
            <Dropdown onSelect={handleDropdownSelect}>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                {dropdownItems}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {["Cuti", "Sakit"].map((item, index) => (
                  <Dropdown.Item key={index} eventKey={item}>
                    {item}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="right__container__input"></div>
        </div>
        <div className="table__container">
          <DataTableExtensions {...dataTable}>
            <DataTable
              columns={columns}
              data={apiData}
              noHeader
              defaultSortField="NIK"
              sortIcon={<SortIcon />}
              defaultSortAsc={true}
              pagination
              highlightOnHover
              dense
            />
          </DataTableExtensions>
        </div>
      </div>
    </div>
  );
};

export default DetaildataCutiSakit;
