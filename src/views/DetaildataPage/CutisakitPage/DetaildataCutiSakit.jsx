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
import "./cutisakit.css";

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

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Perlu ditambah 1 karena indeks bulan dimulai dari 0
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const getRowColor = (row) => {
    switch (row.status) {
      case "DISETUJUI":
        return {
          backgroundColor: "#AAD9BB",
          color: "0000",
          borderRadius: "5px",
          padding: "5px",
          width: "85%",
          textAlign: "center",
          fontWeight: "600",
        };
      case "DITOLAK":
        return {
          backgroundColor: "#E74646",
          color: "0000",
          borderRadius: "5px",
          padding: "5px",
          width: "85%",
          textAlign: "center",
          fontWeight: "600",
        };
      case "MENUNGGU":
        return {
          backgroundColor: "#FAEF9B",
          color: "0000",
          borderRadius: "5px",
          padding: "5px",
          width: "85%",
          textAlign: "center",
          fontWeight: "600",
        };
      default:
        return {}; // Default style
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        let response;
        if (dropdownItems === "Cuti") {
          response = await fetch(
            "http://localhost:8081/api/detail-data/cuti-view",
            {
              method: "GET", // Sesuaikan metode sesuai kebutuhan (GET, POST, dll.)
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Sertakan token di sini
              },
            }
          );
        } else if (dropdownItems === "Sakit") {
          response = await fetch(
            "http://localhost:8081/api/detail-data/sakit-view",
            {
              method: "GET", // Sesuaikan metode sesuai kebutuhan (GET, POST, dll.)
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Sertakan token di sini
              },
            }
          );
        } else {
          response = await fetch(
            "http://localhost:8081/api/detail-data/cuti-view",
            {
              method: "GET", // Sesuaikan metode sesuai kebutuhan (GET, POST, dll.)
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Sertakan token di sini
              },
            }
          );
        }
        // Tambahkan penanganan kesalahan di sini
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.status === "Success") {
          let combinedData = [];

          // Handle data.data.setujuAtauTolak
          if (dropdownItems === "Sakit") {
            combinedData = data.data.setujuAtauTolak.map((item) => ({
              ...item,
              status:
                item.isApproved === "1"
                  ? "DISETUJUI"
                  : item.isApproved === "0"
                  ? "DITOLAK"
                  : "",
            }));
          }

          // Handle data.data.menunggu
          const menungguData = data.data.menunggu.map((item) => ({
            ...item,
            status: item.isApproved == null ? "MENUNGGU" : "",
          }));

          combinedData = combinedData.concat(menungguData);

          setApiData(combinedData);
        } else {
          setError("Failed to fetch data");
        }
      } catch (error) {
        if (error.message.includes("HTTP error!")) {
          const statusCode = parseInt(error.message.split(" ").pop());
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
      console.log("Token: " + token);
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
      selector: (row) => row.nik || "-",
      cellExport: (row) => row.title || "-",
      sortable: true,
    },
    {
      name: "Nama Karyawan",
      selector: (row) => row.namaKaryawan || "-",
      cellExport: (row) => row.title || "-",
      sortable: true,
    },
    {
      name: "Tgl. Pengajuan",
      selector: (row) => formatTimestamp(row.tglMulai) || "-",
      cellExport: (row) => formatTimestamp(row.title) || "-",
      sortable: true,
    },
    {
      name: "Tgl. Selesai",
      selector: (row) => formatTimestamp(row.tglSelesai) || "-",
      cellExport: (row) => formatTimestamp(row.title) || "-",
      sortable: true,
    },
    {
      name: "Tgl. Masuk",
      selector: (row) => formatTimestamp(row.tglMasuk) || "-",
      cellExport: (row) => formatTimestamp(row.title) || "-",
      sortable: true,
    },
    {
      name: "Jml. Cuti",
      selector: (row) => row.jmlCuti || "-",
      cellExport: (row) => row.title || "-",
      sortable: true,
    },
    {
      name: "Keperluan Cuti",
      selector: (row) => row.keperluanCuti || "-",
      cellExport: (row) => row.title || "-",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status || "-",
      cellExport: (row) => row.title || "-",
      sortable: true,
      cell: (row) => <div style={getRowColor(row)}>{row.status}</div>,
    },
    {
      name: "Status Oleh",
      selector: (row) => row.usrapp || "-",
      cellExport: (row) => row.title || "-",
      sorable: true,
    },
    {
      name: "Tgl. Status",
      selector: (row) => formatTimestamp(row.dtmapp) || "-",
      cellExport: (row) => formatTimestamp(row.dtampp) || "-",
      sortable: true,
    },
  ];

  const dataTable = {
    columns,
    data: apiData,
  };

  return (
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
  );
};

export default DetaildataCutiSakit;
