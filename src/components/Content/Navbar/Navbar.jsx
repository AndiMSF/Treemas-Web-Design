/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import "./navbar.css"
import Profile from "../../../images/m header.png"
import Search from "../../Elements/Search/Search"
import { Dropdown } from "react-bootstrap"
import DropdownProfile from "../../Elements/DropdownProfile/DropdownProfile"
import { useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom";

const Navbar = (props) => {
    // const [openProfile, setOpenProfile] = useState(false)
    const navigate = useNavigate();
    const [isToken, setIstoken] = useState('');
    const [apiData, setApiData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://treemas-api-405402.et.r.appspot.com/api/dashboard/data-kehadiran', {
            method: 'GET', // Sesuaikan metode sesuai kebutuhan (GET, POST, dll.)
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // Sertakan token di sini
            },
          });
            const data = await response.json();
            if (data.status === 'Success') {
              setApiData(data.data);
              // Simpan nama pengguna di localStorage
              localStorage.setItem('userName', data.data.nama);
            } else {
              setError('Failed to fetch data');
            }
          } catch (error) {
            setError(`Error fetching data: ${error.message}`);
          } finally {
            setIsLoading(false);
          }
        };
        
          const token = localStorage.getItem("authToken")
          if (token) {
            setIstoken(token)
            fetchData();
            console.log('login sukses');
          }else{
            navigate("/login");
          }
        }, [navigate])

        useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://treemas-api-405402.et.r.appspot.com/api/dashboard/navbar', {
            method: 'GET', // Sesuaikan metode sesuai kebutuhan (GET, POST, dll.)
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // Sertakan token di sini
            },
          });
            const data = await response.json();
            if (data.status === 'Success') {
              setApiData(data.data);
              // Simpan nama pengguna di localStorage
              localStorage.setItem('karyawanImg', data.data.nama);
            } else {
              setError('Failed to fetch data');
            }
          } catch (error) {
            setError(`Error fetching data: ${error.message}`);
          } finally {
            setIsLoading(false);
          }
        };
        
          const token = localStorage.getItem("authToken")
          if (token) {
            setIstoken(token)
            fetchData();
            console.log('login sukses');
          }else{
            navigate("/login");
          }
        }, [navigate])

        const userName = localStorage.getItem('userName');
        const karyawanImg = localStorage.getItem('karyawanImg');

    return <div className="navbar__container">
        <div className="left__container__navbar">
            <h1>{props.navbarText}</h1>
        </div>

        <div className="right__container__navbar">
            <div className="vertikal__line"></div>
            <p>{userName}</p>
            
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <img className="profile" src={karyawanImg} alt=""/>                
                </Dropdown.Toggle>

                <Dropdown.Menu style={{backgroundColor: "black"}}>
                    <Dropdown.Item id="dropdown__item__navbar" href="/users/profile">Profile</Dropdown.Item>
                    <Dropdown.Item id="dropdown__item__navbar" href="#/action-2">Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {/* {
                
                openProfile && (
                    <DropdownProfile />
                )
            } */}
            
        </div>
    </div>
}

export default Navbar
