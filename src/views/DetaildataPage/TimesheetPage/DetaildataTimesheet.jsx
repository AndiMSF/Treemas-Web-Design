/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "./timesheet.css";
import Information from "../../../components/Content/Information/Information";
import BoxInput from "../../../components/Elements/BoxInput/BoxInput";
import Navbar from "../../../components/Content/Navbar/Navbar";
import Button from "../../../components/Elements/Buttons/Button";
import { useEffect, useState } from "react";
import DropdownMenu from "../../../components/Elements/DropdownMenu/DropdownMenu";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

const DetaildataTimesheet = () => {
  const navigate = useNavigate();
  const dropdownItems = ["Data Diri", "Data Member"];
  const [informationText, setInformationText] = useState("Data Diri");
  const [totalJamText, setTotalJamText] = useState("Pilih Total Jam");
  const infoTopFields = [
    "NIK",
    "Nama Karyawan",
    "Hari",
    "Tanggal",
    "Project",
    "Jam Masuk",
    "Jam Pulang",
    "Total Jam Kerja",
    "Overtime",
    "Catatan",
  ];
  const [apiData, setApiData] = useState([]);

  const handleDropdownChange = (selectedItem) => {
    setInformationText(selectedItem);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Perlu ditambah 1 karena indeks bulan dimulai dari 0
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const handleTotalJam = (selectedItem) => {
    setTotalJamText(selectedItem);
  };

  let api;

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const fetchData = async () => {
      try {
        const response = await fetch(api, {
          method: "GET", // Sesuaikan metode sesuai kebutuhan (GET, POST, dll.)
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Sertakan token di sini
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
        if (error.message.includes("HTTP error!")) {
          const statusCode = parseInt(error.message.split(" ").pop());
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
    };
    if (token) {
      fetchData(); // Panggil fungsi fetchData setelah mendapatkan token
      console.log("Token: " + token);
    } else {
      navigate("/login");
    }
  }, [navigate, dropdownItems]);

  let columns;
  let dataTable;

  if (informationText === "Data Diri") {
    api = "http://localhost:8081/api/rekap/get-rekap-timesheet";
    console.log("INI DATA DIRI");
    // Data
    columns = [
      {
        name: "NIK",
        selector: (row) => row.nik || "-",
        cellExport: (row) => row.nik || "-",
        sortable: true,
      },
      {
        name: "Nama Karyawan",
        selector: (row) => row.namaKaryawan || "-",
        cellExport: (row) => row.namaKaryawan || "-",
        sortable: true,
      },
      {
        name: "Hari",
        selector: (row) => row.hari || "-",
        cellExport: (row) => row.hari || "-",
        sortable: true,
      },
      {
        name: "Tanggal",
        selector: (row) => formatTimestamp(row.tglMsk) || "-",
        cellExport: (row) => formatTimestamp(row.tglMsk) || "-",
        sortable: true,
      },
      {
        name: "Project",
        selector: (row) =>
          row.projectId && row.projectId.projectId
            ? row.projectId.projectId
            : "-",
        cellExport: (row) =>
          row.projectId && row.projectId.projectId
            ? row.projectId.projectId
            : "-",
        sortable: true,
      },
      {
        name: "Jam Masuk",
        selector: (row) => row.jamMasuk || "-",
        cellExport: (row) => row.jamMasuk || "-",
        sortable: true,
      },
      {
        name: "Jam Pulang",
        selector: (row) => row.jamKeluar || "-",
        cellExport: (row) => row.jamKeluar || "-",
        sortable: true,
      },
      {
        name: "Total Jam Kerja",
        selector: (row) => row.totalJamKerja || "-",
        cellExport: (row) => row.totalJamKerja || "-",
        sortable: true,
      },
      {
        name: "Overtime",
        selector: (row) => row.overtime || "-",
        cellExport: (row) => row.overtime || "-",
        sortable: true,
      },
      {
        name: "Catatan",
        selector: (row) => row.note || "-",
        cellExport: (row) => row.note || "-",
        sortable: true,
      },
    ];

    dataTable = {
      columns,
      data: apiData,
    };
  } else if (informationText === "Data Member") {
    api =
      "http://localhost:8081/api/detail-data/get-rekap-timesheet/data-member";
    console.log("INI DATA MEMBER");
    // Data

    columns = [
      {
        name: "NIK",
        selector: (row) => row.nik || "-",
        cellExport: (row) => row.nik || "-",
        sortable: true,
      },
      {
        name: "Nama Karyawan",
        selector: (row) => row.namaKaryawan || "-",
        cellExport: (row) => row.namaKaryawan || "-",
        sortable: true,
      },
      {
        name: "Hari",
        selector: (row) => row.hari || "-",
        cellExport: (row) => row.hari || "-",
        sortable: true,
      },
      {
        name: "Tanggal",
        selector: (row) => formatTimestamp(row.tglMsk) || "-",
        cellExport: (row) => formatTimestamp(row.tglMsk) || "-",
        sortable: true,
      },
      {
        name: "Project",
        selector: (row) =>
          row.projectId && row.projectId.projectId
            ? row.projectId.projectId
            : "-",
        cellExport: (row) =>
          row.projectId && row.projectId.projectId
            ? row.projectId.projectId
            : "-",
        sortable: true,
      },
      {
        name: "Jam Masuk",
        selector: (row) => row.jamMasuk || "-",
        cellExport: (row) => row.jamMasuk || "-",
        sortable: true,
      },
      {
        name: "Jam Pulang",
        selector: (row) => row.jamKeluar || "-",
        cellExport: (row) => row.jamKeluar || "-",
        sortable: true,
      },
      {
        name: "Total Jam Kerja",
        selector: (row) => row.totalJamKerja || "-",
        cellExport: (row) => row.totalJamKerja || "-",
        sortable: true,
      },
      {
        name: "Overtime",
        selector: (row) => row.overtime || "-",
        cellExport: (row) => row.overtime || "-",
        sortable: true,
      },
      {
        name: "Catatan",
        selector: (row) => row.note || "-",
        cellExport: (row) => row.note || "-",
        sortable: true,
      },
    ];

    dataTable = {
      columns,
      data: apiData,
    };
  } else {
    api = "http://localhost:8081/api/rekap/get-rekap-timesheet";
    console.log("INI DEFAULT DATA DIRI");
    columns = [
      {
        name: "NIK",
        selector: (row) => row.nik || "-",
        cellExport: (row) => row.nik || "-",
        sortable: true,
      },
      {
        name: "Nama Karyawan",
        selector: (row) => row.namaKaryawan || "-",
        cellExport: (row) => row.namaKaryawan || "-",
        sortable: true,
      },
      {
        name: "Hari",
        selector: (row) => row.hari || "-",
        cellExport: (row) => row.hari || "-",
        sortable: true,
      },
      {
        name: "Tanggal",
        selector: (row) => formatTimestamp(row.tglMsk) || "-",
        cellExport: (row) => formatTimestamp(row.tglMsk) || "-",
        sortable: true,
      },
      {
        name: "Project",
        selector: (row) =>
          row.projectId && row.projectId.projectId
            ? row.projectId.projectId
            : "-",
        cellExport: (row) =>
          row.projectId && row.projectId.projectId
            ? row.projectId.projectId
            : "-",
        sortable: true,
      },
      {
        name: "Jam Masuk",
        selector: (row) => row.jamMasuk || "-",
        cellExport: (row) => row.jamMasuk || "-",
        sortable: true,
      },
      {
        name: "Jam Pulang",
        selector: (row) => row.jamKeluar || "-",
        cellExport: (row) => row.jamKeluar || "-",
        sortable: true,
      },
      {
        name: "Total Jam Kerja",
        selector: (row) => row.totalJamKerja || "-",
        cellExport: (row) => row.totalJamKerja || "-",
        sortable: true,
      },
      {
        name: "Overtime",
        selector: (row) => row.overtime || "-",
        cellExport: (row) => row.overtime || "-",
        sortable: true,
      },
      {
        name: "Catatan",
        selector: (row) => row.note || "-",
        cellExport: (row) => row.note || "-",
        sortable: true,
      },
    ];

    dataTable = {
      columns,
      data: apiData,
    };
  }

  return (
    <div className="content__container">
      <Navbar navbarText="Detail Data / Timesheet" />
      <div className="input__container">
        <Dropdown onSelect={handleDropdownChange}>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            {informationText || dropdownItems}
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
  );
};

export default DetaildataTimesheet;
