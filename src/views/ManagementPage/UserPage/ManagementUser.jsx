/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import "./user.css";
import Navbar from "../../../components/Content/Navbar/Navbar";
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useNavigate } from "react-router-dom/dist";
import { useEffect, useState } from "react";
// SweetAlert
import Swal from "sweetalert2";

const ManagementUser = () => {
  const navigate = useNavigate();
  const [isToken, setIstoken] = useState("");
  const [apiData, setApiData] = useState([]);
  const [error, setError] = useState(null);

  const formatTimestamp = (timestamp) => {
    //Format Tanggal
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Perlu ditambah 1 karena indeks bulan dimulai dari 0
    const year = date.getFullYear();
    // Format Jam
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/management/user-view",
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
  }, [navigate, apiData.isLocked]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const columns = [
    {
      name: "ID Pengguna",
      selector: (row) => row.userId || "-",
      cellExport: (row) => row.title || "-",
      sortable: true,
    },
    {
      name: "Nama Karyawan",
      selector: (row) => row.fullName || "-",
      cellExport: (row) => row.title || "-",
      sortable: true,
    },
    {
      name: "Terakhir Login",
      selector: (row) => row.lastLogin || "-",
      cellExport: (row) => row.title || "-",
      sortable: true,
      cell: (row) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {formatTimestamp(row.lastLogin) || "-"}
        </div>
      ),
    },
    {
      name: "Login",
      sortable: false,
      cell: (d) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {d.isLogin === "0" || d.isLogin === null ? (
            <i
              key={`logged-in-${d.isLogin}`}
              className="fa-solid fa-circle-xmark"
              style={{
                color: "#ff0000",
                fontSize: "1.5em",
                textAlign: "center",
              }}
            ></i>
          ) : (
            <i
              key={`logged-in-${d.isLogin}`}
              className="fa-solid fa-circle-check"
              style={{
                color: "#00a92b",
                fontSize: "1.5em",
                textAlign: "center",
              }}
            ></i>
          )}
        </div>
      ),
    },
    {
      name: "Terkunci",
      sortable: false,
      cell: (d) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {d.isLocked === "0" || d.isLocked === null ? (
            <i
              key={`unlock-${d.isLocked}`}
              className="fa fa-unlock-alt"
              style={{
                color: "#00a92b",
                fontSize: "1.5em",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => handleClick(d.userId, "Lock")}
            ></i>
          ) : (
            <i
              key={`lock-${d.isLocked}`}
              className="fa fa-lock"
              style={{
                color: "#ff0000",
                fontSize: "1.5em",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => handleClick(d.userId, "Unlock")}
            ></i>
          )}
        </div>
      ),
    },
  ];

  const dataTable = {
    columns,
    data: apiData,
  };

  const handleClick = (userId, message) => {
    console.log(`Edit button clicked for nik: ${userId}`);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: message,
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
            `http://localhost:8081/api/management/unlock-account/${userId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = await response.json();
          if (response.ok) {
            // Fetch updated data after successful API call
            const updatedDataResponse = await fetch(
              "http://localhost:8081/api/management/user-view",
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            const updatedData = await updatedDataResponse.json();
            // Update state with the new data
            setApiData(updatedData.data);
            Swal.fire({
              title: "Success!",
              text: data.message,
              icon: "success",
            });
          } else {
            // Gagal dihapus
            Swal.fire({
              title: "Error!",
              text: data.message, // Tampilkan pesan error dari server
              icon: "error",
            });
          }
        } catch (error) {
          // Tangani kesalahan jaringan atau kesalahan server
          // Jika tidak berhasil, tampilkan pesan error
          console.error("Failed to fetch data:", error);

          if (error.response) {
            // The request was made and the server responded with a status code
            console.error(
              "Server responded with non-2xx status:",
              error.response.data
            );
            Swal.fire({
              title: "Error!",
              text: error.response.data.message, // Display the backend error message
              icon: "error",
            });
          } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received:", error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error during request setup:", error.message);
          }
        }
      }
    });
  };

  return (
    <div className="content__container">
      <Navbar navbarText="Management / Data User Access" />
      <div className="table__container">
        <DataTableExtensions {...dataTable}>
          <DataTable
            columns={columns}
            data={apiData}
            noHeader
            defaultSortField="userId"
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

export default ManagementUser;
