import "./usermember.css"
import Navbar from "../../../components/Content/Navbar/Navbar"
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import DropdownMenu from "../../../components/Elements/DropdownMenu/DropdownMenu"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom/dist";
import { Dropdown } from "react-bootstrap";

const ManagementUserMember = () => {
  const navigate = useNavigate();
  const [isToken, setIstoken] = useState('')
  const [apiData, setApiData] = useState([]);
  const [dropdownData, setDropdownData] = useState([])
  const [error, setError] = useState(null);
  const [dropdownItems, setDropdownItems] = useState("Pilih User");
  const [isAll, setIsAll] = useState(false)
  const [isSingleClick, setIsSingleClick] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://treemas-api-405402.et.r.appspot.com/api/management/user-member-view', {
        method: 'GET', // Sesuaikan metode sesuai kebutuhan (GET, POST, dll.)
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Sertakan token di sini
        },
      });
      // Tambahkan penanganan kesalahan di sini
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
        const data = await response.json();
        console.log("Users Data : "+data);
        if (data.status === 'Success') {
          setApiData(data.data);
        } else {
          setError('Failed to fetch data');
        }
      } catch (error) {
        if (error.message.includes('HTTP error!')) {
          const statusCode = parseInt(error.message.split(' ').pop());
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
      console.log('Token: ' + token);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://treemas-api-405402.et.r.appspot.com/api/management/user-member-view/dropdown', {
        method: 'GET', // Sesuaikan metode sesuai kebutuhan (GET, POST, dll.)
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Sertakan token di sini
        },
      });
      // Tambahkan penanganan kesalahan di sini
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
        const data = await response.json();
        if (data.status === 'Success') {
          setDropdownData(data.data);
          console.log("Dropdown Data "+JSON.stringify(dropdownData, null, 2));
        } else {
          setError('Failed to fetch data');
        }
      } catch (error) {
        if (error.message.includes('HTTP error!')) {
          const statusCode = parseInt(error.message.split(' ').pop());
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
      console.log('Token: ' + token);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleDropdownSelect = (selectedItem) => {
    setDropdownItems(selectedItem);
  };

  const handleAll = () => {
    setIsAll(!isAll)
    console.log("Kepencet");
  }

  const handleSingleClick = () => {
    setIsSingleClick(!isSingleClick)
  }

    
      const columns = [
        {
            name: <i onClick={handleAll} style={{fontSize: '1.6em', cursor: 'pointer'}} className={isAll ? "fa fa-toggle-off" : "fa fa-toggle-on"}></i>,
            sortable: false,
            cell: (d) => (
              <>
                <i
                  key={`edit-${d.title}`}
                  onClick={handleSingleClick}
                  className={isAll  ? "fa fa-toggle-off" : "fa fa-toggle-on"}
                  style={{fontSize: '1.5em', cursor: 'pointer'}}
                ></i>                
              </>
            )
        },
        {
          name: "NIK",
          selector: (row) => row.userId,
          sortable: true
        },
        {
            name: "Nama Karyawan",
            selector: (row) => row.fullName,
            sortable: true
          },
    ];
          
      const dataTable = {
        columns,
        data: apiData
      };
    
      return (
        <div className="content__container">
          <Navbar navbarText="Management / User Member" />
          <div className="input__container">
            <div className="left__container__input">
              <Dropdown onSelect={handleDropdownSelect}>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {dropdownItems}
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

}
export default ManagementUserMember