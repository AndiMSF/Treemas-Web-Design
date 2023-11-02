/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import "./dashboard.css"
import Navbar from "../../components/Content/Navbar/Navbar.jsx"
import Information from "../../components/Content/Information/Information"
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];


const Dashboard = () => {

    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const infoTopFields = ["NIK", "Nama Karyawan", "Masuk", "Terlambat", "Absen", "Cuti", "Sakit"]
    const [isToken, setIstoken] = useState('')
    const date = new Date();
    let currentDay= String(date.getDate()).padStart(2, '0');
    let currentMonth = String(date.getMonth()+1).padStart(2,"0");
    let currentYear = date.getFullYear();
    let getDay = weekday[date.getDay()]
    // we will display the date as DD-MM-YYYY 
    let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
    console.log(isToken);
    useEffect(() => {
      const token = localStorage.getItem("authToken")
      if (token) {
        setIstoken(token)
        console.log('login sukses');
      }else{
        <Route path="/login" element={<LoginPage />} />
      }
    }, [])

    const data = [
      {
        name: 'Masuk',
        uv: 80,
      },
      {
        name: 'Terlambat',
        uv: 5,
      },
      {
        name: 'Absen',
        uv: 2,
      },
      {
        name: 'Cuti',
        uv: 6,
      },
      {
        name: 'Sakit',
        uv: 1,
      },
    ];
    const getPath = (x, y, width, height) => {
      return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
      ${x + width / 2}, ${y}
      C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
      Z`;
    };

    const TriangleBar = (props) => {
      const { fill, x, y, width, height } = props;

      return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    return <div className="dashboard__container">
        <Navbar navbarText="Overview" />
               
        <div className="grafik__data__kehadiran">
            {/* yg atas */}
            <h1>Grafik Data Kehadiran / Tahun / {currentYear}</h1>
            <div className="keterangan">
                <div className="box"><h1>Masuk</h1><h2>1</h2></div>
                <div className="box"><h1>Terlambat</h1><h2>2</h2></div>
                <div className="box"><h1>Absen</h1><h2>3</h2></div>
                <div className="box"><h1>Cuti</h1><h2>4</h2></div>
                <div className="box"><h1>Sakit</h1><h2>5</h2></div>

            </div>
                
        </div>
        
        <div className="grafik__data__member">
        

            <div className="left__container__dashboard">
            <h1>Grafik Data Member / Hari</h1>
                <div className="hari">
                    <h2>{getDay}</h2>
                        <div className="right">
                            <div><h2>{currentDate}</h2></div>
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
                      <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                        ))}
                      </Bar>
                    </BarChart>
                </ResponsiveContainer>
                  
                    <div className="vertikal_line"></div>
            </div>


            <div className="right__container__dashboard">
                
                <div className="box1"><h1>Masuk</h1><h2>1</h2></div>
                <div className="horizontal_line"></div>
                <div className="box1"><h1>Terlambat</h1><h2>2</h2></div>
                <div className="horizontal_line"></div>
                <div className="box1"><h1>Absen</h1><h2>3</h2></div>
                <div className="horizontal_line"></div>
                <div className="box1"><h1>Cuti</h1><h2>4</h2></div>
                <div className="horizontal_line"></div>
                <div className="box1"><h1>Sakit</h1><h2>5</h2></div>
                
            </div>

        </div>

        <Information informationText="Data Member" fields={infoTopFields}/>
        
    </div> 
}

export default Dashboard