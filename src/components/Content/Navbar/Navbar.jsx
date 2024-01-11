/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import "./navbar.css";
import Profile from "../../../images/m header.png";
import Search from "../../Elements/Search/Search";
import { Dropdown } from "react-bootstrap";
import DropdownProfile from "../../Elements/DropdownProfile/DropdownProfile";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  // const [openProfile, setOpenProfile] = useState(false)
  const navigate = useNavigate();
  const [isToken, setIstoken] = useState("");
  const [apiData, setApiData] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fotoProfile, setFotoProfile] = useState("");
  const nik = localStorage.getItem("nik");
  const userName = localStorage.getItem("userName");
  const karyawanImg = localStorage.getItem("karyawanImg");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/api/master-data/karyawan-view/${nik}`,
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
          setProfileData(data.data.karyawan);
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
  }, [navigate, nik]);

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
          // Simpan nama pengguna di localStorage
          localStorage.setItem("userName", data.data.nama);
        } else {
          setError("Failed to fetch data");
        }
      } catch (error) {
        setError(`Error fetching data: ${error.message}`);
      } finally {
        setIsLoading(false);
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
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/dashboard/navbar",
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
          let base64ImageData = "";
          if (data.data != null) {
            base64ImageData =
              "data:image/jpeg;base64," + data.data ||
              "data:image/png;base64," + data.data;
          } else {
            console.log(
              "imageData tidak ada atau tidak memiliki properti 'base64'"
            );
          }
          // Simpan nama pengguna di localStorage
          setFotoProfile(data.data);
          localStorage.setItem("karyawanImg", base64ImageData);
        } else {
          setError("Failed to fetch data");
        }
      } catch (error) {
        console.log(error);
        setError(`Error fetching data: ${error.message}`);
      } finally {
        setIsLoading(false);
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
  }, [navigate]);

  const handleProfileClick = () => {
    const profileNik = profileData;
    console.log("profile Data = " + JSON.stringify(profileNik, null, 2));
    console.log("NAVBAR NIK" + nik);
    navigate(`/users/profile`, { state: { profileNik } });
    // Navigasi ke halaman profile
  };

  return (
    <div className="navbar__container">
      <div className="left__container__navbar">
        <h1>{props.navbarText}</h1>
      </div>

      <div className="right__container__navbar">
        <div className="vertikal__line"></div>
        <p>{userName}</p>

        <Dropdown>
          <Dropdown.Toggle id="profile__dropdown">
            <div className="profile-container">
              <img className="profile" src={karyawanImg} alt="" />
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ backgroundColor: "black" }}>
            <Dropdown.Item
              id="dropdown__item__navbar"
              onClick={handleProfileClick}
            >
              Profile
            </Dropdown.Item>
            <Dropdown.Item id="dropdown__item__navbar" href="#/action-2">
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {/* {                
                openProfile && (
                    <DropdownProfile />
                )
            } */}
      </div>
    </div>
  );
};

export default Navbar;
