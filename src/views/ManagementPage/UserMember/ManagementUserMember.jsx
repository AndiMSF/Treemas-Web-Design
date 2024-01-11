/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "./usermember.css";
import Navbar from "../../../components/Content/Navbar/Navbar";
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import DropdownMenu from "../../../components/Elements/DropdownMenu/DropdownMenu";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom/dist";
import { Dropdown } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
// Switch
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ManagementUserMember = () => {
  const navigate = useNavigate();
  const [isToken, setIstoken] = useState("");
  const [apiData, setApiData] = useState([]);
  const [dropdownData, setDropdownData] = useState([]);
  const [error, setError] = useState(null);
  const [dropdownItems, setDropdownItems] = useState("Pilih User");
  const [isAll, setIsAll] = useState(false);
  const [nikLeader, setNikLeader] = useState(null);
  const [checkedState, setCheckedState] = useState({});
  // Switch
  const [checked, setChecked] = useState(true);

  const handleAllChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleChange = async (event, userId) => {
    const isChecked = event.target.checked;

    setCheckedState((prevState) => ({
      ...prevState,
      [userId]: isChecked,
    }));

    console.log("CHECKED OR NO " + event.target.checked);
    const token = localStorage.getItem("authToken");

    console.log(`Edit button clicked for userId: ${userId}`);

    // Jika tidak checked
    if (!isChecked) {
      try {
        if (token) {
          console.log("ADA TOKEN " + token);
          const response = await axios.delete(
            `http://localhost:8081/api/management/user-member-view/delete?nikLeader=${nikLeader}&nikUser=${userId}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );

          console.log("SBLM MASUK IF " + JSON.stringify(response, null, 2));
          if (response.data.status === "Success") {
            // Tangani login yang berhasil, misalnya, simpan token otentikasi di localStorage
            console.log("Response : ", response);
            Swal.fire({
              title: "Success!",
              text: response.data.message + " For Nik " + userId,
              icon: "success",
            });
          } else {
            // Tangani kesalahan login di sini, mungkin menampilkan pesan kesalahan
            // Jika tidak berhasil, tampilkan pesan error

            Swal.fire({
              title: "Error!",
              text: response.data.message,
              icon: "error",
            });
            console.log(response);
          }
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error",
        });
      }
    } else {
      // jika checked

      const requestData = {
        nikLeader: nikLeader,
        nikUser: userId,
      };
      // Jika yes akan
      try {
        if (token) {
          console.log("ADA TOKEN ");
          const response = await axios.post(
            "http://localhost:8081/api/management/user-member-view/add",
            requestData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );

          console.log("SBLM MASUK IF " + JSON.stringify(response, null, 2));
          if (response.data.status === "Success") {
            // Tangani login yang berhasil, misalnya, simpan token otentikasi di localStorage
            console.log("Response : ", response);
            Swal.fire({
              title: "Success!",
              text: response.data.message + " For Nik " + userId,
              icon: "success",
            });
          } else {
            // Tangani kesalahan login di sini, mungkin menampilkan pesan kesalahan
            // Jika tidak berhasil, tampilkan pesan error
            Swal.fire({
              title: "Error!",
              text: response.data.message,
              icon: "error",
            });

            console.log(response.data.message);
          }
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error",
        });
      }
    }
  };
  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    "& .MuiSwitch-track": {
      borderRadius: 22 / 2,
      "&::before, &::after": {
        content: '""',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: 16,
        height: 16,
      },
      "&::before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      "&::after": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
      width: 16,
      height: 16,
      margin: 2,
    },
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/management/user-member-view",
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
        console.log("Users Data : " + JSON.stringify(data, null, 2));
        if (data.status === "Success") {
          setApiData(data.data);
          console.log(data.data);
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

    if (error) {
      return <div>Error: {error}</div>;
    }

    const token = localStorage.getItem("authToken");
    if (token) {
      setIstoken(token);
      fetchData(); // Panggil fungsi fetchData setelah mendapatkan token
      console.log("Token: " + token);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/management/user-member-view/dropdown",
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
          setDropdownData(data.data);
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

    if (error) {
      return <div>Error: {error}</div>;
    }

    const token = localStorage.getItem("authToken");
    if (token) {
      setIstoken(token);
      fetchData(); // Panggil fungsi fetchData setelah mendapatkan token
      console.log("Token: " + token);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleDropdownSelect = (selectedUser) => {
    const selectedItem = dropdownData.find(
      (user) => user.fullName === selectedUser
    );

    setDropdownItems(selectedUser);
    setNikLeader(selectedItem.userId);
    console.log(selectedItem.userId);
  };

  const handleAll = () => {
    setIsAll(!isAll);
    console.log("Kepencet");
  };

  const columns = [
    {
      name: (
        <FormControlLabel
          control={<Android12Switch />}
          onChange={handleAllChange}
          inputProps={{ "aria-label": "controlled" }}
          style={{ marginLeft: 0 }}
        />
      ),
      sortable: false,
      cell: (d) => (
        <>
          <FormControlLabel
            key={d.userId}
            control={<Android12Switch />}
            onChange={(event) => handleChange(event, d.userId)}
            checked={checkedState[d.userId]}
            inputProps={{ "aria-label": "controlled" }}
            style={{ marginLeft: 0 }}
          />
        </>
      ),
    },
    {
      name: "NIK",
      selector: (row) => row.userId,
      cellExport: (row) => row.title || "-",
      sortable: true,
    },
    {
      name: "Nama Karyawan",
      selector: (row) => row.fullName,
      cellExport: (row) => row.title || "-",
      sortable: true,
    },
  ];

  const dataTable = {
    columns,
    data: apiData,
  };

  return (
    <div className="content__container">
      <Navbar navbarText="Management / User Member" />
      <div className="input__container">
        <div className="left__container__input">
          <Dropdown onSelect={handleDropdownSelect}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {dropdownData.fullName || dropdownItems}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {dropdownData.map((item, index) => (
                <Dropdown.Item key={index} eventKey={item.fullName}>
                  {item.fullName} ({item.role.jabatanId})
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
export default ManagementUserMember;
