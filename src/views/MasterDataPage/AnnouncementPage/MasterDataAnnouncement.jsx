/* eslint-disable no-unused-vars */
import "./announcement.css";
import Navbar from "../../../components/Content/Navbar/Navbar";
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useNavigate } from "react-router-dom/dist";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// SweetAlert
import Swal from "sweetalert2";

const MasterDataAnnouncement = () => {
  const navigate = useNavigate();
  const [isToken, setIstoken] = useState("");
  const [apiData, setApiData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/master-data/announcement-view",
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
        if (data.status === "Success") {
          setApiData(data.data);
          console.log(data);
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

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title || "-",
      cellExport: (row) => row.title || "-",
      sortable: true,
    },
    {
      name: "Header",
      selector: (row) => row.header || "-",
      cellExport: (row) => row.header || "-",
      sortable: true,
    },
    {
      name: "Body",
      selector: (row) => row.note || "-",
      cellExport: (row) => row.note,
      sortable: true,
    },
    {
      name: "Footer",
      selector: (row) => row.footer || "-",
      cellExport: (row) => row.footer,
      sortable: true,
    },
    {
      name: "Action",
      sortable: false,
      cellExport: (row) => row.action || "-",
      cell: (d) => (
        <>
          <i
            key={`edit-${d.id}`}
            onClick={() => handleClick(d.id)}
            style={{ cursor: "pointer" }}
            className="first fas fa-pen"
          ></i>
          <i
            key={`delete-${d.id}`}
            onClick={() => handleDelete(d.id)}
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
    const selectedAnnouncement = apiData.find((ann) => ann.id === id);
    console.log(`Edit button clicked for ID: ${id}`);
    navigate(`/master-data/announcement-edit/${id}`, {
      state: { selectedAnnouncement },
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
            `http://localhost:8081/api/master-data/announcement-form/delete/${id}`,
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
              text: "Your file has been deleted.",
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
      <Navbar navbarText="Master Data / Announcement" />
      <Link to="/master-data/announcement-form/add" className="add__button">
        Tambah
      </Link>
      <div className="table__container">
        <DataTableExtensions {...dataTable} print={true} export={true}>
          <DataTable
            columns={columns}
            data={apiData}
            noHeader
            defaultSortField="Title"
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
export default MasterDataAnnouncement;
