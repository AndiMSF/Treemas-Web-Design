/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import "./reimburse.css"
import Information from "../../../components/Content/Information/Information"
import BoxInput from "../../../components/Elements/BoxInput/BoxInput"
import Navbar from "../../../components/Content/Navbar/Navbar"
import Button from "../../../components/Elements/Buttons/Button"
import { useEffect, useState } from "react"
import DropdownMenu from "../../../components/Elements/DropdownMenu/DropdownMenu"
import { useNavigate } from "react-router-dom"
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component"
import SortIcon from "@material-ui/icons/ArrowDownward";

const DetaildataReimburse = () => {
    const dropdownItems = ["Data Diri", "Data Member"];
    const infoTopFields = ["NIK", "Nama Karyawan", "Hari", "Tanggal", "Project", "Jam Masuk", "Jam Pulang", "Uang Makan", "Transport"]
    const [ informationText, setInformationText] = useState("Data Diri");
    const [totalJamText, setTotalJamText] = useState("Pilih Total Jam")
    const navigate = useNavigate();
    const [apiData, setApiData] = useState([])
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://treemas-api-405402.et.r.appspot.com/api/rekap/get-rekap-reimburse', {
            method: 'GET', // Sesuaikan metode sesuai kebutuhan (GET, POST, dll.)
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // Sertakan token di sini
            },
          });
            const data = await response.json();
            if (data.status === 'Success') {
              setApiData(data.data);

            } else {
              setError('Failed to fetch data');
            }
          } catch (error) {
            setError(`Error fetching data: ${error.message}`);
          }
        };
    
        const token = localStorage.getItem("authToken");
        if (token) {
          fetchData(); // Panggil fungsi fetchData setelah mendapatkan token
        } else {
          navigate("/login");
        }
      }, [navigate]);

    const handleDropdownChange = (selectedItem) => {
        setInformationText(selectedItem);
    }

    const handleTotalJam = (selectedItem) => {
        setTotalJamText(selectedItem)
    }

    let boxInputComponent;

    if( informationText === "Data Diri") {
        boxInputComponent = (
        <div className="input__container">
        <div className="left__container__input">
            <BoxInput placeholder="Tanggal Reimburse"/>
            <Button text="Pencarian" className="search__button" />

        </div>
        <div className="right__container__input">
        <Button text="Unduh" className="add__button" />
        </div>
    </div>)
    } else if ( informationText === "Data Member") {
        boxInputComponent = (
            <div className="input__container">
                    <div className="left__container__input">
                        <BoxInput placeholder="Tanggal Reimburse"/>
                        <BoxInput placeholder="NIK"/>
                        <BoxInput placeholder="Nama Karyawan"/>
                        <DropdownMenu title={totalJamText} items={["Lembur", "Tidak Lembur"]} onDropdownChange={handleTotalJam}/>
                        <DropdownMenu title="Pilih Project" />
                        <Button text="Pencarian" className="search__button" />
                    </div>
                    <div className="right__container__input">
                    <Button text="Unduh" className="add__button" />
                    </div>
                </div>
        )
    }

    const columns = [
        {
            name: "ID",
            selector: (row) => row.projectId || '-',
            cellExport: (row) => row.title || '-',
            sortable: true
        },
        {
            name: "Nama Project",
            selector: (row) => row.namaProject || '-',
            cellExport: (row) => row.title || '-',
            sortable: true
        },
        {
            name: "Alamat",
            selector: (row) => row.lokasi || '-',
            cellExport: (row) => row.title || '-',
            sortable: true
        },  
        {
            name: "No.Telepon",
            selector: (row) => row.noTlpn || '-',
            cellExport: (row) => row.title || '-',
            sortable: true
        },  
        {
            name: "Reimburse",
            selector: (row) => 'Rp. ' + row.biayaReimburse || '-',
            cellExport: (row) => row.title || '-',
            sortable: true
        },  
        {
            name: "Jarak",
            selector: (row) => row.jrkMax + ' m' || '-',
            cellExport: (row) => row.title || '-',
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
        <div className="table__container">
            <DataTableExtensions {...dataTable}>
            <DataTable
            columns={columns}
            data={apiData}
            noHeader
            defaultSortField="id"
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
}

export default DetaildataReimburse