/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import "./absen.css";
import Information from "../../../components/Content/Information/Information";
import BoxInput from "../../../components/Elements/BoxInput/BoxInput";
import Navbar from "../../../components/Content/Navbar/Navbar";
import Button from "../../../components/Elements/Buttons/Button";
import DropdownMenu from "../../../components/Elements/DropdownMenu/DropdownMenu";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useNavigate } from "react-router-dom/dist";
import { Dropdown } from "react-bootstrap";

const DetaildataAbsen = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Pilih Status");
  const [jam, setJam] = useState("Pilih Total Jam");
  const [isToken, setIstoken] = useState("");
  const [apiData, setApiData] = useState([]);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [dropdownTitle, setDropdownTitle] = useState("Pilih Jabatan");
  const [jabatan, setJabatan] = useState("");
  const [dropdownDataJabatan, setDropdownDataJabatan] = useState([]);
  const handleDropdownSelect = (selectedJabatan) => {
    const selectedItem = dropdownDataJabatan.find(
      (jabatan) => jabatan.namaJabatan === selectedJabatan
    );

    setDropdownTitle(selectedJabatan);
    setJabatan(selectedItem.jabatanId);
    console.log(selectedItem);
    filterData(status, jam, selectedItem.jabatanId);
  };

  const handleStatus = (selectedItem) => {
    setStatus(selectedItem);
    filterData(selectedItem, jam, selectedItem.jabatanId);
  };

  const handleJam = (selectedItem) => {
    setJam(selectedItem);
    filterData(status, selectedItem, selectedItem.jabatanId);
  };

  const filterData = (status, jam) => {
    const filtered = apiData.filter((item) => {
      console.log("ini item " + JSON.stringify(item, null, 2));
      return (
        // Filter berdasarkan kondisi status
        (status === "Pilih Status" ||
          (status === "Cuti" && item.isCuti === "1") ||
          (status === "Other" && item.isOther === "1") ||
          (status === "Sakit" && item.isSakit === "1") ||
          (status === "WFH" && item.isWfh === "1")) &&
        // Filter berdasarkan kondisi jam
        (jam === "Pilih Total Jam" ||
          (jam === "Lembur" && item.isLembur === "1") ||
          (jam === "Tidak Lembur" &&
            (item.isLembur === null || item.isLembur === "0"))) &&
        // Tambahkan kondisi lain jika diperlukan
        // Filter berdasarkan kondisi jabatanId
        (dropdownTitle === "Pilih Jabatan" ||
          (item.role && jabatan === item.role.jabatanId))
      );
    });

    setFilteredData(filtered);
  };

  // Absen Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/detail-data/absen-view",
          {
            method: "GET", // Sesuaikan metode sesuai kebutuhan (GET, POST, dll.)
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Sertakan token di sini
            },
          }
        );
        // Tambahkan penanganan kesalahan di sini
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        if (data.status === "Success") {
          setApiData(data.data);
          setFilteredData(data.data);
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
  }, [navigate]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Jabatan
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/master-data/jabatan-view",
          {
            method: "GET", // Sesuaikan metode sesuai kebutuhan (GET, POST, dll.)
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Sertakan token di sini
            },
          }
        );
        const data = await response.json();
        if (data.status === "Success") {
          setDropdownDataJabatan(data.data);
          console.log(data);
          // Filter data immediately after fetching jabatan data
        } else {
          setError("Failed to fetch data");
        }
      } catch (error) {
        setError(`Error fetching data: ${error.message}`);
      }
    };

    const token = localStorage.getItem("authToken");
    if (token) {
      setIstoken(token);
      fetchData(); // Panggil fungsi fetchData setelah mendapatkan token

      // request ke server setiap 5detik untuk memperbarui data secara otomatis tapi bisa memperlambat server?
      //   const intervalId = setInterval(fetchData, 5000); // Polling setiap 5 detik (5000 milidetik)

      //   // Bersihkan interval saat komponen di-unmount
      //   return () => {
      //     clearInterval(intervalId);
      //   };
    } else {
      navigate("/login");
    }
  }, [navigate]);

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
      name: "Project",
      selector: (row) => row.projectId?.namaProject || "-",
      cellExport: (row) => row.title || "-",
      sortable: true,
    },
    {
      name: "Lokasi Masuk",
      selector: (row) => row.lokasiMasuk || "-",
      cellExport: (row) => row.title || "-",
      sortable: true,
    },
    {
      name: "Jam Masuk",
      selector: (row) => row.jamMasuk || "-",
      cellExport: (row) => row.title || "-",
      sortable: true,
    },
    {
      name: "Lokasi Pulang",
      selector: (row) => row.lokasiPulang || "-",
      cellExport: (row) => row.title || "-",
      sortable: true,
    },
    {
      name: "Jam Pulang",
      selector: (row) => row.jamPulang || "-",
      cellExport: (row) => row.title || "-",
      sortable: true,
    },
    {
      name: "Catatan Terlambat",
      selector: (row) => row.catatanTerlambat || "-",
      cellExport: (row) => row.title || "-",
      sortable: true,
    },
    {
      name: "Total Jam Kerja",
      selector: (row) => row.totalJamKerja || "-",
      cellExport: (row) => row.title || "-",
      sortable: true,
    },
  ];

  const dataTable = {
    columns,
    data: filteredData,
  };

  return (
    <div className="content__container">
      <Navbar navbarText="Detail Data / Absen" />
      <div className="input__container">
        <div className="left__container__input">
          <DropdownMenu
            onDropdownChange={handleStatus}
            items={["Cuti", "Other", "Sakit", "WFH"]}
            title={status}
          />
          <DropdownMenu
            onDropdownChange={handleJam}
            items={["Lembur", "Tidak Lembur"]}
            title={jam}
          />
          <Dropdown
            onSelect={handleDropdownSelect}
            className="user__access__dropdown"
            style={{ width: "100%" }}
          >
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {dropdownDataJabatan.namaJabatan || dropdownTitle}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {dropdownDataJabatan.map((item, index) => (
                <Dropdown.Item key={index} eventKey={item.namaJabatan}>
                  {item.namaJabatan}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="table__container">
        <DataTableExtensions {...dataTable}>
          <DataTable
            columns={columns}
            data={filteredData}
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

export default DetaildataAbsen;
