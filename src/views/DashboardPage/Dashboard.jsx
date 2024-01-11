/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import "./dashboard.css";
import Navbar from "../../components/Content/Navbar/Navbar.jsx";
import Information from "../../components/Content/Information/Information";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const Dashboard = () => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const infoTopFields = [
    "NIK",
    "Nama Karyawan",
    "Masuk",
    "Terlambat",
    "Absen",
    "Cuti",
    "Sakit",
  ];

  const date = new Date();
  let currentDay = String(date.getDate()).padStart(2, "0");
  let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
  let currentYear = date.getFullYear();
  let getDay = weekday[date.getDay()];
  // we will display the date as DD-MM-YYYY
  let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
  const navigate = useNavigate();
  const [isToken, setIstoken] = useState("");
  const [apiData, setApiData] = useState([]);
  const [apiDataMemberHari, setApiDataMemberHari] = useState([]);
  const [apiDataMemberTahun, setApiDataMemberTahun] = useState([]);
  const [error, setError] = useState(null);

  // Diri Sendiri Tahunan
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/dashboard/data-kehadiran",
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
        console.log("ERROR " + error);
        setError(`Error fetching data: ${error}`);
      }
    };

    const token = localStorage.getItem("authToken");
    if (token) {
      setIstoken(token);
      fetchData();
      console.log("login sukses");
    } else {
      navigate("/login");
    }
  }, [navigate, isToken]);

  // Member Harian
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/dashboard/data-kehadiran-member-hari",
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
          setApiDataMemberHari(data.data);
          console.log(data);
        } else {
          setError("Failed to fetch data");
        }
      } catch (error) {
        console.log("ERROR " + error);
        setError(`Error fetching data: ${error}`);
      }
    };

    const token = localStorage.getItem("authToken");
    if (token) {
      setIstoken(token);
      fetchData();
      console.log("login sukses");
    } else {
      navigate("/login");
    }
  }, [navigate, isToken]);

  // Member Tahun
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/dashboard/data-kehadiran-member",
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
          setApiDataMemberTahun(data.data);
          console.log(data);
        } else {
          setError("Failed to fetch data");
        }
      } catch (error) {
        console.log("ERROR " + error);
        setError(`Error fetching data: ${error}`);
      }
    };

    const token = localStorage.getItem("authToken");
    if (token) {
      setIstoken(token);
      fetchData();
      console.log("login sukses");
    } else {
      navigate("/login");
    }
  }, [navigate, isToken]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const data = [
    {
      name: "Masuk",
      uv: apiData.totalMasuk,
    },
    {
      name: "Terlambat",
      uv: apiData.totalTelatMasuk,
    },
    {
      name: "Absen",
      uv: apiData.totalTidakMasuk,
    },
    {
      name: "Cuti",
      uv: apiData.totalCuti,
    },
    {
      name: "Sakit",
      uv: apiData.totalSakit,
    },
  ];

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
      ${x + width / 2}, ${y}
      C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
      y + height
    } ${x + width}, ${y + height}
      Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  // Data Member Tahunan

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
      name: "Masuk",
      selector: (row) => row.totalMasuk || "-",
      cellExport: (row) => row.totalMasuk || "-",
      sortable: true,
    },
    {
      name: "Terlambat",
      selector: (row) => row.totalTelatMasuk || "-",
      cellExport: (row) => row.totalTelatMasuk || "-",
      sortable: true,
    },
    {
      name: "Tidak Masuk",
      selector: (row) => row.totalTidakMasuk || "-",
      cellExport: (row) => row.totalTidakMasuk || "-",
      sortable: true,
    },
    {
      name: "Cuti",
      selector: (row) => row.totalCuti || "-",
      cellExport: (row) => row.totalCuti || "-",
      sortable: true,
    },
    {
      name: "Sakit",
      selector: (row) => row.totalSakit || "-",
      cellExport: (row) => row.totalSakit || "-",
      sortable: true,
    },
    {
      name: "Pulang Cepat",
      selector: (row) => row.pulangCepat || "-",
      cellExport: (row) => row.pulangCepat || "-",
      sortable: true,
    },
  ];

  const dataTable = {
    columns,
    data: apiDataMemberTahun,
  };

  return (
    <div className="content__container">
      <Navbar navbarText="Overview" />

      <div className="grafik__data__kehadiran">
        {/* yg atas */}
        <h1>Grafik Data Kehadiran / Tahun / {currentYear}</h1>
        <div className="keterangan">
          <div className="box">
            <h1>Masuk</h1>
            <h2>{apiData.totalMasuk}</h2>
          </div>
          <div className="box">
            <h1>Terlambat</h1>
            <h2>{apiData.totalTelatMasuk}</h2>
          </div>
          <div className="box">
            <h1>Tidak Masuk</h1>
            <h2>{apiData.totalTidakMasuk}</h2>
          </div>
          <div className="box">
            <h1>Cuti</h1>
            <h2>{apiData.totalCuti}</h2>
          </div>
          <div className="box">
            <h1>Sakit</h1>
            <h2>{apiData.totalSakit}</h2>
          </div>
        </div>
      </div>

      <div className="grafik__data__member">
        <div className="left__container__dashboard">
          <h1>Grafik Data Member / Hari</h1>
          <div className="hari">
            <h2>{getDay}</h2>
            <div className="right">
              <div>
                <h2>{currentDate}</h2>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Bar
                dataKey="uv"
                fill="#8884d8"
                shape={<TriangleBar />}
                label={{ position: "top" }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div className="vertikal_line"></div>
        </div>

        <div className="right__container__dashboard">
          <div className="box1">
            <h1>Masuk</h1>
            <h2>{apiDataMemberHari.totalMasuk}</h2>
          </div>
          <div className="horizontal_line"></div>
          <div className="box1">
            <h1>Terlambat</h1>
            <h2>{apiDataMemberHari.totalTelatMasuk}</h2>
          </div>
          <div className="horizontal_line"></div>
          <div className="box1">
            <h1>Tidak Masuk</h1>
            <h2>{apiDataMemberHari.totalTidakMasuk}</h2>
          </div>
          <div className="horizontal_line"></div>
          <div className="box1">
            <h1>Cuti</h1>
            <h2>{apiDataMemberHari.totalCuti}</h2>
          </div>
          <div className="horizontal_line"></div>
          <div className="box1">
            <h1>Sakit</h1>
            <h2>{apiDataMemberHari.totalSakit}</h2>
          </div>
        </div>
      </div>
      <div className="table__container">
        <div className="data__member">
          <h1>Data Member / {currentYear}</h1>
        </div>
        <DataTableExtensions {...dataTable}>
          <DataTable
            columns={columns}
            data={apiDataMemberTahun}
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

export default Dashboard;
