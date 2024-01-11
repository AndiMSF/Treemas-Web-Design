/* eslint-disable no-unused-vars */
import "./reimburse.css";
import Navbar from "../../../components/Content/Navbar/Navbar";
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useNavigate } from "react-router-dom/dist";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ParameterReimburse = () => {
  const navigate = useNavigate();
  const [isToken, setIstoken] = useState("");
  const [apiData, setApiData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/parameter/reimburse-view",
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
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const columns = [
    {
      name: "ID",
      selector: (row) => row.reimburseId || "-",
      cellExport: (row) => row.title || "-",
      sortable: true,
    },
    {
      name: "Nama",
      selector: (row) => row.nama || "-",
      cellExport: (row) => row.title || "-",
      sortable: true,
    },
    {
      name: "Nominal",
      selector: (row) => "Rp. " + row.nominal || "-",
      cellExport: (row) => row.title || "-",
      sortable: true,
    },
    {
      name: "Note",
      selector: (row) => row.note || "-",
      cellExport: (row) => row.title || "-",
      sortable: true,
    },
    {
      name: "Action",
      cellExport: (row) => row.title || "-",
      sortable: false,
      cell: (d) => (
        <>
          <i
            key={`edit-${d.reimburseId}`}
            onClick={() => handleClick(d.reimburseId)}
            style={{ cursor: "pointer" }}
            className="first fas fa-pen"
          ></i>
          <i
            key={`delete-${d.reimburseId}`}
            onClick={() => handleDelete(d.reimburseId)}
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
    const selectedReimburse = apiData.find(
      (reimburse) => reimburse.reimburseId === id
    );
    console.log(`Edit button clicked for ID: ${id}`);
    navigate(`/parameter/reimburse-form/edit/${id}`, {
      state: { selectedReimburse },
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
            `http://localhost:8081/parameter/reimburse-form/edit/${id}`,
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
            setApiData((prevData) => prevData.filter((item) => item.id !== id));
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
      <Navbar navbarText="Parameter / Reimburse" />
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
  );
};

export default ParameterReimburse;
