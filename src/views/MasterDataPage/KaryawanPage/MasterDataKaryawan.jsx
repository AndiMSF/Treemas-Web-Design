/* eslint-disable no-unused-vars */
import "./karyawan.css";
import Information from "../../../components/Content/Information/Information";
import Navbar from "../../../components/Content/Navbar/Navbar";
import BoxInput from "../../../components/Elements/BoxInput/BoxInput";
import Button from "../../../components/Elements/Buttons/Button";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useNavigate } from "react-router-dom/dist";
import { useEffect, useState } from "react";
// SweetAlert
import Swal from "sweetalert2";

const MasterDataKaryawan = () => {
  const navigate = useNavigate();
  const [isToken, setIstoken] = useState("");
  const [apiData, setApiData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/master-data/karyawan-view",
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
          setApiData(data.data);
          console.log(data);
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
      console.log("Token: " + token);
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
      selector: (row) => row.nik || "-",
      cellExport: (row) => row.nik || "-",
      sortable: true,
    },
    {
      name: "Nama Karyawan",
      selector: (row) => row.nama || "-",
      cellExport: (row) => row.nama || "-",
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email || "-",
      cellExport: (row) => row.email || "-",
      sortable: true,
    },
    {
      name: "No. Hp.",
      selector: (row) => row.noHp || "-",
      cellExport: (row) => row.noHp || "-",
      sortable: true,
    },
    {
      name: "No. Rekening",
      selector: (row) => row.noRek || "-",
      cellExport: (row) => row.noRek || "-",
      sortable: true,
    },
    {
      name: "Action",
      sortable: false,
      cellExport: (row) => row.action || "-",
      cell: (d) => (
        <>
          <i
            key={`edit-${d.nik}`}
            onClick={() => handleClick(d.nik)}
            style={{ cursor: "pointer" }}
            className="first fas fa-pen"
          ></i>
          <i
            key={`delete-${d.nik}`}
            onClick={() => handleDelete(d.nik)}
            style={{ cursor: "pointer" }}
            className="fas fa-trash-alt"
          ></i>
        </>
      ),
    },
  ];

  const dataTable = {
    columns,
    data: apiData,
  };

  const handleClick = (id) => {
    const selectedNik = apiData.find((nik) => nik.nik === id);
    console.log("selected Nik " + JSON.stringify(selectedNik, null, 2));
    console.log(`Edit button clicked for NIK: ${id}`);
    navigate(`/master-data/karyawan-form/edit/${id}`, {
      state: { selectedNik },
    });
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
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Jika yes akan
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("Token is not available");
          return;
        }

        try {
          const response = await fetch(
            `http://localhost:8081/api/master-data/karyawan-form/delete/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = await response.json();
          if (response.ok) {
            // Berhasil dihapus
            Swal.fire({
              title: "Deleted!",
              text: "Your Data has been deleted.",
              icon: "success",
            });
            // Perbarui state lokal setelah penghapusan
            setApiData((prevData) =>
              prevData.filter((item) => item.nik !== id)
            );
          } else {
            // Gagal dihapus
            Swal.fire({
              title: "Error!",
              text: data.message, // Tampilkan pesan error dari server
              icon: "error",
            });
          }
        } catch (error) {
          // Error selama proses penghapusan
          console.error("Error deleting data:", error);
          Swal.fire({
            title: "Error!",
            text: "An error occurred while deleting the data.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="content__container">
      <Navbar navbarText="Master Data / Karyawan" />
      <Link to="/master-data/karyawan-form/add" className="add__button">
        Tambah
      </Link>
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

export default MasterDataKaryawan;
