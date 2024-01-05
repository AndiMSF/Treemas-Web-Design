/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import "./libur.css"
import Navbar from "../../../components/Content/Navbar/Navbar"
import DataTable from "react-data-table-component"
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useNavigate } from "react-router-dom/dist";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
// SweetAlert
import Swal from 'sweetalert2'

const MasterDataLibur = () => {
    const navigate = useNavigate();
    const [isToken, setIstoken] = useState('');
    const [apiData, setApiData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://treemas-api-405402.et.r.appspot.com/api/master-data/libur-view', {
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
          name: "Tanggal",
          selector: (row) => row.tglLibur || '-',
          cellExport: (row) => row.title || '-',
          sortable: true
        },
        {
          name: "Keterangan",
          selector: (row) => row.keterangan || '-',
          cellExport: (row) => row.title || '-',
          sortable: true
        },    
        {
          name: "Action",
          cellExport: (row) => row.title || '-',
          sortable: false,
          cell: (d) => (
            <>
              <i
                key={`edit-${d.liburId}`}
                onClick={() => handleClick(d.liburId)}
                style={{cursor: 'pointer' }}
                className="first fas fa-pen"
              ></i>
              <i
                key={`delete-${d.liburId}`}
                onClick={() => handleDelete(d.liburId)}
                style={{cursor: 'pointer' }}
                className="fas fa-trash-alt"
              ></i>
            </>
          )
        }
      ];
    
      const dataTable = {
        columns,
        data: apiData
      };
    
    
      const handleClick = (id) => {
        const selectedLibur = apiData.find((libur) => libur.liburId === id);
        console.log(`Edit button clicked for ID: ${id}`);
        navigate(`/master-data/libur-edit/${id}`, {state: {selectedLibur}});
      };
    
      const handleDelete = (id) => {
          console.log(`Delete button clicked for ID: ${id}`);
          // Tambahkan logika penghapusan data di sini, atau panggil API delete jika diperlukan
          Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
          }).then(async (result) => {
            if (result.isConfirmed) {
              // Jika yes akan
              const token = localStorage.getItem("authToken");
          if (!token) {
            console.error('Token is not available');
            return;
          }
    
          try {
            const response = await fetch(`https://treemas-api-405402.et.r.appspot.com/api/master-data/libur-form/delete/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
            });
    
            const data = await response.json();
            if (response.ok) {
              // Berhasil dihapus
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });

              setApiData((prevData) => prevData.filter(item => item.liburId !== id));
            } else {
              // Gagal dihapus
              Swal.fire({
                title: "Error!",
                text: data.message, // Tampilkan pesan error dari server
                icon: "error"
              });
            }
          } catch (error) {
            // Error selama proses penghapusan
            console.error('Error deleting data:', error);
            Swal.fire({
              title: "Error!",
              text: "An error occurred while deleting the data.",
              icon: "error"
            });
          }
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
  };

    return (
        <div className="content__container">
            <Navbar navbarText="Master Data / Libur" />
            <Link to="/master-data/libur-form/add" text="Tambah" className="add__button">Tambah</Link>
            <div className="table__container">
                <DataTableExtensions {...dataTable}>
                <DataTable
                columns={columns}
                data={apiData}
                noHeader
                defaultSortField="tglLibur"
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

export default MasterDataLibur