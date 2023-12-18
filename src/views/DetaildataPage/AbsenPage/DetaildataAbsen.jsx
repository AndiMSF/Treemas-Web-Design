/* eslint-disable no-unused-vars */
import "./absen.css"
import Information from "../../../components/Content/Information/Information"
import BoxInput from "../../../components/Elements/BoxInput/BoxInput"
import Navbar from "../../../components/Content/Navbar/Navbar"
import Button from "../../../components/Elements/Buttons/Button"
import DropdownMenu from "../../../components/Elements/DropdownMenu/DropdownMenu"
import { useState, useEffect } from "react"
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useNavigate } from "react-router-dom/dist";

const DetaildataAbsen = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState("Pilih Status")
    const [jam, setJam] = useState("Pilih Total Jam")
    const [isToken, setIstoken] = useState('')
    const [apiData, setApiData] = useState([]);
    const [error, setError] = useState(null);
    const [filteredData, setFilteredData] = useState([]);

    const handleStatus = (selectedItem) => {
        setStatus(selectedItem)
        filterData(selectedItem, jam);
    }

    const handleJam = (selectedItem) => {
        setJam(selectedItem)
        filterData(status, selectedItem);
    }

    const filterData = (status, jam) => {
      const filtered = apiData.filter(item => {
        return (
          // Filter berdasarkan kondisi status
          (status === "Pilih Status" || 
            (status === "Cuti" && item.isCuti === "1") ||
            (status === "Other" && item.isOther === "1") ||
            (status === "Sakit" && item.isSakit === "1") ||
            (status === "WFH" && item.isWfh === "1")
          ) &&
          // Filter berdasarkan kondisi jam
          (jam === "Pilih Total Jam" || (jam === "Lembur" && item.isLembur === "1") || (jam === "Tidak Lembur" && (item.isLembur === null || item.isLembur === "0")))
          // Tambahkan kondisi lain jika diperlukan
        );
      });
    
      setFilteredData(filtered);
    }


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://treemas-api-405402.et.r.appspot.com/api/detail-data/absen-view', {
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
            if (data.status === 'Success') {
              setApiData(data.data);
              setFilteredData(data.data);
            } else {
              setError('Failed to fetch data');
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
      }, [navigate]);

      if (error) {
        return <div>Error: {error}</div>;
      }
    
      const columns = [
        {
          name: "NIK",
          selector: (row) => row.nik  || '-',
          sortable: true
        },
        {
          name: "Nama Karyawan",
          selector: (row) => row.namaKaryawan  || '-',
          sortable: true
        },
        {
          name: "Project",
          selector: (row) => row.projectId?.namaProject   || '-',
          sortable: true
        },
        {
            name: "Lokasi Masuk",
            selector: (row) => row.lokasiMasuk  || '-',
            sortable: true
        },
        {
            name: "Jam Masuk",
            selector: (row) => row.jamMasuk  || '-',
            sortable: true
        },
        {
            name: "Lokasi Pulang",
            selector: (row) => row.lokasiPulang  || '-',
            sortable: true
        },
        {
            name: "Jam Pulang",
            selector: (row) => row.jamPulang  || '-',
            sortable: true
        },
        {
            name: "Catatan Terlambat",
            selector: (row) => row.catatanTerlambat  || '-',
            sortable: true
        },
        {
            name: "Total Jam Kerja",
            selector: (row) => row.totalJamKerja  || '-',
            sortable: true
        }
      ];
    
      const dataTable = {
        columns,
        data: filteredData
      };
    
    


    return (<div className="absen__container">
        <div className="content__container">
            <Navbar navbarText="Detail Data / Absen" />
                <div className="input__container">
                    <div className="left__container__input">
                        <DropdownMenu onDropdownChange={handleStatus} items={["Cuti", "Other", "Sakit", "WFH"]} title={status} />
                        <DropdownMenu onDropdownChange={handleJam} items={["Lembur", "Tidak Lembur"]} title={jam}/>
                        <DropdownMenu title="Pilih Project"/>
                        
                    </div>
                    
                   <div className="right__container__input">
                        <Button text="Tambah" className="add__button" />
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
    </div>
    )
}

export default DetaildataAbsen